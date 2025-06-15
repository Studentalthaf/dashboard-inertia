"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Barang = {
  nama_barang: string
  nomer_barang: string
  asal_barang: string
}

interface DataTableProps {
  data: Barang[]
}

export function DataTable({ data }: DataTableProps) {
  const columns = React.useMemo<ColumnDef<Barang>[]>(
    () => [
      { accessorKey: "nama_barang", header: "Nama Barang" },
      { accessorKey: "nomer_barang", header: "Nomer Barang" },
      { accessorKey: "asal_barang", header: "Asal Barang" },
    ],
    []
  )

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-2">
        <Input
          placeholder="Filter nama barang..."
          value={(table.getColumn("nama_barang")?.getFilterValue() as string) ?? ""}
          onChange={event =>
            table.getColumn("nama_barang")?.setFilterValue(event.target.value)
          }
          className="max-w-xs"
        />
      </div>
      <div className="rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} className="py-3 px-4 text-left font-semibold text-sm">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow key={row.id} className="hover:bg-muted/50 transition-colors duration-150">
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="py-2 px-4 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  Tidak ada data.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
