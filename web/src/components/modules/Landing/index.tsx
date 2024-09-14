import { Features } from "./Features";
import { GetApp } from "./GetApp";
import { Hero } from "./Hero";
import { FeaturedOn } from "./Hero/FeaturedOn";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";

export const Landing = () => {
  return (
    <div className="flex flex-col gap-28 p-3 max-w-[1300px] mx-auto">
      <Hero />
      <FeaturedOn />
      <Features />
      <Pricing />
      <Testimonials />
      <GetApp />
    </div>
  );
};
