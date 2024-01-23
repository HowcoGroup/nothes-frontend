import {
   ColumnDef,
   flexRender,
   getCoreRowModel,
   useReactTable,
   getPaginationRowModel,
} from '@tanstack/react-table';

import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table';

import { Spinner } from '@chakra-ui/react';
import ItemRow from './item-table/item-row';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';

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
      getPaginationRowModel: getPaginationRowModel(),
   });

   return (
      <div>
         <div className="rounded-md border border-black">
            <Table>
               <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                     <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                           return (
                              <TableHead key={header.id}>
                                 {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                         header.column.columnDef.header,
                                         header.getContext(),
                                      )}
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
                        <Collapsible key={row.id} asChild>
                           <>
                              <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                 {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                 ))}
                              </TableRow>
                              <CollapsibleContent asChild>
                                 <ItemRow
                                    itemId={(row.original as { pophead_id: number }).pophead_id}
                                 ></ItemRow>
                              </CollapsibleContent>
                           </>
                        </Collapsible>
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
         <div className="flex items-center justify-end space-x-2 py-4">
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.previousPage()}
               disabled={!table.getCanPreviousPage()}
            >
               Previous
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => table.nextPage()}
               disabled={!table.getCanNextPage()}
            >
               Next
            </Button>
         </div>
      </div>
   );
}
