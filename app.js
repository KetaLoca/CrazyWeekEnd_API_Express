import express, { json } from "express"
import cors from 'cors'

const PORT = process.env.PORT ?? 3000

const app = express()
app.disable("x-powered-by")

app.use(json())
app.use(cors())

app.listen(PORT, () => {
    console.log("Server listening on PORT " + PORT)
})