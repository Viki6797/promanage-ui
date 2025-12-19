import PrimaryButton from "../components/PrimaryButton";

export default {
  title: "Components/PrimaryButton",
  component: PrimaryButton,
  argTypes: {
    children: { control: "text" },
    onClick: { action: "clicked" },
  },
};

export const Default = {
  args: {
    children: "Click Me",
  },
};
