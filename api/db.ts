import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

// Global cache to avoid reconnecting multiple times on edge
let prisma: PrismaClient | null = null

export const getPrisma = (db: any) => {
  if (!prisma) {
    const adapter = new PrismaD1(db)
    prisma = new PrismaClient({ adapter })
  }
  return prisma
}