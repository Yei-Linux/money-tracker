import { PhoneCallIcon } from "lucide-react";
import { Feature } from "./Feature";
import { TextRotated } from "@/components/ui/TextRotated";

export const Features = () => {
  return (
    <div className="flex flex-col gap-10">
      <TextRotated classNames="mx-auto text-xl">
        Features our users love
      </TextRotated>

      <ul className="flex flex-wrap gap-10 mx-auto justify-center">
        <Feature
          Icon={PhoneCallIcon}
          title="Multiple Devices"
          description="Safely synchronize across devices with Bank standard security."
        />
        <Feature
          Icon={PhoneCallIcon}
          title="Multiple Devices"
          description="Safely synchronize across devices with Bank standard security."
        />
        <Feature
          Icon={PhoneCallIcon}
          title="Multiple Devices"
          description="Safely synchronize across devices with Bank standard security."
        />
      </ul>
    </div>
  );
};
