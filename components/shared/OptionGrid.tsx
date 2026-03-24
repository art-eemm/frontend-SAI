import Link from "next/link";

type OptionCard = {
  title: string;
  description: string;
  href: string;
};

type OptionGridProps = {
  options: OptionCard[];
};

export default function OptionGrid({ options }: OptionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option, index) => (
        <Link
          key={index}
          href={option.href}
          className="border border-brand-green rounded-xl p-6 bg-background hover:bg-accent hover:cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {option.title}
          </h3>
          <p className="text-sm text-muted-foreground">{option.description}</p>
        </Link>
      ))}
    </div>
  );
}
