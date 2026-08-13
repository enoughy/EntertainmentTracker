import { motion } from "motion/react";
import { ReactNode } from "react";
type PageInitAnimProps = {
  children: ReactNode;
};
export function PageInitAnim({ children }: PageInitAnimProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -100,
      }}
      transition={{
        duration: 0.8,
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
