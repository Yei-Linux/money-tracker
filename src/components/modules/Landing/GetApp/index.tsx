import { Button } from "@/components/ui/button";
import { Logo } from "../../@shared/Logo";

export const GetApp = () => {
  return (
    <div className="p-20 flex flex-col gap-10 justify-center items-center">
      <div className="flex flex-col gap-3 justify-center items-center">
        <h4 className="font-bold text-4xl font-snicker">
          Generate, save and earn
        </h4>
        <p>Control your money every time and improve your budget...</p>
      </div>

      <Button className="w-fit">
        <span>
          <Logo />
        </span>
        Start Money Tracker
      </Button>
    </div>
  );
};
