interface Props {
  children: React.ReactNode
}

export const MainLayout = ({ children }: Props) => {
  return (
    <main>
      <header className="bg-primary sticky top-0 z-10 p-4 text-white shadow-md">
        <div className="container mx-auto flex items-center gap-3">
          <h1 className="text-2xl font-bold">Mi Patito Store</h1>
        </div>
      </header>

      {children}
    </main>
  )
}
