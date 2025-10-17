import { getRelatedProducts } from "@/lib/suggestion/getRelatedProducts";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const productId = searchParams.get("id");

  if (!productId) {
    return Response.json({ error: "Missing product ID" }, { status: 400 });
  }

  const related = getRelatedProducts(productId);
  return Response.json({ related });
}
