import ProductsClient from "@/components/products/ProductsClient";

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  return <ProductsClient initialCategory={category} />;
}
