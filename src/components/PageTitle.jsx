import { motion } from "framer-motion";

const PageTitle = ({ children }) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        fontSize: "1.6rem",
        fontWeight: 700,
        background: "linear-gradient(90deg, #007bff, #00e0ff)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: "20px"
      }}
    >
      {children}
    </motion.h2>
  );
};

export default PageTitle;
