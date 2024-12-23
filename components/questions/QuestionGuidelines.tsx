"use client"

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Shield, AlertTriangle, CheckCircle2 } from 'lucide-react'

export function QuestionGuidelines() {
  return (
    <div className="grid gap-4">
      <Alert variant="warning" className="bg-yellow-500/10 border-yellow-500/20">
        <Shield className="h-4 w-4 text-yellow-500" />
        <AlertTitle>Security Best Practices</AlertTitle>
        <AlertDescription className="mt-2 space-y-2">
          <p>When answering this smart contract question, consider:</p>
          <ul className="list-disc pl-4 space-y-1">
            <li>Security vulnerabilities and mitigation strategies</li>
            <li>Gas optimization techniques</li>
            <li>Code auditing recommendations</li>
            <li>Testing methodologies</li>
          </ul>
        </AlertDescription>
      </Alert>

      <Alert className="bg-primary/5 border-primary/20">
        <CheckCircle2 className="h-4 w-4 text-primary" />
        <AlertTitle>Answer Guidelines</AlertTitle>
        <AlertDescription className="mt-2">
          Provide detailed explanations with code examples and thorough security considerations.
          Include references to trusted resources and tools where applicable.
        </AlertDescription>
      </Alert>
    </div>
  )
}