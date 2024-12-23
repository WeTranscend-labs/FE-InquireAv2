import { QuestionsHeader } from '@/components/questions/QuestionsHeader'
import { QuestionFilters } from '@/components/questions/QuestionFilters'
import QuestionsList from '@/components/questions/QuestionsList'
import { QuestionsSort } from '@/components/questions/QuestionsSort'

export const metadata = {
  title: 'Questions - DevForum',
  description: 'Browse and search developer questions',
}

export default function QuestionsPage() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <QuestionsHeader />
      
      <div className="grid grid-cols-1 lg:grid-cols-[240px,1fr] gap-8">
        <QuestionFilters />
        
        <div className="space-y-4">
          <QuestionsSort />
          <QuestionsList />
        </div>
      </div>
    </div>
  )
}