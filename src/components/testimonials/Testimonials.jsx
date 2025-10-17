import TestimonialCard from "../cards/TestimonialCard";

export default function Testimonials() {
  return (
    <section className="flex flex-col mt-20 max-w-[1500px] mx-auto md:px-32">
      <h2 className="font-integral font-extrabold text-5xl md:text-start text-center">
        OUR HAPPY CUSTOMERS
      </h2>
      <TestimonialCard />
    </section>
  );
}
