import { ColumnDef } from '@tanstack/react-table'

import { getDuckColorLabel } from '@/utils/get-duck-color-label'

import type { Duck } from '@/models/duck'

export const ducksTableColumns: ColumnDef<Duck>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => {
      const duck = row.original
      return getDuckColorLabel(duck.color)
    },
  },
  {
    accessorKey: 'size',
    header: 'Tamaño',
  },
  {
    accessorKey: 'price',
    header: 'Precio',
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
  },
]
