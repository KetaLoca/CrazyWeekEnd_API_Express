import z from 'zod'

const alojamientoSchema = z.object({
    id: z.string().uuid(),
    userEmail: z.string().email({ message: 'Debe ser un email válido' }),
    nombre: z.string(),
    descripcion: z.string(),
    imgURL: z.array(z.string().url({ message: 'Debe ser una URL válida' })),
    animales: z.boolean(),
    ubicacion: z.string()
})

export const validateAlojamiento = (object) => {
    return alojamientoSchema.safeParse(object)
}

export const validatePartialAlojamiento = (object) => {
    return alojamientoSchema.partial().safeParse(object)
}