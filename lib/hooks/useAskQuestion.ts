'use client';

import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from 'wagmi';
import { contractABI as abi } from '../contracts/contractABI';
import { network } from '@/configs/WalletConfig';

export interface AskQuestionArgs {
  questionText: string;
  questionContent: string;
  category: string;
  deadlinePeriod: number;
  rewardAmount: bigint;
}

export function useAskQuestion() {
  const { address: account } = useAccount();
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
        chain: network,
        account,
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
