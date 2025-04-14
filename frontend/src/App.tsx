import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import { queryClient } from './lib/react-query'

import { HomePage } from './pages/home-page'
import { CreateDuckPage } from './pages/create-duck-page'
import { EditDuckPage } from './pages/edit-duck-page'

import { MainLayout } from './components/main-layout'
import { Toaster } from 'sonner'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create-duck" element={<CreateDuckPage />} />
            <Route path="/edit-duck/:id" element={<EditDuckPage />} />
          </Routes>
        </MainLayout>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
