import { FeatureApp } from '@moneytrack/web/types/features-app';
import { FC } from 'react';

type Feature = FeatureApp;

export const Feature: FC<Feature> = ({ title, description, Icon }) => {
  return (
    <li className="flex flex-col gap-3 justify-center items-center">
      <Icon />
      <h4 className="font-bold text-lg">{title}</h4>
      <p className="text-sm max-w-[300px] text-center">{description}</p>
    </li>
  );
};
