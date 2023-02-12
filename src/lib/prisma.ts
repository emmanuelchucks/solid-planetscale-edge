import { PrismaClient } from "@prisma/client"

const prisma = globalThis.prisma || new PrismaClient()
if (import.meta.env.DEV) globalThis.prisma = prisma

export default prisma
