import { motion } from "motion/react";
import { ReactNode } from "react";
type UpAnimProps = {
  children: ReactNode;
  className?: string;
};
export function UpAnim({ children, className }: UpAnimProps) {
  return (
    <motion.div
      className={className}
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
