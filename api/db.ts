import { PrismaClient } from '@prisma/client'
import { PrismaD1 } from '@prisma/adapter-d1'

// Global cache to avoid reconnecting multiple times on edge
let prisma: PrismaClient | null = null

export const getPrisma = (db: any) => {
  if (!db) {
    throw new Error('Database binding "DB" is missing')
  }
  // A new client per request: a client cached across requests shares I/O between concurrent requests,
  // which makes the Workers runtime cancel them ("code had hung") under concurrent load.
  return new PrismaClient({ adapter: new PrismaD1(db) })
}
