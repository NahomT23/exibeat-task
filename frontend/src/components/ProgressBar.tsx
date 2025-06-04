import React from "react";

interface ProgressBarProps {
  progress: number; 
  className?: string;
}

export default function ProgressBar({ progress, className = "" }: ProgressBarProps) {
  return (
    <div className={`w-full bg-gray-200 h-2 rounded-full overflow-hidden ${className}`}>
      <div
        style={{ width: `${progress}%` }}
        className="h-full bg-blue-500"
      />
    </div>
  );
}
