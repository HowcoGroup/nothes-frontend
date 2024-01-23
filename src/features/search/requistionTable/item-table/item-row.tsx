import { TableCell, TableRow } from '@/components/ui/table';
import { Item } from '@/models/item';
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import { toast } from '@/components/ui/use-toast';

export interface ItemRowProps {
   itemId: number;
}

export default function ItemRow({ itemId }: ItemRowProps) {
   const [items, setItems] = useState<Item[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      if (!itemId) return;
      const getItemsById = async (itemId: number) => {
         try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${itemId}`, {
               method: 'GET',
               mode: 'cors',
               headers: {
                  'Content-Type': 'application/json',
               },
            });
            const data = await res.json();
            setItems(data.items);
            setIsLoading(false);
         } catch (error) {
            toast({
               title: 'No results found',
               description: 'item not found',
               variant: 'destructive',
            });
            setIsLoading(false);
         }
      };
      getItemsById(itemId);
   }, [itemId]);
   console.log(items);
   return (
      <>
         {isLoading ? (
            <TableRow>
               <TableCell colSpan={6} className="h-24 text-center">
                  <Spinner></Spinner>
               </TableCell>
            </TableRow>
         ) : (
            <>
               {items.map((item) => (
                  <TableRow className="bg-blue-200 hover:bg-blue-100">
                     <TableCell>
                        <strong>GL-{item.glNumber}</strong>
                     </TableCell>
                     <TableCell>
                        <strong>Due Date:</strong> {item.dueDate.toString().slice(0, 10)}
                     </TableCell>

                     <TableCell>{item.approvalstatus}</TableCell>
                     {/* <TableCell>{item.quantity}</TableCell>
                     <TableCell>{item.price}</TableCell> */}
                     <TableCell>{item.department}</TableCell>
                     <TableCell></TableCell>
                     <TableCell>{item.description}</TableCell>

                     <TableCell>
                        <strong>Delivery:</strong> {item.delivered.toString().slice(0, 10)}
                     </TableCell>
                     <TableCell><strong>Total: </strong>${item.quantity * item.price}</TableCell>
                  </TableRow>
               ))}
            </>
         )}
      </>
   );
}
