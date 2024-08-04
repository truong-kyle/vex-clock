import React from "react";

interface buttonProps {
  name: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function StopWatchButton({
  name,
  onClick,
  disabled = false,
}: buttonProps) {
 
  return (
    <button onClick={onClick} disabled={disabled}>
      {name}
    </button>
  );
}
