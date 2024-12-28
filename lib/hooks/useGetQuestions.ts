'use client';
import { useState } from 'react';
import {
  useReadContract,
  UseReadContractParameters,
  UseReadContractReturnType,
} from 'wagmi';
import { contractABI } from '../contracts/contractABI';
import { Address } from 'viem';

export interface ContractQuestion {
  id: bigint;
  asker: string;
  questionText: string;
  questionContent: string;
  category: string;
  rewardAmount: bigint;
  createdAt: bigint;
  deadline: bigint;
  isClosed: boolean;
  chosenAnswerId: bigint;
}

export function useGetQuestions(initialPageSize = 10) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as Address,
    abi: contractABI,
    functionName: 'getQuestions',
    args: [page, pageSize],
    query: {
      enabled: true,
      staleTime: 1000 * 60 * 5,
    },
  });

  // Xử lý dữ liệu an toàn
  const processContractData = () => {
    if (!contractData || !Array.isArray(contractData)) {
      return {
        questions: [],
        totalQuestions: 0,
        totalPages: 0,
      };
    }

    return {
      questions: (contractData[0] as ContractQuestion[]) || [],
      totalQuestions: contractData[1] as bigint,
      totalPages: contractData[2] as bigint,
    };
  };

  const { questions, totalQuestions, totalPages } = processContractData();

  const changePage = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    refetch();
  };

  const pagination = {
    currentPage: page,
    pageSize,
    totalQuestions,
    totalPages,
  };

  return {
    questions,
    error,
    isLoading,
    pagination,
    changePage,
    changePageSize,
    refetch,
  };
}
