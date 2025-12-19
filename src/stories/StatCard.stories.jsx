import StatCard from "../components/StatCard";

export default {
  title: "Components/StatCard",
  component: StatCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
  },
};

export const Default = {
  args: {
    title: "Projects",
    value: "12",
  },
};

export const CustomValue = {
  args: {
    title: "Tasks Completed",
    value: "87",
  },
};
