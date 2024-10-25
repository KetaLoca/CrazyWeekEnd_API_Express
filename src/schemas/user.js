import z from 'zod'

const userSchema = z.object({
    email: z.string({ required_error: 'El campo de email es obligatorio' }).email({ message: 'Este campo solo admite emails' }),
    password: z.string({ required_error: 'El campo de contraseña es obligatorio', message: 'La contraseña debe ser una cadena de texto' }),
    nombre: z.string({ required_error: 'El campo de nombre es obligatorio' }),
    apellidos: z.string({ required_error: 'El campo de apellidos es obligatorio' }),
    telefono: z.number({ required_error: 'El campo de teléfono es obligatorio' }).int({ message: 'El campo de teléfono debe ser un número entero' }).max(999999999).min(0)
})

export function validateUser(object) {
    return userSchema.safeParse(object)
}

export function validatePartialUser(object) {
    return userSchema.partial().safeParse(object)
}