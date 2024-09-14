import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@moneytrack/web/components/ui/avatar';
import { Rating } from '@moneytrack/web/components/ui/rating';
import { TTestimonial } from '@moneytrack/web/types/testiomonials';
import { FC } from 'react';

type Testimonial = TTestimonial;

export const Testimonial: FC<Testimonial> = ({
  avatar,
  fullName,
  fallbackName,
  testimonial,
  rating,
}) => (
  <div className="flex items-center flex-col gap-3 p-4">
    <Avatar className="shadow-md">
      <AvatarImage src={avatar} />
      <AvatarFallback>{fallbackName}</AvatarFallback>
    </Avatar>
    <h4 className="font-bold">{fullName}</h4>
    <p className="text-sm flex gap-3">
      <span className="text-4xl">❝</span>
      {testimonial}
    </p>

    <Rating rating={rating} />
  </div>
);
