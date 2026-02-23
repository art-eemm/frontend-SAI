type OptionCard = {
  title: string;
  description: string;
};

type OptionGridProps = {
  options: OptionCard[];
};

export default function OptionGrid({ options }: OptionGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {options.map((option, index) => (
        <div
          key={index}
          className="border border-brand-green rounded-xl p-6 bg-white hover:bg-gray-200 hover:cursor-pointer"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {option.title}
          </h3>
          <p className="text-sm text-gray-500">{option.description}</p>
        </div>
      ))}
    </div>
  );
}
