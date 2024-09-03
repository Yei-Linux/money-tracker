import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { FC } from "react";

type StartAppButton = {
  onClick?: () => void;
};

export const StartAppButton: FC<StartAppButton> = ({ onClick }) => (
  <Button className="w-fit" onClick={onClick}>
    <span>
      <Logo />
    </span>
    Start Money Tracker
  </Button>
);
