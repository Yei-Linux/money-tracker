import { FC, PropsWithChildren, useEffect, useState } from "react";
import EmptyStateIconSVG from "../../../public/assets/empty.svg";
import Image from "next/image";
import React from "react";

type EmptyState = PropsWithChildren<{ isOnTable?: boolean }>;

export const EmptyIcon = () => (
  <Image src={EmptyStateIconSVG} alt="empty-icon" />
);

export const EmptyState: FC<EmptyState> = ({ children, isOnTable = false }) => {
  const childSize = React.Children.count(children);

  return (
    <>
      {!!childSize ? (
        children
      ) : isOnTable ? (
        <tr className="flex justify-center items-center">
          <td>
            <EmptyIcon />
          </td>
        </tr>
      ) : (
        <div className="flex justify-center items-center">
          <EmptyIcon />
        </div>
      )}
    </>
  );
};

export const EmptyText: FC<EmptyState & { text?: string }> = ({
  children,
  isOnTable = false,
  text = "You don't have any results here",
}) => {
  const childSize = React.Children.count(children);

  return (
    <>
      {!!childSize ? (
        children
      ) : isOnTable ? (
        <tr className="flex justify-center items-center">
          <td>
            <p className="text-center text-xs p-1">{text}</p>
          </td>
        </tr>
      ) : (
        <p className="text-center text-xs p-1">{text}</p>
      )}
    </>
  );
};
