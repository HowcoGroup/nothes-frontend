import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CollapsibleTrigger } from '../ui/collapsible';

const ToggleButton = () => {
   const [isToggled, setIsToggled] = useState(true);

   const handleClick = () => {
      setIsToggled((prevIsToggled) => !prevIsToggled);
   };

   return (
      <CollapsibleTrigger asChild>
         <Button onClick={handleClick} variant={isToggled ? 'default' : 'destructive'}>
            {isToggled ? 'Open' : 'Close'}
         </Button>
      </CollapsibleTrigger>
   );
};

export default ToggleButton;
