"use client"

import { markdownToHtml } from '@/lib/utils/markdown'
import { useEffect, useState } from 'react'

interface AnswerContentProps {
  content: string
  className?: string
}

export function AnswerContent({ content, className = '' }: AnswerContentProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    const renderContent = async () => {
      const rendered = await markdownToHtml(content)
      setHtmlContent(rendered)
    }
    renderContent()
  }, [content])

  return (
    <div 
      className={`prose dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}