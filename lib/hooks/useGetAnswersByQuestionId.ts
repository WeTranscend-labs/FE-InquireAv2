'use client';

import { useState, useEffect, useCallback } from 'react';
import { useReadContract, useWatchContractEvent } from 'wagmi';
import { contractABI } from '../contracts/contractABI';

export interface ContractAnswer {
  id: bigint;
  responder: string;
  answerText: string;
  upvotes: bigint;
  rewardAmount: bigint;
  createdAt: bigint;
}

export function useGetAnswersByQuestionId(
  questionId?: bigint,
  initialPageIndex = 1,
  initialPageSize = 10,
  pollInterval = 5000000
) {
  const [pageIndex, setPageIndex] = useState(initialPageIndex);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [answers, setAnswers] = useState<ContractAnswer[]>([]);
  const [totalAnswers, setTotalAnswers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Hook đọc contract
  const {
    data: contractData,
    error: contractError,
    refetch,
  } = useReadContract({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'getAnswersByQuestionId',
    args: questionId ? [questionId, pageIndex, pageSize] : undefined,
    query: {
      enabled: !!questionId,
    },
  });

  // Xử lý dữ liệu từ contract
  const processAnswers = useCallback(
    (
      data: any
    ): {
      processedAnswers: ContractAnswer[];
      total: number;
      pages: number;
    } => {
      if (!data) return { processedAnswers: [], total: 0, pages: 0 };

      const [rawAnswers, totalAnswers, totalPages] = data as [
        ContractAnswer[],
        bigint,
        bigint
      ];

      const processedAnswers: ContractAnswer[] = rawAnswers.map((answer) => ({
        ...answer,
        upvotes: BigInt(Number(answer.upvotes)),
      }));

      return {
        processedAnswers,
        total: Number(totalAnswers),
        pages: Number(totalPages),
      };
    },
    []
  );

  // Effect để polling và cập nhật answers
  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setIsLoading(true);

        // Nếu không có questionId, không thực hiện
        if (!questionId) {
          setIsLoading(false);
          return;
        }

        // Gọi refetch để lấy dữ liệu mới nhất
        const { data } = await refetch();

        if (data) {
          const { processedAnswers, total, pages } = processAnswers(data);

          // Cập nhật answers mới, tránh duplicate
          setAnswers((prevAnswers) => {
            const uniqueNewAnswers = processedAnswers.filter(
              (newAnswer) =>
                !prevAnswers.some(
                  (existingAnswer) => existingAnswer.id === newAnswer.id
                )
            );

            return uniqueNewAnswers.length > 0
              ? [...uniqueNewAnswers, ...prevAnswers]
              : prevAnswers;
          });

          setTotalAnswers(total);
          setTotalPages(pages);
        }

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
        setIsLoading(false);
      }
    };

    // Thực hiện ngay lập tức
    fetchAnswers();

    // Thiết lập interval polling
    const intervalId = setInterval(fetchAnswers, pollInterval);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [questionId, pageIndex, pageSize, pollInterval, refetch, processAnswers]);

  // Xử lý lỗi từ contract
  useEffect(() => {
    if (contractError) {
      setError(contractError);
      setIsLoading(false);
    }
  }, [contractError]);

  // Hàm thay đổi trang
  const changePage = useCallback(
    (newPageIndex: number) => {
      if (newPageIndex > 0 && newPageIndex <= totalPages) {
        setPageIndex(newPageIndex);
      }
    },
    [totalPages]
  );

  // Hàm thay đổi kích thước trang
  const changePageSize = useCallback((newPageSize: number) => {
    if (newPageSize > 0) {
      setPageSize(newPageSize);
      setPageIndex(1);
    }
  }, []);

  // Hàm submit answer với optimistic update
  const submitOptimisticAnswer = useCallback(
    async (answerText: string) => {
      try {
        // Tạo answer tạm thời
        const optimisticAnswer: ContractAnswer = {
          id: BigInt(Date.now()), // Temp ID
          responder: 'current_user_address', // Thay bằng địa chỉ thực tế
          answerText,
          upvotes: BigInt(0),
          rewardAmount: BigInt(0),
          createdAt: BigInt(Date.now()),
        };

        // Thêm answer tạm vào state
        setAnswers((prev) => [optimisticAnswer, ...prev]);

        // Thực hiện submit answer thực tế
        // Gọi contract method submit answer ở đây

        // Sau khi submit, refetch để cập nhật
        await refetch();
      } catch (err) {
        // Nếu submit thất bại, remove answer tạm
        // setAnswers((prev) =>
        //   prev.filter((ans) => ans.id !== optimisticAnswer.id)
        // );
        console.error(err);
        throw err;
      }
    },
    [refetch]
  );

  return {
    answers,
    totalAnswers,
    totalPages,
    currentPage: pageIndex,
    pageSize,
    isLoading,
    error,
    changePage,
    changePageSize,
    submitOptimisticAnswer,
    refetch,
  };
}
