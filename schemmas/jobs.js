import * as z from "zod";

//ZOD se utiliza en lugar de algo como typescript porque zod se ejecuta en runtime, mientras que typescript se ejecuta en tiempo de compilación. Esto significa que zod puede validar los datos en tiempo de ejecución, lo que es útil para validar datos de entrada de usuarios o datos provenientes de fuentes externas. Por otro lado, typescript solo puede verificar los tipos durante el desarrollo y no puede garantizar la validez de los datos en tiempo de ejecución.
const jobSchema = z.object({
    titulo: z.string({required_error: "El título es requerido"}).min(3, "El título debe tener al menos 3 caracteres").max(100, "El título no puede tener más de 100 caracteres"),
    empresa: z.string(),
    ubicacion: z.string(),
    descripcion: z.string().optional(),
    data: z.object({
        technology: z.array(z.enum("react", "node", "vue", "angular", "python", "java", "c#", "php", "ruby", "go", "rust", "typescript", "javascript","kotlin", "swift", "dart", "scala", "elixir", "clojure", "haskell", "perl", "lua", "r", "matlab", "groovy", "objective-c", "f#", "c++", "c"), {required_error: "La tecnología es requerida"}).nonempty("Debe seleccionar al menos una tecnología"),
        modalidad: z.string(),
        nivel: z.string()
    }),
 })

 export function validateJob(input) {
    return jobSchema.safeParse(input);
 }

 export function validateJobPartial(input) {
    return jobSchema.partial().safeParse(input);
 }