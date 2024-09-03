import { Button } from "@/components/ui/button";
import { Logo } from "../../@shared/Logo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { TextRotated } from "@/components/ui/TextRotated";
import { Avatars } from "@/constants";
import { Rating } from "@/components/ui/rating";
import Image from "next/image";

import HeroIcon from "../../../../../public/assets/hero.svg";
import { CallToAction } from "./CallToAction";

export const Hero = () => {
  return (
    <div className="my-4 p-4 flex flex-wrap items-center justify-center gap-20 md:flex-nowrap">
      <div>
        <Image src={HeroIcon} alt="Follow us on Twitter" />
      </div>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="flex items-center gap-2">
            <TextRotated>Simple way</TextRotated> <span>to manage</span>
          </h1>
          <h1>
            <span className="text-black bg-muted font-bold p-2">
              personal finances
            </span>
          </h1>
        </div>

        <CallToAction />

        <div className="flex gap-3 items-center">
          <AvatarGroup>
            {Avatars.map(({ avatar, fallbackName }) => (
              <Avatar className="shadow-md">
                <AvatarImage src={avatar} />
                <AvatarFallback>{fallbackName}</AvatarFallback>
              </Avatar>
            ))}
          </AvatarGroup>

          <div className="flex flex-col">
            <Rating rating={5} />
            <p className="text-xs">
              <strong>+1K</strong> users <strong>growing</strong> their
              incomings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
