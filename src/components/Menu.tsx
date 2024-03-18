"use client";
import { useEffect, useRef } from "react";

interface IMenu {
  open: boolean;
  handleMenuState: (state: boolean) => () => void;
  modal?: boolean;
  children: React.ReactNode;
}

const Menu: React.FC<IMenu> = ({
  children,
  open,
  handleMenuState,
  modal = false,
}) => {
  const wrapperRef = useRef<any>(null);

  const handleClick = () => {
    if (modal) {
      handleMenuState(false)();
    }
  };
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleMenuState(false)();
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const content = (
    <div ref={wrapperRef} className={`${open ? "visible" : "invisible"}`}>
      {children}
    </div>
  );

  return modal ? (
    <div
      className={`${
        open ? "visible" : "invisible"
      } fixed top-0 z-50 left-0 overflow-auto h-screen w-screen backdrop-opacity-75 bg-black/70 flex justify-center items-center`}
    >
      {content}
    </div>
  ) : (
    content
  );
};

export default Menu;
