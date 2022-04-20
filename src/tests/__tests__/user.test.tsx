import { screen } from "@testing-library/react";
import { UserCard } from "../../components/User";

import { mockUser } from "../mocks";
import { customRender } from "../utils";

describe("user card", () => {
  it("renders name", async () => {
    customRender(<UserCard user={mockUser} />);

    const el = await screen.findByText(mockUser.name);

    expect(el).toBeInTheDocument();
  });

  it("renders address city", async () => {
    customRender(<UserCard user={mockUser} />);

    const el = await screen.findByText(mockUser.address.city);

    expect(el).toBeInTheDocument();
  });

  it("renders company name", async () => {
    customRender(<UserCard user={mockUser} />);

    const el = await screen.findByText(mockUser.company.name);

    expect(el).toBeInTheDocument();
  });

  it("should have href to user page", async () => {
    customRender(<UserCard user={mockUser} />);

    const button = await screen.findByRole("link");

    expect(button).toHaveAttribute("href", "/user/" + mockUser.id);
  });
});
