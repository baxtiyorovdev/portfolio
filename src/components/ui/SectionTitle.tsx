type Props = {
  title: string;
  className?: string;
};

export default function SectionTitle({
  title,
  className = "mb-4 text-2xl font-bold",
}: Props) {
  return <h2 className={className}>{title}</h2>;
}
