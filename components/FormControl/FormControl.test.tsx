import { render } from "@/libs/test-utils";
import { Input } from "../Input";
import { Select } from "../Select";
import { TextArea } from "../TextArea";
import { FormControl, FormErrorMessage, FormLabel } from ".";

const LABEL = "label test";
const ERROR_MESSAGE = "error message test";

describe("FormControl", () => {
  it("renders with custom id", () => {
    const id = "test";
    const { getByLabelText } = render(
      <FormControl id={id}>
        <FormLabel>{LABEL}</FormLabel>
        <Input />
      </FormControl>
    );

    const input = getByLabelText(LABEL) as HTMLInputElement;

    expect(input.id).toEqual(id);
  });

  it("renders a Input component associated with label", () => {
    const { getByLabelText } = render(
      <FormControl disabled>
        <FormLabel>{LABEL}</FormLabel>
        <Input />
      </FormControl>
    );

    const input = getByLabelText(LABEL);

    expect(input).toBeInTheDocument();
  });

  it("renders a Select component associated with label", () => {
    const { getByLabelText } = render(
      <FormControl>
        <FormLabel>{LABEL}</FormLabel>
        <Select options={["option1", "option2"]} />
      </FormControl>
    );

    const select = getByLabelText(LABEL);

    expect(select).toBeInTheDocument();
  });

  it("renders a Textarea component associated with label", () => {
    const { getByLabelText } = render(
      <FormControl>
        <FormLabel>{LABEL}</FormLabel>
        <TextArea />
      </FormControl>
    );

    const textarea = getByLabelText(LABEL);

    expect(textarea).toBeInTheDocument();
  });

  describe("FormLabel", () => {
    it("renders required asterisk only when required prop is passed.", () => {
      const { getByRole } = render(
        <FormControl required>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
        </FormControl>
      );

      const asterisk = getByRole("presentation", { hidden: true });

      expect(asterisk).toBeInTheDocument();
    });

    it("has htmlFor attribute correctly", () => {
      const id = "test";
      const { getByText } = render(
        <FormControl id={id}>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
        </FormControl>
      );

      const label = getByText(LABEL) as HTMLLabelElement;

      expect(label.htmlFor).toEqual(id);
    });

    it("has id attribute correctly", () => {
      const id = "test";
      const { getByText } = render(
        <FormControl id={id}>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
        </FormControl>
      );

      const label = getByText(LABEL);

      expect(label.id).toEqual(`${id}-label`);
    });
  });

  describe("FormErrorMessage", () => {
    it("renders error message only when hasError prop is passed.", () => {
      const { queryByText, rerender } = render(
        <FormControl>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
          <FormErrorMessage>{ERROR_MESSAGE}</FormErrorMessage>
        </FormControl>
      );

      expect(queryByText(ERROR_MESSAGE)).not.toBeInTheDocument();

      rerender(
        <FormControl hasError>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
          <FormErrorMessage>{ERROR_MESSAGE}</FormErrorMessage>
        </FormControl>
      );

      expect(queryByText(ERROR_MESSAGE)).toBeInTheDocument();
    });

    it("has error message id", () => {
      const id = "test";
      const { getByText } = render(
        <FormControl id={id} hasError>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
          <FormErrorMessage>{ERROR_MESSAGE}</FormErrorMessage>
        </FormControl>
      );

      const errorMessage = getByText(ERROR_MESSAGE);

      expect(errorMessage.id).toEqual(`${id}-error-message`);
    });
  });

  describe("ARIA attributes", () => {
    it("links error message with the input when hasError prop is passed", () => {
      const id = "test";
      const { getByLabelText, getByText } = render(
        <FormControl id={id} hasError>
          <FormLabel>{LABEL}</FormLabel>
          <Input />
          <FormErrorMessage>{ERROR_MESSAGE}</FormErrorMessage>
        </FormControl>
      );

      const input = getByLabelText(LABEL);
      const errorMessage = getByText(ERROR_MESSAGE);

      expect(input).toHaveAttribute("aria-describedby", errorMessage.id);
    });

    it("links a custom aria-describedby", () => {
      const id = "test";
      const { getByLabelText } = render(
        <FormControl id={id} hasError>
          <FormLabel>{LABEL}</FormLabel>
          <Input aria-describedby={`${id}-custom-error-message`} />
          <FormErrorMessage>error</FormErrorMessage>
          <span id={`${id}-custom-error-message`}>error description</span>
        </FormControl>
      );

      const input = getByLabelText(LABEL);

      expect(input).toHaveAttribute(
        "aria-describedby",
        `${id}-custom-error-message ${id}-error-message`
      );
    });
  });
});
