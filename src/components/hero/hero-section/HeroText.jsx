import Link from "next/link";

export default function HeroText() {
  return (
    <>
      <h1 className="xl:text-start text-center font-integral max-w-[577px] text-black font-extrabold sm:text-[64px] text-[52px] leading-16 sm:block flex items-center justify-center sm:mt-0 mt-16">
        FIND CLOTHES THAT MATCHES YOUR STYLE
      </h1>
      <p className="xl:text-start text-center font-satoshi max-w-[545px] font-normal text-base text-black opacity-60">
        Browse through our diverse range of meticulously crafted garments,
        designed to bring out your individuality and cater to your sense of
        style.
      </p>
      <Link
        href="/en/category/casual"
        className="xl:self-start self-center text-center pointer-events-auto font-satoshi font-medium text-base text-white bg-black px-14 py-4 rounded-full cursor-pointer"
      >
        Shop Now
      </Link>
    </>
  );
}
