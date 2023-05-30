"use client";

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    // max-w-[2520px]
    <div className="mx-auto max-w-full xl:px-20 md:px-10 sm:px-2 px-4">
      {children}
    </div>
  );
};

export default Container;
