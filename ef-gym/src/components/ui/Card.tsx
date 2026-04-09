interface CardProps {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'article' | 'section';
}

export default function Card({ children, className = '', as: Tag = 'div' }: CardProps) {
  return (
    <Tag
      className={`
        rounded-xl border border-gray-200 bg-white p-6 shadow-sm
        dark:border-gray-700 dark:bg-gray-800
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
