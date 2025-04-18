import express from 'express'
import cors from 'cors'

import { orm } from './lib/prisma'

import { boomErrorHandler } from './middlewares/error.handler'

import duckRoutes from './routes/ducks.routes'
import ordersRoutes from './routes/orders.routes'

async function main() {
  const app = express()
  const port = process.env.PORT || 3005

  app.use(express.json())
  app.use(cors())

  app.use('/api/ducks', duckRoutes)
  app.use('/api/orders', ordersRoutes)

  app.use(boomErrorHandler)

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
