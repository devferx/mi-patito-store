import { ColumnDef } from '@tanstack/react-table'

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
  },
  {
    accessorKey: 'quantity',
    header: 'Cantidad',
  },
]
