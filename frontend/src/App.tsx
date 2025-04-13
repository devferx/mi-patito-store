import { QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Route, Routes } from 'react-router'

import { queryClient } from './lib/react-query'

import { HomePage } from './pages/home-page'
import { CreateDuckPage } from './pages/create-duck-page'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create-duck" element={<CreateDuckPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
