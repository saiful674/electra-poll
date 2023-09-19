import React from "react";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const PushButton = () => {
  const { speak, cancel, speaking } = useContext(AuthContext);
  const stopSpeaking = () => {
    if (speaking) {
      cancel();
    }
  };
  return (
    <>
      {speaking && (
        <button
          onClick={stopSpeaking}
          className="fixed z-50 button-pre bottom-4 left-[7.1vw]  text-red-500 "
        >
          Stop Audio
        </button>
      )}
    </>
  );
};

export default PushButton;
