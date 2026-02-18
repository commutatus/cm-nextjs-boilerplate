import React from "react";
import { Layout } from "antd";

const { Footer: AntdFooter } = Layout;

const Footer = () => {
  return (
    <AntdFooter className="!bg-white !px-0 !py-[0]">
      <div className="my-[48px]">
        <h1 className="!text-center">Footer</h1>
      </div>
    </AntdFooter>
  );
};

export default Footer;
