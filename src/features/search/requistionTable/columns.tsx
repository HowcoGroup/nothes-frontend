import { ColumnDef } from "@tanstack/react-table"

export type Requisition = {
    requesitionNumber: string
    requisitionDate: string
    requesitionStatus: string
    requester: string
    requesitionVendor: string
    requesitionDescription: string
    requesitionApprover: string
  }
   
  export const columns: ColumnDef<Requisition>[] = [
    {
      accessorKey: "pophead_id",
      header: "Requesition Number",
    },
    {
      accessorKey: "pophead_date",
      header: "Requesition Date",
    },
    {
      accessorKey: "pophead_recordstatus",
      header: "Requesition Status",
    },
    {
      accessorKey: "pophead_requestedby",
      header: "Requester",
    },
    {
      accessorKey: "VEN_NM",
      header: "Requesition Vendor",
    },
    {
      accessorKey: "pophead_comments",
      header: "Requesition Description",
    },
    {
      accessorKey: "Requesition Approver",
      header: "Appprover",
    }
  ]
