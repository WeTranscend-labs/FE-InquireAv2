"use client";

import { useState } from 'react';
import { QuestionsHeader } from '@/components/questions/QuestionsHeader';
import { QuestionFilters } from '@/components/questions/QuestionFilters';
import QuestionsList from '@/components/questions/QuestionsList';
import { QuestionsSort } from '@/components/questions/QuestionsSort';

export default function QuestionsPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Recent');

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <QuestionsHeader />
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
        <QuestionFilters onFilterChange={handleFilterChange} />
        <div className="space-y-4">
    
          <QuestionsList filter={selectedFilter} />
        </div>
      </div>
    </div>
  );
}
