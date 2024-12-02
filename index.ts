import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT || 3000

app.use('/public', express.static('public'))

app.get('/', (_req: Request, res: Response) => {
  res.sendFile(`${process.cwd()}/index.html`)
})

app.listen(port, () => {
  console.log(`Server is running at ${port}`)
})
