import dotenv from "dotenv"
import express, { json } from "express"
import cors from 'cors'
import { usersRouter } from "./src/routes/users.js"
import { alojamientosRouter } from "./src/routes/alojamientos.js"
import { reservasRouter } from "./src/routes/reservas.js"
import { PORT } from "./config.js"
import cookieParser from "cookie-parser"

dotenv.config()

const app = express()
app.disable("x-powered-by")

app.use(json())
app.use(cors({
    origin: "https://crazyweekend570.jesuspb.dev",
    credentials: true
}))
app.use(cookieParser())

app.use("/users", usersRouter)
app.use("/alojamientos", alojamientosRouter)
app.use("/reservas", reservasRouter)

app.listen(PORT, () => {
    console.log("Server listening on PORT " + PORT)
})