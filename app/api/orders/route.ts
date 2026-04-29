import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { items, total, address, paymentMethod } = await req.json();
  const userId = session.user.id as string;

  const order = await prisma.order.create({
    data: {
      userId,
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

  try {
    const { sendOrderConfirmationEmail } = await import("@/lib/email");
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
  if (!session || !session.user || !session.user.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id as string;

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(orders);
}