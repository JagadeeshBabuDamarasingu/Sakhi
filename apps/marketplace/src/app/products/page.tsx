import { redirect } from "next/navigation";

export default async function ProductsRedirect({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  redirect(category ? `/?category=${category}` : "/");
}
