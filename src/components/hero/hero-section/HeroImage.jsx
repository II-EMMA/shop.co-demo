import HeroSectionImage from "@/assets/images/hero-section.svg";
import SmallStar from "@/assets/icons/small-star.svg";
import BigStar from "@/assets/icons/big-star.svg";

export default function HeroImage() {
  return (
    <div className="xl:self-end relative w-1/2 min-w-[390px] min-h-[663px] sm:block hidden">
      <img
        src={HeroSectionImage.src}
        alt="Hero section image"
        className="h-[663px] min-w-[390px] min-h-[663px]"
      />
      <img src={SmallStar.src} alt="small star" className="absolute top-64" />
      <img
        src={BigStar.src}
        alt="big star"
        className="absolute top-24 right-0"
      />
    </div>
  );
}
