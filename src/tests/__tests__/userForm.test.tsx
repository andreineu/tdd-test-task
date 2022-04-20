import { render, screen, waitFor } from "@testing-library/react";
import { UserForm } from "../../components/Forms/UserForm";
import { mockUser } from "../mocks";
import userEvent from "@testing-library/user-event";
import { customRender } from "../utils";
import { act } from "react-dom/test-utils";

describe("user form", () => {
  it("should have disabled fields if disabled prop is passed", async () => {
    render(<UserForm user={mockUser} disabled={true} />);

    const fields = screen.getAllByRole("textbox");

    await waitFor(() => {
      fields.forEach((field) => expect(field).toBeDisabled());
    });
  });

  it("should have disabled submit button if disabled prop is passed", async () => {
    render(<UserForm user={mockUser} disabled={true} />);

    const button = await screen.findByTestId("submit");

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("should show error message if touched and field is empty", async () => {
    render(<UserForm user={mockUser} />);

    // `Comment` field's initial value is ''
    userEvent.click(await screen.findByLabelText("Comment"));

    userEvent.click(document.body);

    expect(await screen.findByTestId("error-message")).toBeInTheDocument();
  });

  it("should show error message if touched and field is clear", async () => {
    render(<UserForm user={mockUser} />);

    userEvent.clear(await screen.findByLabelText("Name"));

    userEvent.click(document.body);

    await waitFor(async () => {
      expect(await screen.findByTestId("error-message")).toBeInTheDocument();
    });
  });

  it("should have disabled submit button if has error message", async () => {
    render(<UserForm user={mockUser} />);

    userEvent.click(await screen.findByLabelText("Comment"));

    userEvent.click(document.body);

    expect(await screen.findByTestId("error-message")).toBeInTheDocument();

    const button = await screen.findByTestId("submit");

    await waitFor(() => {
      expect(button).toBeDisabled();
    });
  });

  it("should submit if has no errors", async () => {
    const consoleLogSpy = jest.spyOn(console, "log");

    render(<UserForm user={mockUser} />);

    userEvent.click(screen.getByLabelText("Comment"));

    userEvent.type(screen.getByLabelText("Comment"), "comment content");

    expect(screen.queryByTestId("error-message")).toBeNull();

    const button = await screen.findByTestId("submit");

    userEvent.click(button);

    await waitFor(() => {
      expect(consoleLogSpy).toBeCalled();
    });
  });
});
