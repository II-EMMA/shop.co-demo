import { ProductCards } from "@/mocks/Products";
import ProductCard from "@/components/product/ProductCard";
import ProductImage from "@/components/product/ProductImage";
import { FaAngleRight } from "react-icons/fa";
import ProductRouting from "@/components/product/ProductRouting";
import ProductTabContent from "@/components/product/ProductTabContent";
import RelatedProducts from "@/components/product/Suggestions";

export default async function Page({ params }) {
  const { product: id } = await params;
  const product = ProductCards.find((p) => p.id === parseInt(id));
  if (!product) return <div className="px-12 mt-20">Product not found.</div>;
  const titleLower = product.title.toLowerCase();

  let routingName = "Product";

  if (titleLower.includes("t-shirt") || titleLower.includes("shirt")) {
    routingName = "T-shirts";
  } else if (titleLower.includes("shorts")) {
    routingName = "Shorts";
  } else if (titleLower.includes("hoodie")) {
    routingName = "Hoodie";
  } else if (titleLower.includes("jeans")) {
    routingName = "Jeans";
  }
  return (
    <section className="overflow-x-hidden relative flex flex-col gap-y-10 justify-between mt-20 max-w-[1500px] mx-auto md:px-12 px-8">
      {/* Breadcrumb */}
      <div className="flex flex-row items-center gap-x-2.5 font-satoshi text-base px-1">
        <p className="text-black/60">Home</p>
        <FaAngleRight className="text-black/40" />
        <p className="text-black/60">Shop</p>
        <FaAngleRight className="text-black/40" />
        <p className="text-black/60">Men</p>
        <FaAngleRight />
        <p className="text-black">{routingName}</p>
      </div>

      {/* Product layout */}
      <div className="flex lg:flex-row flex-col lg:gap-x-10 ">
        <ProductImage product={product} />
        <ProductCard product={product} />
      </div>

      {/* Tab navigation */}
      <ProductRouting />

      {/* Tab content (client-side) */}
      <ProductTabContent product={product} />

      <RelatedProducts productId={product.id} />
    </section>
  );
}
