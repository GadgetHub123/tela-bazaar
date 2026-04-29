import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { name: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  const data = await req.json();
  const product = await prisma.product.create({ data });
  return NextResponse.json(product);
}