'use client';

import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Send, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import ContentEditor from '../common/ContentEditor';

interface AnswerEditorProps {
  questionId: string;
  onSubmit: (content: string) => Promise<void>;
  minimumLength?: number;
}

export function AnswerEditor({
  questionId,
  onSubmit,
  minimumLength = 100,
}: AnswerEditorProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    const plainTextContent = content.replace(/<[^>]*>/g, '').trim();
    setCharCount(plainTextContent.length);
  }, [content]);

  const handleSubmit = async () => {
    if (charCount < minimumLength) {
      setError(`Answer must be at least ${minimumLength} characters long`);
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(content);
      setContent('');
    } catch (err) {
      setError('Failed to submit answer. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCounterColor = () => {
    if (charCount === 0) return 'text-muted-foreground';
    if (charCount < minimumLength * 0.5) return 'text-red-500';
    if (charCount < minimumLength) return 'text-yellow-500';
    return 'text-green-500';
  };

  const percentComplete = Math.min(
    100,
    Math.floor((charCount / minimumLength) * 100)
  );

  return (
    <Card className="p-0 overflow-hidden border border-border/50 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="bg-muted/30 px-6 py-4 border-b border-border/50">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          Your Answer
          <div className="text-xs font-normal text-muted-foreground bg-background/80 px-2 py-0.5 rounded-full">
            Question #{questionId}
          </div>
        </h3>
      </div>

      {error && (
        <Alert
          variant="destructive"
          className="m-6 mb-0 bg-destructive/10 border-destructive/20"
        >
          <AlertCircle className="h-4 w-4 text-destructive" />
          <span className="ml-2 text-sm font-medium">{error}</span>
        </Alert>
      )}

      <div className="p-6 space-y-4">
        <div className="border border-border/50 rounded-md overflow-hidden transition-all focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/30">
          <ContentEditor
            initialValue={content}
            onChange={(newContent) => setContent(newContent)}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
          <div className="flex flex-col w-full sm:w-auto">
            <div className="w-full sm:w-48 bg-muted/30 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ease-out ${
                  percentComplete >= 100
                    ? 'bg-green-500'
                    : percentComplete > 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${percentComplete}%` }}
              />
            </div>
            <span className={`text-xs mt-1 ${getCounterColor()}`}>
              {charCount} / {minimumLength} characters minimum
            </span>
          </div>

          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || charCount < minimumLength}
            className="w-full sm:w-auto transition-all duration-200 relative"
            size="lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Post Answer
              </>
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
