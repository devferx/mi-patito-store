import { ColumnDef } from '@tanstack/react-table'

import { Pencil, Trash2 } from 'lucide-react'
import { Button } from '../ui/button'

import { ColorIndicator } from './color-indicator'

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
    cell: () => {
      return (
        <div>
          <Button variant="ghost" size="sm" onClick={() => {}} className="h-8">
            <Pencil className="mr-1 h-4 w-4" /> Editar
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-red-500 hover:bg-red-50 hover:text-red-700"
            onClick={() => {}}
          >
            <Trash2 className="mr-1 h-4 w-4" /> Borrar
          </Button>
        </div>
      )
    },
  },
]
