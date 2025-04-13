import { ColumnDef } from '@tanstack/react-table'
import { Pencil } from 'lucide-react'
import { Link } from 'react-router'

import { Button } from '@/components/ui/button'
import { ColorIndicator } from './color-indicator'
import { DeleteDuckAction } from './delete-duck-action'

import type { Duck } from '@/models/duck'

export const ducksTableColumns: ColumnDef<Duck>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => <ColorIndicator duckColor={row.original.color} />,
  },
  {
    accessorKey: 'size',
    header: 'Tamaño',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => {
      const price = row.original.price
      return <span>{price} USD</span>
    },
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
  },
  {
    id: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const duck = row.original

      return (
        <div>
          <Button variant="ghost" size="sm" className="h-8" asChild>
            <Link to={`/edit-duck/${duck.id}`}>
              <Pencil className="mr-1 h-4 w-4" /> Editar
            </Link>
          </Button>

          <DeleteDuckAction duck={duck} />
        </div>
      )
    },
  },
]
