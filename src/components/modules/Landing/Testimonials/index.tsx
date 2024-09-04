import { TextRotated } from "@/components/ui/TextRotated";
import { TestimonialsMocked } from "@/constants";
import { Testimonial } from "./Testimonial";

export const Testimonials = () => {
  return (
    <div className="flex flex-col gap-10">
      <TextRotated classNames="mx-auto text-xl">
        See what others have to say
      </TextRotated>

      <div className="flex gap-3 flex-wrap md:flex-nowrap">
        {TestimonialsMocked.map((props, index) => (
          <Testimonial {...props} key={index} />
        ))}
      </div>
    </div>
  );
};
