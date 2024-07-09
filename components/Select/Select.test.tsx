import userEvent from "@testing-library/user-event";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { render } from "@/libs/test-utils";
import { FormControl } from "../FormControl";
import { Select } from ".";

describe("Select", () => {
  const OPTIONS = ["option1", "option2", "option3"];

  it("renders a select with the specified value", () => {
    const value = OPTIONS[0];
    const { getByRole } = render(<Select options={OPTIONS} value={value} />);

    const trigger = getByRole("combobox");

    expect(trigger).toHaveTextContent(value);
  });

  it("renders a placeholder text", () => {
    const placeholder = "placeholder";
    const { getByRole } = render(<Select options={OPTIONS} placeholder={placeholder} />);

    const trigger = getByRole("combobox");

    expect(trigger).toHaveTextContent(placeholder);
  });

  it("renders a custom value", () => {
    const value = OPTIONS[0];
    const { getByRole } = render(
      <Select
        options={OPTIONS}
        value={value}
        renderValue={(value) => <span>custom {value}</span>}
      />
    );

    const trigger = getByRole("combobox");

    expect(trigger).toHaveTextContent(`custom ${value}`);
  });

  it("renders custom options", async () => {
    const { getByRole, getAllByRole } = render(
      <Select options={OPTIONS} renderOption={(option) => <span>custom {option}</span>} />
    );

    await userEvent.click(getByRole("combobox"));
    const options = getAllByRole("option");

    options.forEach((option, i) => expect(option).toHaveTextContent(`custom ${OPTIONS[i]}`));
  });

  it("renders a custom icon", () => {
    const testId = "test";
    const Icon = () => (
      <span data-testid={testId}>
        <TriangleDown />
      </span>
    );
    const { getByTestId } = render(<Select options={OPTIONS} icon={Icon} />);

    const icon = getByTestId(testId);

    expect(icon).toBeInTheDocument();
  });

  it("renders with default form states", () => {
    const { getByRole } = render(<Select options={OPTIONS} />);

    const trigger = getByRole("combobox");

    expect(trigger).not.toBeRequired();
    expect(trigger).not.toBeDisabled();
    expect(trigger).not.toHaveAttribute("aria-readonly");
    expect(trigger).not.toHaveAttribute("aria-invalid");
  });

  it("sets the trigger button as required when required prop is passed", () => {
    const { getByRole } = render(<Select options={OPTIONS} required />);

    const trigger = getByRole("combobox");

    expect(trigger).toBeRequired();
  });

  it("sets the trigger button as disabled when disabled prop is passed", () => {
    const { getByRole } = render(<Select options={OPTIONS} disabled />);

    const trigger = getByRole("combobox");

    expect(trigger).toBeDisabled();
  });

  it("sets the trigger button as required when readOnly prop is passed", () => {
    const { getByRole } = render(<Select options={OPTIONS} readOnly />);

    const trigger = getByRole("combobox");

    expect(trigger).toHaveAttribute("aria-readonly");
  });

  it("sets the button as required when hasError prop is passed", () => {
    const { getByRole } = render(<Select options={OPTIONS} hasError />);

    const trigger = getByRole("combobox");

    expect(trigger).toHaveAttribute("aria-invalid");
  });

  describe("User Interactions", () => {
    it("opens the dropdown when the trigger button is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} />);

      expect(queryByRole("listbox")).not.toBeInTheDocument();

      await userEvent.click(getByRole("combobox"));

      expect(getByRole("listbox")).toBeInTheDocument();
    });

    it("closes the dropdown when the outside of select is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} />);

      await userEvent.click(getByRole("combobox"));
      await userEvent.click(document.body);

      expect(queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("closes the dropdown when the option is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} />);

      await userEvent.click(getByRole("combobox"));
      await userEvent.click(getByRole("option", { name: OPTIONS[1] }));

      expect(queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("doesn't open the dropdown when the disabled button is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} disabled />);

      await userEvent.click(getByRole("combobox"));

      expect(queryByRole("listbox")).not.toBeInTheDocument();
    });

    it("changes the select value when the other option is clicked", async () => {
      const ControlledSelect = () => {
        const [value, setValue] = useState("");

        return (
          <Select
            options={OPTIONS}
            placeholder="select a value"
            value={value}
            onChangeValue={setValue}
          />
        );
      };
      const value = OPTIONS[0];
      const { getByRole } = render(<ControlledSelect />);

      const trigger = getByRole("combobox");
      expect(trigger).not.toHaveTextContent(value);

      await userEvent.click(getByRole("combobox"));
      await userEvent.click(getByRole("option", { name: value }));

      expect(trigger).toHaveTextContent(value);
    });
  });

  describe("Integration with FormControl", () => {
    it("has form states passed from FormControl", () => {
      const { getByRole } = render(
        <FormControl required disabled readOnly hasError>
          <Select options={OPTIONS} />
        </FormControl>
      );

      const trigger = getByRole("combobox");

      expect(trigger).toHaveAttribute("aria-required");
      expect(trigger).toHaveAttribute("aria-disabled");
      expect(trigger).toHaveAttribute("aria-readonly");
      expect(trigger).toHaveAttribute("aria-invalid");
    });
  });
});
