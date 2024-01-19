import { Center, Grid, GridItem } from '@chakra-ui/react';
import * as React from 'react';
import AppBar from './AppBar';

type MainLayoutProps = {
   children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
   return (
      <>
         <Grid
            templateAreas={`"header header"
                  "main main"`}
            gridTemplateRows={'60px 1fr'}
            h="100%"
            w='100%'
            gap="1"
         >
            <GridItem area={'header'}>
               <AppBar></AppBar>
            </GridItem>
            <GridItem area={'main'}>
               <Center>{children}</Center>
            </GridItem>
         </Grid>
      </>
   );
};
