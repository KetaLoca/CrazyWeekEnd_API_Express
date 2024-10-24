import z from 'zod'

const reservaSchema = z.object({
    id: z.string().uuid({ message: 'Debe ser un UUID válido' }),
    userEmail: z.string().email({ message: 'Debe ser un email válido' }),
    alojamientoId: z.string().uuid({ message: 'Debe ser un UUID válido' }),
    fechaInicio: z.string(),
    fechaFin: z.string()
})

export const validateReserva = (object) => {
    return reservaSchema.safeParse(object)
}

export const validatePartialReserva = (object) => {
    return reservaSchema.partial().safeParse(object)
}