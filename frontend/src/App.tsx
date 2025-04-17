import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

import { queryClient } from './lib/react-query'

import HomePage from './features/ducks/pages/home-page'

import { MainLayout } from './components/main-layout'

const CreateDuckPage = lazy(
  () => import('./features/ducks/pages/create-duck-page'),
)
const EditDuckPage = lazy(() => import('./features/ducks/pages/edit-duck-page'))

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-duck" element={<CreateDuckPage />} />
              <Route path="/edit-duck/:id" element={<EditDuckPage />} />
            </Routes>
          </Suspense>
        </MainLayout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
