import { Features } from "./Features";
import { Hero } from "./Hero";
import { FeaturedOn } from "./Hero/FeaturedOn";

export const Landing = () => {
  return (
    <div className="flex flex-col gap-16 p-3 max-w-[1300px] mx-auto">
      <Hero />
      <FeaturedOn />
      <Features />
    </div>
  );
};
