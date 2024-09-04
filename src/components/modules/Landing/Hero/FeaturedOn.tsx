import { FeaturedOnPlatforms } from "@/constants";
import Link from "next/link";

export const FeaturedOn = () => {
  return (
    <div className="flex gap-7 items-center justify-center mx-auto w-full">
      <p className="text-xs">Featured On</p>

      <div className="flex gap-4 [&>svg]:drop-shadow-2xl [&>svg]:cursor-pointer">
        {FeaturedOnPlatforms.map(({ Icon, link }) => (
          <Link href={link} target="__blank" rel="noopener" key={link}>
            <Icon />
          </Link>
        ))}
      </div>
    </div>
  );
};
