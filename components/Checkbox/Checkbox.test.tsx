import { useState } from "react";
import { render } from "@/libs/test-utils";
import { FormGroup, FormGroupLabel } from "../FormControl";
import { Checkbox } from "./Checkbox";

describe("Checkbox", () => {
  it("renders a checked/unchecked state by checked prop", () => {
    const { getByRole } = render(
      <>
        <Checkbox checked={true} onChange={jest.fn()}>
          option1
        </Checkbox>
        <Checkbox checked={false} onChange={jest.fn()}>
          option2
        </Checkbox>
      </>
    );

    const checked = getByRole("checkbox", { checked: true });
    const unchecked = getByRole("checkbox", { checked: false });

    expect(checked).toBeInTheDocument();
    expect(unchecked).toBeInTheDocument();
  });

  it("renders a required checkbox when required prop is passed", () => {
    const { getByRole } = render(<Checkbox required checked={false} onChange={jest.fn()} />);

    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeRequired();
  });

  it("renders a disabled checkbox when disabled prop is passed", () => {
    const { getByRole } = render(<Checkbox disabled checked={false} onChange={jest.fn()} />);

    const checkbox = getByRole("checkbox");

    expect(checkbox).toBeDisabled();
  });

  it("renders a readonly checkbox when readOnly prop is passed", () => {
    const { getByRole } = render(<Checkbox readOnly checked={false} onChange={jest.fn()} />);

    const checkbox = getByRole("checkbox");

    expect(checkbox).toHaveAttribute("readonly");
  });

  it("renders a invalid checkbox when hasError prop is passed", () => {
    const { getByRole } = render(<Checkbox hasError checked={false} onChange={jest.fn()} />);

    const checkbox = getByRole("checkbox");

    expect(checkbox).toHaveAttribute("aria-invalid");
  });

  describe("Integration with FormGroup", () => {
    const LABEL = "LABEL";
    const OPTIONS = ["option1", "option2", "option3"];

    const CheckboxGroup = () => {
      const [isChecked, setIsChecked] = useState<Array<boolean>>(new Array(3).fill(false));

      return (
        <FormGroup required disabled hasError readOnly>
          <FormGroupLabel>{LABEL}</FormGroupLabel>
          {OPTIONS.map((option, i) => (
            <Checkbox
              key={i}
              checked={isChecked[i]}
              onChange={() => {
                setIsChecked((prev) => {
                  const cloned = [...prev];
                  cloned[i] = !cloned[i];
                  return cloned;
                });
              }}
            >
              {option}
            </Checkbox>
          ))}
        </FormGroup>
      );
    };

    it("has form states passed from FormGroup", () => {
      const { getAllByRole } = render(<CheckboxGroup />);

      const checkboxes = getAllByRole("checkbox");

      checkboxes.forEach((checkbox) => {
        expect(checkbox).toBeRequired();
        expect(checkbox).toBeDisabled();
        expect(checkbox).toHaveAttribute("readonly");
        expect(checkbox).toHaveAttribute("aria-invalid");
      });
    });
  });
});
