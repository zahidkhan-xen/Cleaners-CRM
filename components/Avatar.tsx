interface Props {
  initials: string;
  color: string;
  size?: number;
}

export default function Avatar({ initials, color, size = 24 }: Props) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full text-white font-bold shrink-0"
      style={{ background: color, width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials}
    </span>
  );
}
