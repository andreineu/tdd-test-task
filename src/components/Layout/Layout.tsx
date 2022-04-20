import React from "react";
import { Container } from "./Container";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, sidebar }) => {
  return (
    <>
      <Sidebar>{sidebar}</Sidebar>
      <Container>{children}</Container>
    </>
  );
};
