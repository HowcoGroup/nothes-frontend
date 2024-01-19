import { useState, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import {
   FormField,
   FormItem,
   FormMessage,
   Form,
   FormLabel,
   FormControl,
} from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

import { cn, formatDate } from '@/lib/utils';
import { Approver } from '@/models/approver';
import { Requisition, columns } from "../search/requistionTable/columns";
import { DataTable } from "../search/requistionTable/data-table";

export const Search = () => {
   const formSchema = z.object({
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      requisitionNumber: z.coerce.number().optional(),
      requisitionStatus: z.coerce.number().optional(),
      businessUnit: z.string().optional(),
      type: z.string().optional(),
      vendor: z.string().optional(),
      itemDescription: z.string().optional(),
      requestedBy: z.string().optional(),
      approver: z.string().optional(),
   });

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         startDate: undefined,
         endDate: undefined,
         requisitionNumber: undefined,
         requisitionStatus: undefined,
         businessUnit: undefined,
         type: undefined,
         vendor: undefined,
         itemDescription: undefined,
         requestedBy: undefined,
         approver: undefined,
      },
   });

   const [approversList, setApproversList] = useState<Approver[]>([]);
   const [searchResults, setSearchResults] = useState<Requisition[]>([]);

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
      console.log(values);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(values),
      });
      const data = await res.json();
      setSearchResults(data.searchResults);
      console.log(data);
   }

   useEffect(() => {
      const getApprovers = async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/approvers`, {
            method: 'GET',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setApproversList(data.approvers);
      };
      getApprovers();
   }, []);

   return (
      <div>
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
               <div className="grid grid-flow-row grid-cols-4 gap-3">
                  <FormField
                     control={form.control}
                     name="requisitionNumber"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Requisition Number</FormLabel>
                           <FormControl>
                              <Input {...field} type="number" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="requisitionStatus"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Requisition Status</FormLabel>
                           <FormControl>
                              <Input {...field} type="number" />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="businessUnit"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Business Unit</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select business unit" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 <SelectItem value="1" key="1">
                                    New
                                 </SelectItem>
                                 <SelectItem value="2" key="2">
                                    Coding required
                                 </SelectItem>
                                 <SelectItem value="3" key="3">
                                    Approval Required
                                 </SelectItem>
                                 <SelectItem value="4" key="4">
                                    Approved
                                 </SelectItem>
                                 <SelectItem value="5" key="5">
                                    Rejected
                                 </SelectItem>
                                 <SelectItem value="6" key="6">
                                    Received
                                 </SelectItem>
                                 <SelectItem value="7" key="7">
                                    Invoiced
                                 </SelectItem>
                              </SelectContent>
                           </Select>
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="type"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Type</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="vendor"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Vendor</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="itemDescription"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Item Description</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="requestedBy"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Requestor</FormLabel>
                           <FormControl>
                              <Input {...field} />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="approver"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Approver</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select an approver" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {approversList.map((approver: Approver) => (
                                    <SelectItem
                                       key={approver.iPortUserId}
                                       value={approver.iPortUserId.toString()}
                                    >
                                       <span>
                                          {approver.FirstName} {approver.LastName}
                                       </span>
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="grid grid-cols-2 w-full justify-evenly items-center gap-3">
                  <FormField
                     control={form.control}
                     name="startDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>Start Date</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={'outline'}
                                       className={cn(
                                          'w-full pl-3 text-left font-normal',
                                          !field.value && 'text-muted-foreground',
                                       )}
                                    >
                                       {field.value ? (
                                          formatDate(field.value.toString())
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date > new Date() || date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <FormField
                     control={form.control}
                     name="endDate"
                     render={({ field }) => (
                        <FormItem className="flex flex-col">
                           <FormLabel>End Date</FormLabel>
                           <Popover>
                              <PopoverTrigger asChild>
                                 <FormControl>
                                    <Button
                                       variant={'outline'}
                                       className={cn(
                                          'w-full pl-3 text-left font-normal',
                                          !field.value && 'text-muted-foreground',
                                       )}
                                    >
                                       {field.value ? (
                                          formatDate(field.value.toString())
                                       ) : (
                                          <span>Pick a date</span>
                                       )}
                                    </Button>
                                 </FormControl>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                 <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                       date > new Date() || date < new Date('1900-01-01')
                                    }
                                    initialFocus
                                 />
                              </PopoverContent>
                           </Popover>
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="flex flex-row gap-3 items-center justify-center">
                  <Button className="" type="submit">
                     Search
                  </Button>
                  <Button className="bg-red-500 ">Clear</Button>
               </div>
            </form>
         </Form>
         <Separator className='mt-5'></Separator>
         <DataTable columns={columns} data={searchResults} />
      </div>
   );
};

export default Search;
