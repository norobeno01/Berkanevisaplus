import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'admin@visaplus.com'
  const password = 'adminpassword123'
  
  const existingAdmin = await prisma.user.findUnique({ where: { email } })
  if (existingAdmin) {
    console.log('Admin already exists! Email:', email)
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const admin = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name: 'Super Admin',
      role: 'ADMIN',
      phone: '+212 600 000 000'
    }
  })

  console.log('Admin created successfully!')
  console.log('Email:', admin.email)
  console.log('Password:', password)
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
