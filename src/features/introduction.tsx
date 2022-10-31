import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useRef } from "react";
import { Context } from "..";

const Introduction = () => {
  const { store } = useContext(Context);
  useEffect(() => {
    const handleModal = (e) => {
      if (!embededRef.current?.contains(e.target)) {
        store.setShowIntroduction(false);
      }
    };

    document.addEventListener("mousedown", handleModal);
    return () => {
      document.removeEventListener("mousedown", handleModal);
    };
  }, []);

  const embededRef = useRef<HTMLIFrameElement>(null);

  return (
    <>
      {store.showIntroductoin && (
        <div className="fixed z-40 flex h-screen w-full items-center justify-center bg-dark-transparent">
          <iframe
            ref={embededRef}
            className="aspect-video w-1/2"
            src="https://www.youtube.com/embed/PhWJBbQ5yEc"
          ></iframe>
        </div>
      )}
    </>
  );
};

export default observer(Introduction);
