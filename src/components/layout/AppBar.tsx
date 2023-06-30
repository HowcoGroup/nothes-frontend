import { useAppSelector } from '@/hooks/hooks'; 
import logo from '@/assets/HowcoLogoWithText.png';
import { selectTitle } from '@/stores/slices/titleSlice';

import {
   Box,
   Flex,
   Text,
   IconButton,
   Button,
   Stack,
   Image,
   Icon,
   Link,
   Popover,
   PopoverTrigger,
   PopoverContent,
   useColorModeValue,
   useBreakpointValue,
   useDisclosure,
   Center,
} from '@chakra-ui/react';


export default function AppBar() {
   const title = useAppSelector(selectTitle);
   return (
      <Box>
         <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'50px'}
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
                  <Image objectFit="contain" objectPosition="50% 50%" src={logo} alt="Howco Logo" />
               </Center>
            </Flex>
            <Text>{title}</Text>            
            <Stack flex={{ base: 1, md: 0 }} justify={'flex-end'} direction={'row'} spacing={6}>
               <Button
                  as={'a'}
                  display={{ base: 'none', md: 'inline-flex' }}
                  fontSize={'sm'}
                  fontWeight={600}
                  color={'white'}
                  bg={'pink.400'}
                  href={'#'}
                  _hover={{
                     bg: 'pink.300',
                  }}
               >
                  Login
               </Button>
            </Stack>
         </Flex>
      </Box>
   );
}
