import { ColumnDef } from '@tanstack/react-table';
import ToggleButton from '@/components/utility/ToggleButton';
import { CollapsibleTrigger } from '@/components/ui/collapsible';
export type Requisition = {
   requesitionNumber: string;
   requisitionDate: string;
   requesitionStatus: string;
   requester: string;
   requesitionVendor: string;
   requesitionDescription: string;
   requesitionApprover: number;
};

export const columns: ColumnDef<Requisition>[] = [
   {
      accessorKey: 'pophead_id',
      header: 'Requisition Number',
   },
   {
      accessorKey: 'pophead_date',
      header: 'Requisition Date',
   },
   {
      accessorKey: 'popstatus_description',
      header: 'Status',
   },
   {
      accessorKey: 'pophead_requestedby',
      header: 'Requester',
   },
   {
      accessorKey: 'VEN_NM',
      header: 'Requisition Vendor',
   },
   {
      accessorKey: 'pophead_comments',
      header: 'Requisition Description',
   },
   {
      accessorKey: 'approver_name',
      header: 'Appprover',
   },
   {
      header: 'Open Items',
      cell: () => {
         return <ToggleButton></ToggleButton>;
      },
   },
];
