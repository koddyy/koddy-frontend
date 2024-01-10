import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../Button";
import { Tooltip } from "./Tooltip";

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Primary: Story = {
  args: { children: "Tooltip" },
  render: () => {
    return (
      <div className="my-8">
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates aliquid dolorem
          voluptatem obcaecati voluptatibus facilis. Ipsam laborum fugit alias nesciunt doloremque,
          ut adipisci, porro culpa, molestias nostrum repudiandae id inventore.
        </div>
        <Tooltip content="tooltip">
          <Button>버튼</Button>
        </Tooltip>
      </div>
    );
  },
};
