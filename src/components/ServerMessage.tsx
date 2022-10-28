import React from "react";

type ServerMessageProps = {
  message?: string;
  status: number;
};

const ServerMessage = ({ message, status }: ServerMessageProps) => {
  const errorColor = "bg-red-500";
  const successColor = "bg-green-500";
  const errText = message || "Something went wrong";
  const successText = "Profile updated";
  return (
    <div
      className={`absolute bottom-0 left-0 w-full p-2 text-center text-lg font-medium text-white ${
        status === 200 ? successColor : errorColor
      }`}
    >
      <p className="mb-1">{status === 200 ? successText : errText}</p>
    </div>
  );
};

export default ServerMessage;
