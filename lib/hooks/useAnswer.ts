import { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI } from '../contracts/contractABI';

export interface SubmitAnswerArgs {
  questionId: bigint;
  answerText: string;
}

export function useAnswer() {
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  const submitAnswer = async ({ questionId, answerText }: SubmitAnswerArgs) => {
    try {
      // Validate input
      if (!answerText.trim()) {
        throw new Error('Answer text cannot be empty');
      }

      writeContract({
        address: '0xYourContractAddress', // Địa chỉ contract
        abi: contractABI,
        functionName: 'submitAnswer',
        args: [questionId, answerText],
      });
    } catch (err) {
      console.error('Error submitting answer:', err);
      throw err;
    }
  };

  return {
    submitAnswer,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  };
}
