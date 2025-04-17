import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Props {
  title: string
  className?: string
  children: React.ReactNode
}

export const StatCard = ({ title, children, className = '' }: Props) => {
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
        <div className="text-2xl font-bold">{children}</div>
      </CardContent>
    </Card>
  )
}
