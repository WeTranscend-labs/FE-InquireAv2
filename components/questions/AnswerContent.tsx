'use client';

import { markdownToHtml } from '@/lib/utils/markdown';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface AnswerContentProps {
  content: string;
  className?: string;
}

export function AnswerContent({ content, className = '' }: AnswerContentProps) {
  const [htmlContent, setHtmlContent] = useState('');
  const { theme } = useTheme(); // Lấy theme hiện tại

  useEffect(() => {
    const renderContent = async () => {
      const rendered = await markdownToHtml(content);
      setHtmlContent(rendered);
    };
    renderContent();
  }, [content]);

  // Tạo className tùy theo theme
  const contentClass = theme === 'dark' ? 'dark:prose-invert' : 'prose';

  return (
    <div
      className={`max-w-none ${contentClass} ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
}
