import CartCard from "@/components/cart/CartCard";
import CartPurchase from "@/components/cart/CartPurchase";
import { FaAngleRight } from "react-icons/fa";

export default function page() {
  return (
    <section className="overflow-x-hidden flex flex-col gap-y-10 justify-between mt-20 max-w-[1500px] mx-auto sm:px-[75px] px-2">
      <div className="flex flex-row items-center gap-x-2 font-satoshi text-base px-1">
        <p className="text-black/60">Home</p>
        <FaAngleRight />
        <p className="text-black  ">Cart</p>
      </div>
      <p className="font-integral font-extrabold uppercase text-[40px] tracking-tight">
        Your cart
      </p>
      <div className="flex lg:flex-row flex-col w-full items-center lg:items-stretch lg:gap-x-4 gap-y-4 lg:gap-y-0">
        <CartCard />
        <CartPurchase />
      </div>
    </section>
  );
}
