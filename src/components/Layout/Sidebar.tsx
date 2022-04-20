import React from "react";

import styles from "./Sidebar.module.scss";

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = ({ children }) => {
  return <div className={styles.sidebar}>{children}</div>;
};
