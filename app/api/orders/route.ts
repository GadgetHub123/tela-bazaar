import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items, total, address, paymentMethod } = await req.json();

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      total,
      address,
      paymentMethod,
      items: {
        create: items.map((i: any) => ({
          productId: i.productId,
          quantity: i.quantity,
          priceAtPurchase: i.price,
        })),
      },
    },
    include: { items: { include: { product: true } } },
  });

  // Send confirmation email
  try {
    await sendOrderConfirmationEmail({
      to: session.user.email!,
      customerName: session.user.name!,
      orderId: order.id,
      items: order.items.map((i) => ({
        name: i.product.name,
        quantity: i.quantity,
        price: i.priceAtPurchase,
      })),
      total: order.total,
      address: order.address,
      payment: order.paymentMethod,
    });
  } catch (err) {
    console.error("Email error:", err);
  }

  return NextResponse.json(order);
}

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}