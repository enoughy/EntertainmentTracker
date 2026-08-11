import { motion } from "motion/react";
import { ReactNode } from "react";
type StatusCardAnimProps = {
  children: ReactNode;
};
export function StatusCardAnim({ children }: StatusCardAnimProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",

        stiffness: 600,
        damping: 10,
      }}
    >
      {children}
    </motion.div>
  );
}
