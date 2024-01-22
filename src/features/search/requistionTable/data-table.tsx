import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';

import { Spinner } from '@chakra-ui/react';

interface DataTableProps<TData, TValue> {
   columns: ColumnDef<TData, TValue>[];
   data: TData[];
   isLoading?: boolean;
}

export function DataTable<TData, TValue>({
   columns,
   data,
   isLoading,
}: DataTableProps<TData, TValue>) {
   const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
   });

   return (
      <div className="rounded-md border">
         <Table>
            <TableHeader>
               {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                     {headerGroup.headers.map((header) => {
                        return (
                           <TableHead key={header.id}>
                              {header.isPlaceholder
                                 ? null
                                 : flexRender(header.column.columnDef.header, header.getContext())}
                           </TableHead>
                        );
                     })}
                  </TableRow>
               ))}
            </TableHeader>
            <TableBody>
               {isLoading ? (
                  // Case: Loading
                  <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                        <Spinner></Spinner>
                     </TableCell>
                  </TableRow>
               ) : table.getRowModel().rows?.length ? (
                  // Case: Rows available
                  table.getRowModel().rows.map((row) => (
                     <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                        {row.getVisibleCells().map((cell) => (
                           <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                           </TableCell>
                        ))}
                     </TableRow>
                  ))
               ) : (
                  // Case: No rows
                  <TableRow>
                     <TableCell colSpan={columns.length} className="h-24 text-center">
                        No results.
                     </TableCell>
                  </TableRow>
               )}
            </TableBody>
         </Table>
      </div>
   );
}
