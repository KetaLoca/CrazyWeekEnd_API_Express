import express, { json } from "express"
import cors from 'cors'
import { usersRouter } from "./src/routes/users.js"
import { alojamientosRouter } from "./src/routes/alojamientos.js"

const app = express()
app.disable("x-powered-by")

app.use(json())
app.use(cors())

app.use("/users", usersRouter)
app.use("/alojamientos", alojamientosRouter)

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
    console.log("Server listening on PORT " + PORT)
})