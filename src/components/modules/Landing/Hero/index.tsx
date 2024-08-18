import { Button } from "@/components/ui/button";
import { Logo } from "../../@shared/Logo";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AvatarGroup } from "@/components/ui/avatar-group";
import { Star } from "lucide-react";

export const Hero = () => {
  return (
    <div className="my-4 p-4 flex flex-wrap md:flex-nowrap">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="flex items-center gap-2">
            <span className="text-black bg-muted font-bold p-2 rotate-6 flex w-fit">
              Simple way
            </span>{" "}
            <span>to manage</span>
          </h1>
          <h1>
            <span className="text-black bg-muted font-bold p-2">
              personal finances
            </span>
          </h1>
        </div>

        <div>
          <Button className="w-fit">
            <span>
              <Logo />
            </span>
            Start Money Tracker
          </Button>
        </div>

        <div className="flex gap-3 items-center">
          <AvatarGroup>
            <Avatar className="shadow-md">
              <AvatarImage src="https://shipfa.st/_next/static/media/lennard.a8caddd5.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="shadow-md">
              <AvatarImage src="https://shipfa.st/_next/static/media/lennard.a8caddd5.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="shadow-md">
              <AvatarImage src="https://shipfa.st/_next/static/media/lennard.a8caddd5.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="shadow-md">
              <AvatarImage src="https://shipfa.st/_next/static/media/lennard.a8caddd5.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Avatar className="shadow-md">
              <AvatarImage src="https://shipfa.st/_next/static/media/lennard.a8caddd5.jpeg" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </AvatarGroup>

          <div className="flex flex-col">
            <div className="flex">
              <Star fill="yellow" />
              <Star fill="yellow" />
              <Star fill="yellow" />
              <Star fill="yellow" />
              <Star fill="yellow" />
            </div>
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
