import { Features } from "./Features";
import { Hero } from "./Hero";
import { FeaturedOn } from "./Hero/FeaturedOn";
import { Testimonials } from "./Testimonials";

export const Landing = () => {
  return (
    <div className="flex flex-col gap-20 p-3 max-w-[1300px] mx-auto">
      <Hero />
      <FeaturedOn />
      <Features />
      <Testimonials />
    </div>
  );
};
