import TextInput from "../components/TextInput";

export default {
  title: "Components/TextInput",
  component: TextInput,
  argTypes: {
    label: { control: "text" },
    value: { control: "text" },
    onChange: { action: "changed" },
  },
};

export const Default = {
  args: {
    label: "Enter your name",
    value: "",
  },
};
