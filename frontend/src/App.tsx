import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from './lib/react-query'

import { HomePage } from './pages/home-page'

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <HomePage />
    </QueryClientProvider>
  )
}
