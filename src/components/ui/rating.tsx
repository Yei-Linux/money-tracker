import { Star } from "lucide-react";
import { FC } from "react";

type Rating = {
  rating: number;
};

export const Rating: FC<Rating> = ({ rating }) => {
  const getFill = (index: number) => {
    if (index <= rating - 1) {
      return "yellow";
    }
    return "white";
  };

  return (
    <div className="flex">
      {Array(5)
        .fill("")
        .map((_, index) => (
          <Star fill={getFill(index)} />
        ))}
    </div>
  );
};
