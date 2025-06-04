interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function Badge({ children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded ${className}`}
    >
      {children}
    </span>
  );
}
