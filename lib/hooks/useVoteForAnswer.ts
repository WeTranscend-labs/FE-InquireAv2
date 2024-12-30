'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { contractABI as abi } from '../contracts/contractABI';

export interface VoteArgs {
  questionId: bigint;
  answerId: bigint;
}

export function useVoteForAnswer() {
  // Gửi giao dịch vote
  const { data: hash, error, isPending, writeContract } = useWriteContract();

  const voteForAnswer = async ({ questionId, answerId }: VoteArgs) => {
    try {
      writeContract({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        abi: abi,
        functionName: 'voteForAnswer',
        args: [questionId, answerId],
      });
    } catch (err) {
      console.error('Error voting for answer:', err);
      throw err;
    }
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return {
    voteForAnswer,
    isPending,
    hash,
    isConfirming,
    isConfirmed,
    error,
  };
}
