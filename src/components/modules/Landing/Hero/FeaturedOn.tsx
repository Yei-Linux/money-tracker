import { HackerNewsIcon } from "@/components/ui/icons/HackerNewsIcon";
import { ProductHuntIcon } from "@/components/ui/icons/ProductHuntIcon";
import { RedditIcon } from "@/components/ui/icons/RedditIcon";
import { XIcon } from "@/components/ui/icons/XIcon";

export const FeaturedOn = () => {
  return (
    <div className="flex gap-7 items-center justify-center mx-auto w-full">
      <p className="text-xs">Featured On</p>

      <div className="flex gap-4 [&>svg]:drop-shadow-2xl [&>svg]:cursor-pointer">
        <ProductHuntIcon />
        <HackerNewsIcon />
        <XIcon />
        <RedditIcon />
      </div>
    </div>
  );
};
