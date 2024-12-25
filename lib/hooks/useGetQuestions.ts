'use client';
import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';

// Định nghĩa kiểu dữ liệu cho Question từ contract
export interface ContractQuestion {
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

export function useGetQuestions() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const {
    data: questions,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getQuestions',
    args: [page, pageSize],
    query: {
      enabled: true, // Luôn cho phép query
      staleTime: 1000 * 60 * 5, // Cache 5 phút
    },
  });

  // Hàm để thay đổi trang
  const changePage = (newPage: number) => {
    setPage(newPage);
    refetch();
  };

  // Hàm để thay đổi số lượng item trên trang
  const changePageSize = (newPageSize: number) => {
    setPageSize(newPageSize);
    refetch();
  };

  return {
    questions: (questions as ContractQuestion[]) || [],
    error,
    isLoading,
    page,
    pageSize,
    changePage,
    changePageSize,
    refetch,
  };
}
