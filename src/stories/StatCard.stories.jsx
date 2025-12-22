import StatCard from "../components/StatCard";
import WorkIcon from "@mui/icons-material/Work";
import AssignmentIcon from "@mui/icons-material/Assignment";
import GroupIcon from "@mui/icons-material/Group";

export default {
  title: "Components/StatCard",
  component: StatCard,
  argTypes: {
    title: { control: "text" },
    value: { control: "text" },
    color: { control: "text" },
  },
};

export const Default = {
  args: {
    title: "Projects",
    value: "12",
    icon: WorkIcon,
    color: "primary",
  },
};

export const Secondary = {
  args: {
    title: "Tasks",
    value: "87",
    icon: AssignmentIcon,
    color: "secondary",
  },
};

export const Success = {
  args: {
    title: "Team Members",
    value: "04",
    icon: GroupIcon,
    color: "success",
  },
};
