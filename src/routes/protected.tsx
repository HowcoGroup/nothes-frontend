import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from '@chakra-ui/react';

import { MainLayout } from '@/components/layout/MainLayout';
import { Search } from '@/features/search/search';


const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    element: <App />,
    children: [
      { path: '/', element: <Search></Search>  },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];