import React from "react";
import { Button, Layout } from "antd";
import classNames from "classnames";
import Link from "next/link";

const { Header } = Layout;

const Navbar: React.FC = () => {
  return (
    <Header className={classNames("!h-[64px] !p-0")}>
      <div className="flex items-center justify-between h-full max-w-[100%] lg:max-w-[1140px] mx-auto px-[16px]">
        <Link href="/">
          {/* TODO: Add brand logo image */}
          <h4 className="!text-white">Brand Logo</h4>
        </Link>
        <div>
          <Button type="primary">Login</Button>
        </div>
      </div>
    </Header>
  );
};

export default Navbar;
