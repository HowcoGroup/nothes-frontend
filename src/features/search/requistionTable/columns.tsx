import { ColumnDef } from "@tanstack/react-table"

export type Requisition = {
    requesitionNumber: string
    requisitionDate: string
    requesitionStatus: string
    requester: string
    requesitionVendor: string
    requesitionDescription: string
    requesitionApprover: number
  }
   
  export const columns: ColumnDef<Requisition>[] = [
    {
      accessorKey: "pophead_id",
      header: "Requisition Number",
    },
    {
      accessorKey: "pophead_date",
      header: "Requisition Date",
    },
    {
      accessorKey: "pophead_description",
      header: "Status",
    },
    {
      accessorKey: "pophead_requestedby",
      header: "Requester",
    },
    {
      accessorKey: "VEN_NM",
      header: "Requisition Vendor",
    },
    {
      accessorKey: "pophead_comments",
      header: "Requisition Description",
    },
    {
      accessorKey: "approver_name",
      header: "Appprover",
    }
  ]
