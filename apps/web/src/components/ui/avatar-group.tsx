import { FC, PropsWithChildren } from "react";

type AvatarGroup = PropsWithChildren;

export const AvatarGroup: FC<AvatarGroup> = ({ children }) => {
  return (
    <div className="flex [&>span:first-child]:ml-[0px] [&>span]:ml-[-5px]">
      {children}
    </div>
  );
};
