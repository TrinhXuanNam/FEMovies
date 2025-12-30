interface DropdownArrowProps {
  className?: string;
  size?: number;
  color?: string;
  direction?: 'up' | 'down';
}

export default function DropdownArrow({
  className = '',
  size = 20,
  color = '#767D8B',
  direction = 'down',
}: DropdownArrowProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      className={`transition-transform duration-300 ease-in-out ${
        direction === 'up' ? 'rotate-180' : 'rotate-0'
      } ${className}`}
    >
      <path d="M10.0002 14.1667L16.6668 6.66675H3.3335L10.0002 14.1667Z" fill={color} />
    </svg>
  );
}

