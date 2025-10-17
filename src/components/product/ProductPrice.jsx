export default function ProductPrice({ price, discountPrice }) {
  const priceValue = parseFloat(price?.replace("$", "") || "0");
  const discountValue = discountPrice
    ? parseFloat(discountPrice.replace("$", ""))
    : null;

  const discountPercent = discountValue
    ? Math.round(((discountValue - priceValue) / discountValue) * 100)
    : null;

  return (
    <div className="flex flex-row gap-x-3 font-satoshi mt-1.5">
      <p className="font-extrabold text-[32px]">{price}</p>
      {discountPrice && (
        <>
          <span className="line-through opacity-40 font-bold text-[32px]">
            {discountPrice}
          </span>
          <p className="px-3 py-1 rounded-full flex items-center justify-center bg-[#FF33331A]">
            <span className="text-[#FF3333] text-base font-medium">
              -{discountPercent}%
            </span>
          </p>
        </>
      )}
    </div>
  );
}
