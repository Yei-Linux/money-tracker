import { FC } from "react";

type Feature = {
  Icon: React.ElementType;
  title: string;
  description: string;
};

export const Feature: FC<Feature> = ({ title, description, Icon }) => {
  return (
    <li className="flex flex-col gap-3 justify-center items-center">
      <Icon fill="black" />
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm max-w-[300px] text-center">{description}</p>
    </li>
  );
};
