import Button from "@mui/material/Button";

const PrimaryButton = ({ children, onClick, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

export default PrimaryButton;
