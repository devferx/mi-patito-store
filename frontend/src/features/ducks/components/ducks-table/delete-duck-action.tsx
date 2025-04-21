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

import { useDeleteDuck } from '@ducks/hooks/use-delete-duck'

import type { Duck } from '@/models/duck'
import { getDuckColorDetails } from '@ducks/utils/get-duck-color-details'

interface DeleteDuckDialogProps {
  duck: Duck
}

export const DeleteDuckAction = ({ duck }: DeleteDuckDialogProps) => {
  const { deleteDuckMutation, handleDelete } = useDeleteDuck()
  const isDeleting = deleteDuckMutation.isPending

  const { color, label } = getDuckColorDetails(duck.color)

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="h-8 cursor-pointer text-red-500 hover:bg-red-50 hover:text-red-700"
          variant="ghost"
          size="sm"
        >
          <Trash2 className="mr-1 h-4 w-4" /> Delete
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <div className="bg-muted/30 mt-2 rounded-md border p-4">
              <div className="mb-2 flex items-center gap-2">
                <div
                  className="h-4 w-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="font-medium">
                  {label} Duck {duck.size}
                </span>
              </div>
              <div className="text-muted-foreground text-sm">
                ID: {duck.id} | Quantity: {duck.quantity.toLocaleString()} |
                Price: {duck.price} USD
              </div>
            </div>

            <p className="mt-4">
              This action will remove the duck from inventory. This action
              cannot be undone
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
            onClick={() => handleDelete(duck.id.toString())}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
