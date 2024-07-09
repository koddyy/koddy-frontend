import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { render } from "@/libs/test-utils";
import { FormGroupLabel } from "../FormControl";
import { Radio, RadioGroup, RadioGroupProps } from ".";

describe("RadioGroup", () => {
  const NAME = "option";
  const LABEL = "label";
  const OPTIONS = ["option1", "option2"];

  const RadioGroupExample = (props: RadioGroupProps) => (
    <RadioGroup {...props}>
      <FormGroupLabel>{LABEL}</FormGroupLabel>
      {OPTIONS.map((option, i) => (
        <Radio key={i} value={option}>
          {option}
        </Radio>
      ))}
    </RadioGroup>
  );

  it("renders a unchecked radio by default", () => {
    const { getAllByRole } = render(<RadioGroupExample name={NAME} />);

    const radios = getAllByRole("radio");

    radios.forEach((radio) => expect(radio).not.toBeChecked());
  });

  it("renders a checked radio with specified value", () => {
    const value = "option1";
    const { getAllByRole } = render(
      <RadioGroupExample name={NAME} value={value} onChangeValue={() => {}} />
    );

    const radio = (getAllByRole("radio") as HTMLInputElement[]).find(
      (radio) => radio.value === value
    );

    expect(radio).toBeChecked();
  });

  it("renders radio inputs with the same name ", () => {
    const { getAllByRole } = render(<RadioGroupExample name={NAME} />);

    const radios = getAllByRole("radio") as HTMLInputElement[];

    radios.forEach((radio) => expect(radio.name).toEqual(NAME));
  });

  it("renders a required group of radio inputs when required prop is passed", () => {
    const { getByRole, getAllByRole } = render(<RadioGroupExample name={NAME} required />);

    const radioGroup = getByRole("radiogroup");
    const radios = getAllByRole("radio");

    expect(radioGroup).toBeRequired();
    radios.forEach((radio) => expect(radio).toBeRequired());
  });

  it("renders a disabled group of radio inputs when disabled prop is passed", () => {
    const { getByRole, getAllByRole } = render(<RadioGroupExample name={NAME} disabled />);

    const radioGroup = getByRole("radiogroup");
    const radios = getAllByRole("radio");

    expect(radioGroup).toHaveAttribute("aria-disabled");
    radios.forEach((radio) => expect(radio).toBeDisabled());
  });

  it("renders a readonly group of radio inputs when readonly prop is passed", () => {
    const { getByRole, getAllByRole } = render(<RadioGroupExample name={NAME} readOnly />);

    const radioGroup = getByRole("radiogroup");
    const radios = getAllByRole("radio");

    expect(radioGroup).toHaveAttribute("aria-readonly");
    radios.forEach((radio) => expect(radio).toHaveAttribute("readonly"));
  });

  it("renders FormGroupLabel child", () => {
    const { getByLabelText } = render(<RadioGroupExample name={NAME} />);

    const radioGroup = getByLabelText(LABEL);

    expect(radioGroup).toBeInTheDocument();
  });

  it("changes checked radio when user clicks the unchecked radio", async () => {
    const defaultValue = OPTIONS[0];
    const targetValue = OPTIONS[1];
    const ControlledRadioGroup = () => {
      const [value, setValue] = useState(defaultValue);

      return <RadioGroupExample name={NAME} value={value} onChangeValue={setValue} />;
    };

    const { getByDisplayValue } = render(<ControlledRadioGroup />);

    const defaultRadio = getByDisplayValue(defaultValue);
    const targetRadio = getByDisplayValue(targetValue);

    expect(defaultRadio).toBeChecked();
    expect(targetRadio).not.toBeChecked();

    await userEvent.click(targetRadio);

    expect(defaultRadio).not.toBeChecked();
    expect(targetRadio).toBeChecked();
  });
});
