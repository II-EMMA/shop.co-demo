import { TiStar, TiStarHalfOutline } from "react-icons/ti";

export default function ProductRate({ rating }) {
  const ratingValue = parseFloat(rating?.split("/")[0] || "0");
  const fullStars = Math.floor(ratingValue);
  const hasHalfStar = ratingValue % 1 >= 0.5;

  return (
    <div className="flex flex-row items-center gap-x-3">
      <div className="flex flex-row gap-x-1.5 items-center">
        {[...Array(fullStars)].map((_, i) => (
          <TiStar key={i} className="bg-white text-[#FFC633]" size={30} />
        ))}
        {hasHalfStar && (
          <TiStarHalfOutline className="bg-white text-[#FFC633]" size={25} />
        )}
      </div>
      <p className="text-base font-normal font-satoshi">
        <span>{ratingValue}</span>/<span className="opacity-60">5</span>
      </p>
    </div>
  );
}
