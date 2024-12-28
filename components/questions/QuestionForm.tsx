'use client';

import { MinimumFeeInfo } from '@/components/features/MinimumFeeInfo';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/lib/hooks/use-toast';
import { useAskQuestion } from '@/lib/hooks/useAskQuestion';
import {
  questionSchema,
  type QuestionFormValues,
} from '@/lib/validations/question';
import { zodResolver } from '@hookform/resolvers/zod';
import { ethers } from 'ethers';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { QuestionFormFields } from './QuestionFormFields';
import { QuestionGuidelines } from './QuestionGuidelines';
import { QuestionPreview } from './QuestionPreview';
import { useAccount, useConnect } from 'wagmi';

export function QuestionForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPreview, setShowPreview] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const { isConnected } = useAccount();

  const {
    askQuestion,
    isPending,
    isConfirming,
    isConfirmed,
    error: contractError,
  } = useAskQuestion();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      title: '',
      content: '',
      bounty: 1,
      tags: [],
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (isConfirmed) {
      toast({
        title: 'Question Submitted',
        description: 'Your question has been successfully added.',
        variant: 'default',
        className: 'toast-success',
      });

      reset();
    }
  }, [isConfirmed, reset, router, toast]);

  const onSubmit = async (data: QuestionFormValues) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to submit a question.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitError(null);

      const category = data.tags.join(', ');
      const rewardAmount = ethers.parseEther(data.bounty.toString());

      // Show initial loading toast
      const loadingToast = toast({
        title: 'Submitting Question',
        description: 'Waiting for transaction approval...',
        duration: 10000,
      });

      await askQuestion({
        questionText: data.title,
        questionContent: data.content,
        category,
        deadlinePeriod: 0,
        rewardAmount,
      });

      loadingToast.dismiss();
      toast({
        title: 'Processing Transaction',
        description: 'Confirming on blockchain...',
        duration: 10000,
      });
    } catch (error) {
      console.error(error);

      toast({
        title: 'Submission Failed',
        description: contractError?.message || 'Failed to submit question',
        variant: 'destructive',
      });

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
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isPending || isConfirming}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Waiting for signature...
              </>
            ) : isConfirming ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Confirming transaction...
              </>
            ) : (
              'Submit Question'
            )}
          </Button>
        </div>
      </div>
    );
  }

  console.log(isConfirmed);

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
                <Button type="submit" disabled={isPending || isConfirming}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Waiting for signature...
                    </>
                  ) : isConfirming ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Confirming transaction...
                    </>
                  ) : (
                    'Submit Question'
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      </div>

      <div className="space-y-6">
        <MinimumFeeInfo minimumFee={1} userReputation={1} />
        <QuestionGuidelines />
      </div>
    </div>
  );
}
