import { ProductCards } from "@/mocks/Products";
import getNearestColorName from "../wishlist/getNearestColorName";

export default function filterProducts(query) {
  if (!query.trim()) return [];

  const normalizedQuery = query.toLowerCase();
  const terms = normalizedQuery.split(" ");

  return ProductCards.filter((product) => {
    const title = product.title?.toLowerCase() || "";
    const description = product.description?.toLowerCase() || "";
    const sizes = product.sizes?.join(" ").toLowerCase() || "";
    const rating = product.rating?.toLowerCase() || "";
    const price = product.price?.toLowerCase() || "";
    const discountPrice = product.discountPrice?.toLowerCase() || "";
    const date = product.date?.toLowerCase() || "";

    // Convert hex colors to readable names
    const colorNames = (product.colors || [])
      .map((hex) => getNearestColorName(hex)?.toLowerCase())
      .join(" ");

    return terms.every(
      (term) =>
        title.includes(term) ||
        description.includes(term) ||
        colorNames.includes(term) ||
        sizes.includes(term) ||
        rating.includes(term) ||
        price.includes(term) ||
        discountPrice.includes(term) ||
        date.includes(term)
    );
  });
}
