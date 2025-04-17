import { ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: ReactNode
  className?: string
}

export const StatCard = ({ title, value, className = '' }: StatCardProps) => {
  return (
    <Card
      className={`duck-shadow transition-transform duration-200 hover:scale-105 ${className}`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-muted-foreground text-sm font-medium">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  )
}
