import { ReactNode } from "react";
type BaseCard = {
  children?: ReactNode;
  className?: string;
};

export function BaseCard({ children, className }: BaseCard) {
  return (
    <>
      <div
        className={
          " shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)]  bg-white/50 rounded-[20px] p-5.5 relative overflow-hidden " +
          className
        }
      >
        {children}
      </div>

      {/* <div */}
      {/*   className={ */}
      {/*     " shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.03)] rounded-[20px] p-5.5 relative overflow-hidden bg-radial-[at_75%_25%] from-white to-[#f6f6f6] to-85%" + */}
      {/*     className */}
      {/*   } */}
      {/* > */}
      {/*   <div className="absolute -top-20 -right-10 bg-radial blur-2xl from-primary-start/30 to-primary-stop/33 rounded-[50px] w-30 h-30"></div> */}
      {/*   {children} */}
      {/* </div> */}
    </>
  );
}
