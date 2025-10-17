import { ProductCards } from "@/mocks/Products";

export function getRelatedProducts(productId, limit = 4) {
  const currentProduct = ProductCards.find((p) => p.id === Number(productId));
  if (!currentProduct) return ProductCards.slice(0, limit); // fallback

  return ProductCards.filter((p) => p.id !== currentProduct.id)
    .map((p) => {
      let score = 0;

      const sharedColors = p.colors.filter((c) =>
        currentProduct.colors.includes(c)
      );
      score += sharedColors.length;

      const sharedSizes = p.sizes.filter((s) =>
        currentProduct.sizes.includes(s)
      );
      score += sharedSizes.length * 0.5;

      const priceA = parseFloat(p.price.replace("$", ""));
      const priceB = parseFloat(currentProduct.price.replace("$", ""));
      if (Math.abs(priceA - priceB) <= 30) score += 1;

      const titleMatch = p.title
        .toLowerCase()
        .split(" ")
        .some((word) => currentProduct.title.toLowerCase().includes(word));
      if (titleMatch) score += 1;

      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
