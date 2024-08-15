import { Button } from "@/components/ui/button";
import { Logo } from "../../@shared/Logo";

export const Hero = () => {
  return (
    <div className="my-4 p-4">
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
      </div>
    </div>
  );
};
