import { motion } from "motion/react";
import { ReactNode } from "react";
type UpAnimProps = {
  children: ReactNode;
};
export function UpAnim({ children }: UpAnimProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",

        stiffness: 300,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  );
}
