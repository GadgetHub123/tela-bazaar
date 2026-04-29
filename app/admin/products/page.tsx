import { prisma } from "@/lib/prisma";
import AdminProductsClient from "./ProductsClient";

export default async function AdminProducts() {
  const products = await prisma.product.findMany({ orderBy: { category: "asc" } });
  return <AdminProductsClient products={products} />;
}