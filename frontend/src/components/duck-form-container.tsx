import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ChevronLeft } from 'lucide-react'
import { Button } from './ui/button'

interface Props {
  children: React.ReactNode
}

export const DuckFormContainer = ({ children }: Props) => {
  return (
    <>
      <Card className="mx-auto w-[400px]">
        <CardHeader className="flex items-center gap-4">
          <Button
            className="cursor-pointer"
            variant="outline"
            size="icon"
            onClick={handleBack}
          >
            <ChevronLeft />
          </Button>

          <CardTitle className="text-xl">
            {isEditing ? 'Editar patito' : 'Agregar nuevo patito'}
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </>
  )
}
