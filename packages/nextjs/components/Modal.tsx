import React, { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen: boolean;
  toggle: () => void;
  height: string;
  width: string;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div className="modal-box" style={{ width: props.width, height: props.height }}>
            {props.children}
          </div>
        </div>
      )}
    </>
  );
}
