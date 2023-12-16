import React, { ReactNode } from "react";

import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

const Layout = (props: Readonly<Props>) => {
  const { children } = props;
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
