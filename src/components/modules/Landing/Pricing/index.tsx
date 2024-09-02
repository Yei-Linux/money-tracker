import { PlansMocked } from "@/constants";
import { Plan } from "./Plan";

export const Pricing = () => {
  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {PlansMocked.map(({ benefits, ...props }, index) => (
        <Plan {...props} key={index}>
          {benefits.map((benefit, indexBen) => (
            <Plan.Item item={benefit} key={indexBen} />
          ))}
        </Plan>
      ))}
    </div>
  );
};
