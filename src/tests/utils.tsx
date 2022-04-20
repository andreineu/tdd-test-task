import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Providers: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={children} />
      </Routes>
    </BrowserRouter>
  );
};

export const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: Providers, ...options });
