'use client';

import { ContractQuestion, useGetQuestions } from '@/lib/hooks/useGetQuestions';
import { QuestionCard } from './QuestionCard';
import { formatEther } from 'viem';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { QuestionsSort } from './QuestionsSort';

export default function QuestionsList({ filter }: { filter: string | null }) {
  const { questions, isLoading, pagination, changePage } = useGetQuestions();
  const [filteredQuestions, setFilteredQuestions] = useState<ContractQuestion[]>([]);
  const [sortOption, setSortOption] = useState<string>('newest');
  const [loading, setLoading] = useState(false);

  const { currentPage, totalPages } = pagination ?? { currentPage: 1, totalPages: 1 };

  useEffect(() => {
    setLoading(true);

    let updatedQuestions = questions.filter((question) => {
      if (filter === 'Recent') return true;
      if (filter === 'Most Voted') return false; // Không có `votes`, giữ false.
      if (filter === 'Highest Bounty') return question.rewardAmount > BigInt(30);
      if (filter === 'Unanswered') return question.isClosed === false && !question.chosenAnswerId;
      return question.category.toLowerCase().includes(filter?.toLowerCase() || '');
    });

    // Sắp xếp theo sortOption
    updatedQuestions = updatedQuestions.sort((a, b) => {
      if (sortOption === 'newest') return Number(b.createdAt) - Number(a.createdAt);
      if (sortOption === 'votes') return 0; // Tạm để 0 vì không có `votes`.
      if (sortOption === 'bounty') return Number(b.rewardAmount) - Number(a.rewardAmount);
      if (sortOption === 'answers') return 0; // Tạm để 0 vì không có `answers`.
      return 0;
    });

    setTimeout(() => {
      setFilteredQuestions(updatedQuestions);
      setLoading(false);
    }, 200);
  }, [filter, questions, sortOption]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="h-[120px] w-full" />
        ))}
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-500 text-lg">No questions found for the selected filter and sort option.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Thành phần Sort */}
      <QuestionsSort sortOption={sortOption} onSortChange={setSortOption} />

      {/* Danh sách câu hỏi */}
      {filteredQuestions.map((question) => (
        <QuestionCard
          key={question.id.toString()}
          question={{
            id: question.id.toString(),
            title: question.questionText,
            content: question.questionContent,
            bounty: Number(formatEther(question.rewardAmount)),
            answers: 0, 
            votes: 0, 
            tags: question.category.split(',').map((tag: any) => tag.trim()), 
            author: question.asker,
            createdAt: new Date(Number(question.createdAt) * 1000),
          }}
        />
      ))}

      {/* Điều hướng phân trang */}
      <div className="flex justify-between mt-4">
        <Button
          variant="outline"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
