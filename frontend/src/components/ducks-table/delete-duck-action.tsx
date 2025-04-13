import { Trash2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

import { useDeleteDuck } from '@/hooks/use-delete-duck'

import type { Duck } from '@/models/duck'

interface DeleteDuckDialogProps {
  duck: Duck
}

export const DeleteDuckAction = ({ duck }: DeleteDuckDialogProps) => {
  const { deleteDuckMutation, handleDelete } = useDeleteDuck()
  const isDeleting = deleteDuckMutation.isPending

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-red-500 hover:bg-red-50 hover:text-red-700"
        >
          <Trash2 className="mr-1 h-4 w-4" /> Borrar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción eliminará el patito del inventario. Esta acción no se
            puede deshacer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            disabled={isDeleting}
            onClick={() => handleDelete(duck.id.toString())}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? 'Eliminando...' : 'Eliminar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
