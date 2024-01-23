import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '../ui/collapsible';
import { ChevronUpIcon, ChevronDownIcon } from '@radix-ui/react-icons';
const ToggleButton = () => {
   const [isToggled, setIsToggled] = useState(true);

   const handleClick = () => {
      setIsToggled((prevIsToggled) => !prevIsToggled);
   };

   return (
      <CollapsibleTrigger asChild>
         <Button onClick={handleClick} variant={isToggled ? 'default' : 'destructive'}>
            {isToggled ? <ChevronUpIcon /> : <ChevronDownIcon />}
         </Button>
      </CollapsibleTrigger>
   );
};

export default ToggleButton;
