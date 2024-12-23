"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function QuestionsSort() {
  return (
    <div className="flex justify-end">
      <Select defaultValue="newest">
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="votes">Most Votes</SelectItem>
          <SelectItem value="bounty">Highest Bounty</SelectItem>
          <SelectItem value="answers">Most Answers</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}