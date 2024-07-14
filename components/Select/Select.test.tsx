import userEvent from "@testing-library/user-event";
import { useState } from "react";
import TriangleDown from "@/assets/triangle-down.svg";
import { render, within } from "@/libs/test-utils";
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
    it("toggles the dropdown when the trigger button is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} />);

      expect(queryByRole("listbox")).not.toBeInTheDocument();

      await userEvent.click(getByRole("combobox"));
      expect(getByRole("listbox")).toBeInTheDocument();

      await userEvent.click(getByRole("combobox"));
      expect(queryByRole("listbox")).not.toBeInTheDocument();
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

    it("doesn't open the dropdown when the readonly button is clicked", async () => {
      const { queryByRole, getByRole } = render(<Select options={OPTIONS} readOnly />);

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

  describe("Used as multi-select", () => {
    const OPTIONS = ["option1", "option2", "option3", "option4", "option5"];

    it("renders the selected values when value prop is array", () => {
      const values = ["option1", "option2"];
      const { getByRole } = render(<Select multiple options={OPTIONS} value={values} />);

      const trigger = getByRole("combobox");

      values.forEach((value) => expect(trigger).toHaveTextContent(value));
    });

    it("renders a placeholder text when value prop is empty array", () => {
      const placeholder = "select options...";
      const values: string[] = [];
      const { getByRole } = render(
        <Select multiple options={OPTIONS} placeholder={placeholder} value={values} />
      );

      const trigger = getByRole("combobox");

      expect(trigger).toHaveTextContent(placeholder);
    });

    it("renders the selected values using the renderValue prop", () => {
      const values = ["option1", "option2"];
      const { getByRole } = render(
        <Select
          multiple
          options={OPTIONS}
          value={values}
          renderValue={(values) => values.map((value) => <span key={value}>custom {value}</span>)}
        />
      );

      const trigger = getByRole("combobox");

      values.forEach((value) => expect(trigger).toHaveTextContent(`custom ${value}`));
    });

    describe("User Interactions", () => {
      const ControlledMultiSelect = () => {
        const [values, setValues] = useState<string[]>([]);

        return <Select multiple options={OPTIONS} value={values} onChangeValue={setValues} />;
      };

      it("doesn't close the dropdown when an option is clicked", async () => {
        const { getByRole } = render(<ControlledMultiSelect />);

        await userEvent.click(getByRole("combobox"));
        await userEvent.click(getByRole("option", { name: OPTIONS[1] }));

        expect(getByRole("listbox")).toBeInTheDocument();
      });

      it("adds/removes the value when the unselected/selected dropdown option is clicked", async () => {
        const { getByRole } = render(<ControlledMultiSelect />);

        const trigger = getByRole("combobox");
        await userEvent.click(trigger);

        for (const option of OPTIONS) {
          await userEvent.click(getByRole("option", { name: option }));
        }

        OPTIONS.forEach((option) => expect(within(trigger).getByText(option)).toBeInTheDocument());

        for (const option of OPTIONS) {
          await userEvent.click(getByRole("option", { name: option }));
        }

        OPTIONS.forEach((option) =>
          expect(within(trigger).queryByText(option)).not.toBeInTheDocument()
        );
      });

      it("removes the value when the selected value in trigger button is clicked", async () => {
        const { getByRole } = render(<ControlledMultiSelect />);

        const trigger = getByRole("combobox");
        await userEvent.click(trigger);

        for (const option of OPTIONS) {
          await userEvent.click(getByRole("option", { name: option }));
        }

        OPTIONS.forEach((option) => expect(within(trigger).getByText(option)).toBeInTheDocument());

        for (const option of OPTIONS) {
          await userEvent.click(within(trigger).getByText(option));
        }

        OPTIONS.forEach((option) =>
          expect(within(trigger).queryByText(option)).not.toBeInTheDocument()
        );
      });

      it("closes the dropdown when the selected value is clicked", async () => {
        const { getByRole } = render(<ControlledMultiSelect />);

        const trigger = getByRole("combobox");
        await userEvent.click(trigger);
        await userEvent.click(getByRole("option", { name: OPTIONS[0] }));

        await userEvent.click(within(trigger).getByText(OPTIONS[0]));

        expect(within(trigger).queryByText(OPTIONS[0])).not.toBeInTheDocument();
      });
    });
  });
});
