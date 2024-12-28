import { useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { useToast } from './use-toast'; // Giả sử bạn có hook toast

export interface SubmitAnswerArgs {
  questionId: bigint;
  answerText: string;
}

export function useAnswer() {
  const { toast } = useToast();
  const {
    data: hash,
    error,
    isPending,
    writeContract,
    isError,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const submitAnswer = async ({ questionId, answerText }: SubmitAnswerArgs) => {
    try {
      if (!answerText || !answerText.trim()) {
        throw new Error('Answer text cannot be empty');
      }

      if (answerText.length > 1000) {
        throw new Error('Answer text is too long');
      }

      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: 'submitAnswer',
        args: [questionId, answerText],
      });

      toast({
        title: 'Answer Submitted',
        description: 'Your answer is being processed',
        variant: 'default',
      });
    } catch (err) {
      console.error('Error submitting answer:', err);

      // Hiển thị toast lỗi
      toast({
        title: 'Submission Failed',
        description:
          err instanceof Error ? err.message : 'An unexpected error occurred',
        variant: 'destructive',
      });

      throw err;
    }
  };

  const resetState = () => {
    // Logic reset state nếu cần
  };

  return {
    submitAnswer,
    isPending,
    isConfirming,
    isConfirmed,
    isError,
    hash,
    error,
    resetState,
  };
}
