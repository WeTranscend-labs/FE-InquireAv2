'use client';

import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { ContractQuestion } from './useGetQuestions';

function isValidContractData(data: unknown): data is ContractQuestion {
  return (
    data !== null &&
    typeof data === 'object' &&
    'asker' in data &&
    'questionText' in data &&
    'questionContent' in data &&
    'category' in data &&
    'rewardAmount' in data &&
    'createdAt' in data &&
    'deadline' in data &&
    'isClosed' in data &&
    'chosenAnswerId' in data
  );
}

export function useGetQuestionById(initialQuestionId?: bigint) {
  const [questionId, setQuestionId] = useState<bigint | undefined>(
    initialQuestionId
  );

  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getQuestionById',
    args: questionId ? [questionId] : undefined,
    query: {
      enabled: !!questionId,
      staleTime: 1000 * 60 * 5,
    },
  });

  const processedQuestion: ContractQuestion | undefined = (() => {
    if (!contractData) return undefined;

    if (!isValidContractData(contractData)) {
      console.error('Invalid contract data', contractData);
      return undefined;
    }

    return {
      id: questionId || BigInt(0),
      asker: contractData.asker,
      questionText: contractData.questionText,
      questionContent: contractData.questionContent,
      category: contractData.category,
      rewardAmount: BigInt(contractData.rewardAmount),
      createdAt: BigInt(contractData.createdAt),
      deadline: BigInt(contractData.deadline),
      isClosed: contractData.isClosed,
      chosenAnswerId: BigInt(contractData.chosenAnswerId),
    };
  })();

  // Function to fetch question by ID
  const fetchQuestionById = (id: bigint) => {
    setQuestionId(id);
    refetch();
  };

  return {
    question: processedQuestion,
    error,
    isLoading,
    questionId,
    fetchQuestionById,
    refetch,
  };
}
