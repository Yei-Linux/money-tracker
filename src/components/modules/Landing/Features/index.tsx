import { Feature } from "./Feature";
import { TextRotated } from "@/components/ui/TextRotated";
import { FeaturesInTheApp } from "@/constants";

export const Features = () => {
  return (
    <div className="flex flex-col gap-10">
      <TextRotated classNames="mx-auto text-xl">
        Features our users love
      </TextRotated>

      <ul className="flex flex-wrap gap-10 mx-auto justify-center">
        {FeaturesInTheApp.map(({ Icon, title, description }) => (
          <Feature Icon={Icon} title={title} description={description} />
        ))}
      </ul>
    </div>
  );
};
