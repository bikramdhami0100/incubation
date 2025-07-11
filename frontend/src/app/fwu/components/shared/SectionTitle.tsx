// components/shared/SectionTitle.tsx
interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  accentColor?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  accentColor = 'indigo'
}) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const accentColorClass = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    teal: 'bg-teal-600',
    purple: 'bg-purple-600',
    green: 'bg-green-600',
  };

  const textColorClass = {
    indigo: 'text-indigo-600',
    blue: 'text-blue-600',
    teal: 'text-teal-600',
    purple: 'text-purple-600',
    green: 'text-green-600',
  };

  return (
    <div className={`mb-12 md:mb-16 ${alignmentClass[align]}`}>
      {subtitle && (
        <p className={`${textColorClass[accentColor as keyof typeof textColorClass]} font-semibold text-sm md:text-base uppercase tracking-wider mb-2`}>
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
        {title}
      </h2>
      <div className={`mt-4 h-1.5 w-24 ${align === 'center' ? 'mx-auto' : (align === 'right' ? 'ml-auto' : '')} ${accentColorClass[accentColor as keyof typeof accentColorClass]} rounded-full`}></div>
    </div>
  );
};

export default SectionTitle;