"use client";

import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

export const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed flex top-0 left-0 w-[100%] h-[100%] bg-[rgba(0,0,0,0.5)] z-9999 justify-center items-center overlay">
      <div className="bg-[white] rounded-[12px] p-10 max-w-[900px] w-[90%] modalContent">
        {children}
      </div>
    </div>,
    document.body,
  );
};

