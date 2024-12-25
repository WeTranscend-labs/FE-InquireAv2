'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Alert } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { MinimumFeeInfo } from '@/components/features/MinimumFeeInfo';
import { QuestionGuidelines } from './QuestionGuidelines';
import { QuestionPreview } from './QuestionPreview';
import { QuestionFormFields } from './QuestionFormFields';
import {
  questionSchema,
  type QuestionFormValues,
} from '@/lib/validations/question';
import { useState } from 'react';
import { useAskQuestion } from '@/lib/hooks/useAskQuestion';
import { ethers } from 'ethers';

export function QuestionForm() {
  const router = useRouter();
  const [showPreview, setShowPreview] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sử dụng hook useAskQuestion
  const {
    askQuestion,
    isPending,
    isConfirmed,
    error: contractError,
  } = useAskQuestion();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      content: '',
      bounty: 10,
      tags: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: QuestionFormValues) => {
    try {
      setSubmitError(null);

      // Chuyển đổi tags thành category (nối tags thành string)
      const category = data.tags.join(', ');

      // Chuyển đổi bounty sang BigInt
      const rewardAmount = ethers.parseEther(data.bounty.toString());

      // Gọi hàm đặt câu hỏi
      await askQuestion({
        questionText: data.title,
        questionContent: data.content,
        category,
        deadlinePeriod: 0, // Mặc định là 1 tuần
        rewardAmount,
      });

      // Chuyển hướng sau khi đặt câu hỏi thành công
      if (isConfirmed) {
        router.push('/questions');
      }
    } catch (error) {
      console.error(error);
      setSubmitError('Failed to submit question. Please try again.');
    }
  };

  const formData = form.watch();

  if (showPreview) {
    return (
      <div className="space-y-4">
        <QuestionPreview
          title={formData.title}
          content={formData.content}
          tags={formData.tags}
          bounty={formData.bounty}
        />
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => setShowPreview(false)}>
            Edit Question
          </Button>
          <Button onClick={handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? 'Submitting...' : 'Submit Question'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-[1fr,300px] gap-8">
      <div className="space-y-6">
        {(submitError || contractError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <span className="ml-2">
              {submitError || contractError?.message || 'An error occurred'}
            </span>
          </Alert>
        )}

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <QuestionFormFields />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? 'Submitting...' : 'Submit Question'}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>

      <div className="space-y-6">
        <MinimumFeeInfo minimumFee={10} userReputation={750} />
        <QuestionGuidelines />
      </div>
    </div>
  );
}
