import { PrismaClient } from "@prisma/client"

const prisma = globalThis.prismaClient || new PrismaClient()
if (import.meta.env.DEV) globalThis.prismaClient = prisma

export default prisma
