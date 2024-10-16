import express, { json } from "express"
import cors from 'cors'
import { usersRouter } from "./src/routes/users.js"

const app = express()
app.disable("x-powered-by")

app.use(json())
app.use(cors())

app.use("/users", usersRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log("Server listening on PORT " + PORT)
})