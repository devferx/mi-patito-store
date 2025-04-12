import express from 'express'

import duckRoutes from './routes/ducks.routes'

import { orm } from './lib/prisma'

async function main() {
  const app = express()
  const port = process.env.PORT || 3005

  app.use(express.json())

  app.use('/api/ducks', duckRoutes)

  app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`)
  })
}

main()
  .then(async () => {
    await orm.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await orm.$disconnect()
    process.exit(1)
  })
