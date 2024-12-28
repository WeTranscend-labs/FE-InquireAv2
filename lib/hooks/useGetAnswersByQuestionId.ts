'use client';

import { useState } from 'react';
import { useReadContract } from 'wagmi';
import { contractABI } from '../contracts/contractABI';

export interface ContractAnswer {
  id: bigint; // Thêm trường id
  responder: string;
  answerText: string;
  upvotes: bigint;
  rewardAmount: bigint;
  createdAt: bigint;
}

export function useGetAnswersByQuestionId(
  questionId?: bigint,
  initialPageIndex = 1,
  initialPageSize = 10
) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const {
    data: contractData,
    error,
    isLoading,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getAnswersByQuestionId',
    args: questionId ? [questionId, pageIndex, pageSize] : undefined,
    query: {
      enabled: !!questionId,
      staleTime: 1000 * 60 * 5, // 5 phút
    },
  });

  const processedAnswersData = (() => {
    if (!contractData) return undefined;

    const [answers, totalAnswers, totalPages] = contractData as [
      ContractAnswer[],
      bigint,
      bigint
    ];

    const processedAnswers = answers.map((answer) => ({
      id: answer.id,
      responder: answer.responder,
      answerText: answer.answerText,
      upvotes: Number(answer.upvotes),
      rewardAmount: answer.rewardAmount,
      createdAt: new Date(Number(answer.createdAt) * 1000),
    }));

    return {
      answers: processedAnswers,
      totalAnswers: Number(totalAnswers),
      totalPages: Number(totalPages),
    };
  })();

  // Hàm thay đổi trang
  const changePage = (newPageIndex: number) => {
    if (
      newPageIndex > 0 &&
      (!processedAnswersData || newPageIndex <= processedAnswersData.totalPages)
    ) {
      setPageIndex(newPageIndex);
      refetch();
    }
  };

  // Hàm thay đổi kích thước trang
  const changePageSize = (newPageSize: number) => {
    if (newPageSize > 0) {
      setPageSize(newPageSize);
      setPageIndex(1); // Reset về trang đầu tiên
      refetch();
    }
  };

  return {
    answers: processedAnswersData?.answers || [],
    totalAnswers: processedAnswersData?.totalAnswers || 0,
    totalPages: processedAnswersData?.totalPages || 0,
    currentPage: pageIndex,
    pageSize,
    isLoading,
    error,
    changePage,
    changePageSize,
    refetch,
  };
}
