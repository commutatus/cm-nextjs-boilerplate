import Sider from "antd/es/layout/Sider";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Menu, MenuProps } from "antd";
import classNames from "classnames/bind";
import styles from "./sidebar.module.scss";
import { useGlobals } from "@/common/context/globals";
import useResponsive, { Breakpoints } from "@/common/hooks/useResponsive";
import { getMenuKeysFromPathname } from "./sidebar.helpers";
import { useRouter } from "next/router";
import Image from "next/image";
import { DoubleLeftOutlined } from "@ant-design/icons";

const cx = classNames.bind(styles);

const SideBarHeader = (sidebarProps: {
  isSidebarCollapsed?: boolean;
  toggleSidebarCollapse?: () => void;
}) => {
  const { isSidebarCollapsed, toggleSidebarCollapse } = sidebarProps;
  return (
    <div
      className={cx(
        "flex items-center p-[8px] border-0 border-b border-solid border-gray-3",
        {
          "justify-between": !isSidebarCollapsed,
          "justify-center": isSidebarCollapsed,
        },
      )}
    >
      <div className="inline-flex items-center transition-all duration-300 overflow-hidden mx-auto">
        {isSidebarCollapsed && (
          <Image
            src="/assets/images/cm-icon.png"
            alt="Logo"
            width={30}
            height={30}
          />
        )}

        {!isSidebarCollapsed && (
          <Image
            src="/assets/images/cm-icon.png"
            alt="Logo"
            width={130}
            height={60}
          />
        )}
      </div>
      {!isSidebarCollapsed && (
        <Button
          type="text"
          icon={<DoubleLeftOutlined className="!text-gray-6 text-base" />}
          onClick={() => toggleSidebarCollapse?.()}
        />
      )}
    </div>
  );
};

const Sidebar = () => {
  const { isSidebarCollapsed, toggleSidebarCollapse } = useGlobals();
  const { breakpoint } = useResponsive();
  const router = useRouter();

  const isSmallScreen = breakpoint <= Breakpoints.lg;

  const [selectedKey, setSelectedKey] = useState<string>("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const SIDEBAR_MENU_ITEMS: MenuProps["items"] = useMemo(() => {
    return []
  }, []);

  useEffect(() => {
    const { selectedKey, openKey } = getMenuKeysFromPathname(router.pathname);
    setSelectedKey(selectedKey);
    if (openKey) {
      setOpenKeys([openKey]);
    }
  }, [router.pathname]);

  return (
    <Sider
      theme={"light"}
      collapsible
      collapsed={isSidebarCollapsed}
      onCollapse={() => toggleSidebarCollapse?.()}
      className={cx("sidebar", "border-solid border-0 border-r border-gray-3")}
      width={219}
      trigger={null}
      collapsedWidth={isSmallScreen ? 0 : 56}
    >
      <SideBarHeader
        isSidebarCollapsed={isSidebarCollapsed}
        toggleSidebarCollapse={toggleSidebarCollapse}
      />
      <Menu
        mode="inline"
        items={SIDEBAR_MENU_ITEMS}
        selectedKeys={[selectedKey]}
        openKeys={openKeys}
        onOpenChange={setOpenKeys}
      />
    </Sider>
  );
};

export default Sidebar;
