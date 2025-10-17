import { PiEnvelopeLight } from "react-icons/pi";

export default function Contact({ className }) {
  return (
    <section className={`max-w-[1500px] mx-auto mt-20 z-[250] ${className}`}>
      <div className="bg-black flex lg:flex-row flex-col lg:gap-y-0 gap-y-8 justify-between items-center py-11 px-16 md:mx-32 mx-4 rounded-[20px] gap-x-8 md:w-auto w-11/12">
        <h2 className="font-integral font-extrabold leading-11 text-[40px] text-white max-w-[551px] lg:text-start text-center">
          STAY UPTO DATE ABOUT OUR LATEST OFFERS
        </h2>
        <div className="flex flex-col gap-y-3 sm:w-[349px] w-[200px]">
          <div className="relative font-satoshi">
            <PiEnvelopeLight className="absolute left-4 top-1/2 -translate-y-1/2 text-black opacity-40 text-xl" />
            <input
              type="text"
              placeholder="Enter your email address"
              autoFocus
              className="bg-white pl-11 pr-4 py-3 w-full rounded-full focus:outline-none placeholder:text-black placeholder:opacity-40 transition-all duration-300"
            />
          </div>
          <button className="font-satoshi font-medium text-base text-black w-full px-8 py-3 rounded-full cursor-pointer bg-white outline-none self-center hover:bg-transparent border hover:border-white  hover:text-white transition-all  duration-400">
            Subscribe to Newsletter
          </button>
        </div>
      </div>
    </section>
  );
}
