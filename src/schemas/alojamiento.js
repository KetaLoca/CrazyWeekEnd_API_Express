import z from 'zod'

const alojamientoSchema = z.object({
    id: z.string().uuid({ message: 'Debe ser un id válido' }),
    userEmail: z.string().email({ message: 'Debe ser un email válido' }),
    nombre: z.string({ message: 'El nombre debe ser una cadena de texto' }),
    descripcion: z.string({ message: 'La decripción debe ser una cadena de texto' }),
    imgURL: z.array(z.string().url({ message: 'Debe ser una URL válida' })),
    animales: z.boolean({ message: 'Debe ser un boolean' }),
    ubicacion: z.object({ lat: z.number(), lng: z.number() })
})

export const validateAlojamiento = (object) => {
    return alojamientoSchema.safeParse(object)
}

export const validatePartialAlojamiento = (object) => {
    return alojamientoSchema.partial().safeParse(object)
}