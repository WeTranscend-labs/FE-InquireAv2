'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI as abi } from '../contracts/contractABI';

export interface AskQuestionArgs {
  questionText: string;
  questionContent: string;
  category: string;
  deadlinePeriod: number;
  rewardAmount: bigint;
}

export function useAskQuestion() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const askQuestion = async ({
    questionText,
    questionContent,
    category,
    deadlinePeriod,
    rewardAmount,
  }: AskQuestionArgs) => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'askQuestion',
        args: [questionText, questionContent, category, deadlinePeriod],
        value: rewardAmount,
      });
    } catch (err) {
      console.error('Error asking question:', err);
      throw err;
    }
  };

  // Chờ xác nhận transaction
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    askQuestion,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
