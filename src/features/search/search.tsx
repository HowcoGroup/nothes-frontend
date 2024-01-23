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
import { Input as ChakraInput } from '@chakra-ui/react';
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select';

import { Approver } from '@/models/approver';
import { BusinessUnit } from '@/models/businessUnit';
import { Status } from '@/models/status';
import { Type } from '@/models/type';
import { Requisition, columns } from '../search/requistionTable/columns';
import { DataTable } from '../search/requistionTable/data-table';
import { useToast } from '@/components/ui/use-toast';

export const Search = () => {
   const { toast } = useToast();
   const formSchema = z.object({
      startDate: z.coerce.string().optional(),
      endDate: z.coerce.string().optional(),
      requisitionNumber: z.coerce.string().optional(),
      requisitionStatus: z.coerce.string().optional(),
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
         startDate: '',
         endDate: '',
         requisitionNumber: '',
         requisitionStatus: '',
         businessUnit: '',
         type: '',
         vendor: '',
         itemDescription: '',
         requestedBy: '',
         approver: '',
      },
   });

   const [approversList, setApproversList] = useState<Approver[]>([]);
   const [businessUnitList, setBusinessUnitList] = useState<BusinessUnit[]>([]);
   const [statusList, setStatusList] = useState<Status[]>([]);
   const [typeList, setTypeList] = useState<Type[]>([]);
   const [searchResults, setSearchResults] = useState<Requisition[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [key, setKey] = useState(+new Date());

   // 2. Define a submit handler.
   async function onSubmit(values: z.infer<typeof formSchema>) {
      setIsLoading(true);
      try {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
         });
         if (res.status !== 200) {
            const error = await res.json();
            toast({
               title: 'Error',
               description: error,
               variant: 'destructive',
            });
            setIsLoading(false);
            return;
         }
         const data = await res.json();
         setSearchResults(data.searchResults);
         if (data.searchResults.length === 0) {
            toast({
               title: 'No results found',
               description: 'No results found for the search criteria',
               variant: 'destructive',
            });
         }
         setIsLoading(false);
      } catch (error: any) {
         toast({
            title: 'Error',
            description: error.message,
            variant: 'destructive',
         });
         setIsLoading(false);
      }
   }

   const clear = () => {
      form.reset({
         startDate: '',
         endDate: '',
         requisitionNumber: '',
         requisitionStatus: '',
         businessUnit: '',
         type: '',
         vendor: '',
         itemDescription: '',
         requestedBy: '',
         approver: '',
      });
      setKey(+new Date());
   };

   const areAllControlsUndefined = Object.values(form.getValues()).every((value) => value === '');

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
      const getBusinessUnit = async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/businessUnit`, {
            method: 'GET',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setBusinessUnitList(data.businessUnit);
      };
      const getStatus = async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/status`, {
            method: 'GET',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setStatusList(data.status);
      };
      const getType = async () => {
         const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/type`, {
            method: 'GET',
            mode: 'cors',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const data = await res.json();
         setTypeList(data.type);
      };
      getApprovers();
      getBusinessUnit();
      getType();
      getStatus();
   }, []);

   return (
      <div className="w-full m-8">
         <div className="rounded-md border p-5 mb-8 border-black">
            <Form key={key} {...form}>
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
                              <FormLabel>Status</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select Status" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {statusList.map((status: Status) => (
                                       <SelectItem key={status.id} value={status.id.toString()}>
                                          <span>{status.description}</span>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
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
                                       <SelectValue placeholder="Select Business Unit" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {businessUnitList.map((businessUnit: BusinessUnit) => (
                                       <SelectItem
                                          key={businessUnit.id}
                                          value={businessUnit.id.toString()}
                                       >
                                          <span>{businessUnit.name}</span>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Type</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger>
                                       <SelectValue placeholder="Select Type" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {typeList.map((type: Type) => (
                                       <SelectItem key={type.id} value={type.id.toString()}>
                                          <span>{type.description}</span>
                                       </SelectItem>
                                    ))}
                                 </SelectContent>
                              </Select>
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
                              <ChakraInput
                                 placeholder="Select Date and Time"
                                 size="md"
                                 type="date"
                                 {...field}
                                 // value={
                                 //    field.value instanceof Date
                                 //       ? field.value.toISOString().split('T')[0]
                                 //       : field.value
                                 // }
                              />
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
                              <ChakraInput
                                 placeholder="Select Date and Time"
                                 size="md"
                                 type="date"
                                 {...field}
                                 // value={
                                 //    field.value instanceof Date
                                 //       ? field.value.toISOString().split('T')[0]
                                 //       : field.value
                                 // }
                              />
                           </FormItem>
                        )}
                     />
                  </div>
                  <div className="flex flex-row gap-3 items-center justify-center">
                     <Button
                        disabled={isLoading || areAllControlsUndefined}
                        className=""
                        type="submit"
                     >
                        Search
                     </Button>
                     <Button type="button" variant="destructive" onClick={clear}>
                        Clear
                     </Button>
                  </div>
               </form>
            </Form>
         </div>
         <DataTable columns={columns} data={searchResults} isLoading={isLoading} />
      </div>
   );
};

export default Search;
