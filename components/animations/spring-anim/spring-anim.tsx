import { motion } from "motion/react";
import { ReactNode } from "react";
type SpringAnimProps = {
  children: ReactNode;
};
export function SpringAnime({ children }: SpringAnimProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{
        type: "spring",

        stiffness: 600,
        damping: 8,
      }}
    >
      {children}
    </motion.div>
  );
}
