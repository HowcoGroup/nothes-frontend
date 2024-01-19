import { useAppSelector } from '@/hooks/hooks'; 
import logo from '@/assets/HowcoLogoWithText.png';
import { selectTitle } from '@/stores/slices/titleSlice';

import {
   Flex,
   Text,
   Image,
   useColorModeValue,
   Center,
} from '@chakra-ui/react';


export default function AppBar() {
   const title = useAppSelector(selectTitle);
   return (
         <Flex h='100%'
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}
            justifyContent={'space-between'}
         >
            <Flex justify={{ base: 'center', md: 'start' }}>
               <Center boxSize="100px">
                  <Image w={50} h={50}  objectFit="contain" objectPosition="50% 50%" src={logo} alt="Howco Logo" />
               </Center>
            </Flex>
            <Text fontSize='4xl'>{title}</Text>            
         </Flex>
   );
}
