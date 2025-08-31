interface AbilityContentSectionProps {
  title: string;
  content: string;
  isItalic?: boolean;
}

export function AbilityContentSection({ title, content, isItalic = false }: AbilityContentSectionProps) {
  if (!content) {
    return null;
  }

  return (
    <div>
      <h4 className="text-sm font-medium text-gray-900 mb-2">{title}</h4>
      <p className={`text-sm text-gray-600 leading-relaxed ${isItalic ? 'italic' : ''}`}>{isItalic ? `"${content}"` : content}</p>
    </div>
  );
}
