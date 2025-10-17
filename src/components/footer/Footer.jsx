import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-y-6 max-w-[1500px] mx-auto sm:px-32 px-10 bg-[#F0F0F0] pt-36 pb-20  -z-50 rounded-tl-4xl rounded-tr-4xl">
      <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 lg:gap-y-0 gap-y-10 justify-between pb-12 border-b border-black/10 ">
        <ul className="flex flex-col gap-y-6">
          <Link href="/en">
            <li className="font-extrabold text-[32px] font-integral uppercase">
              SHOP.CO
            </li>
          </Link>
          <li className="font-satoshi font-normal text-sm text-black/60">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </li>
          <ul className="flex flex-row gap-x-3 items-center mt-4">
            <li className="w-7 h-7 rounded-full flex items-center justify-center border border-black/20">
              <FaTwitter size={13} className="text-black" />
            </li>
            <li className="w-7 h-7 rounded-full flex items-center justify-center bg-black">
              <FaFacebookF size={13} className="text-white" />
            </li>
            <li className="w-7 h-7 rounded-full flex items-center justify-center border border-black/20">
              <FaInstagram size={13} className="text-black" />
            </li>
            <li className="w-7 h-7 rounded-full flex items-center justify-center border border-black/20">
              <FaGithub size={13} className="text-black" />
            </li>
          </ul>
        </ul>
        <ul className="font-satoshi text-base text-black flex flex-col justify-between my-3 gap-y-4 justify-self-end">
          <li className="font-medium tracking-widest uppercase">Company</li>
          <li className="opacity-60 font-normal">About</li>
          <li className="opacity-60 font-normal">Features</li>
          <li className="opacity-60 font-normal">Works</li>
          <li className="opacity-60 font-normal">Career</li>
        </ul>
        <ul className="font-satoshi text-base text-black flex flex-col justify-between my-3 gap-y-4 md:justify-self-end">
          <li className="font-medium tracking-widest uppercase">help</li>
          <li className="opacity-60 font-normal">Customer Support</li>
          <li className="opacity-60 font-normal">Delivery Details</li>
          <li className="opacity-60 font-normal">Terms & Conditions</li>
          <li className="opacity-60 font-normal">Privacy Policy</li>
        </ul>
        <ul className="font-satoshi text-base text-black flex flex-col justify-between my-3 gap-y-4 md:justify-self-auto lg:justify-self-end justify-self-end">
          <li className="font-medium tracking-widest uppercase">F A Q</li>
          <li className="opacity-60 font-normal">Account</li>
          <li className="opacity-60 font-normal">Manage Deliveries</li>
          <li className="opacity-60 font-normal">Orders</li>
          <li className="opacity-60 font-normal">Payments</li>
        </ul>
        <ul className="font-satoshi text-base text-black flex flex-col justify-between my-3 gap-y-4 md:justify-self-end">
          <li className="font-medium tracking-widest uppercase">Resources</li>
          <li className="opacity-60 font-normal">Free eBooks</li>
          <li className="opacity-60 font-normal">Development Tutorial</li>
          <li className="opacity-60 font-normal">How to - Bolg</li>
          <li className="opacity-60 font-normal">Youtube Playlist</li>
        </ul>
      </div>
      <p className="font-satoshi text-sm text-black/60 font-normal">
        Shop.co © 2000-2023, All Rights Reserved
      </p>
    </footer>
  );
}
