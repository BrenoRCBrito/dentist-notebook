import doctors = require('./seeds/doctors.json');
import clients = require('./seeds/clients.json');
import jobTypes = require('./seeds/jobTypes.json');
import jobs = require('./seeds/jobs.json');
import payments = require('./seeds/payments.json');
import paymentMethods = require('./seeds/paymentMethods.json');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createGroup() {
  await prisma.doctor.create({
    data: {
      name: 'Ana',
      lastName: 'Martins',
      email: 'anamartins@algo.com',
      password: 'anamartins',
    },
  });

  await prisma.group.create({
    data: {
      adminId: 1,
      name: 'Clínica Sorriso',
    },
  });

  await prisma.doctor.update({
    where: { id: 1 },
    data: {
      groups: { connect: { id: 1 } },
      managedGroups: { connect: { id: 1 } },
    },
  });
}

async function createDoctors() {
  for (const doctor of doctors) {
    await prisma.doctor.create({
      data: doctor,
    });
  }
}

async function createGroupInvites() {
  await prisma.groupInvite.create({
    data: {
      doctorId: 2,
      groupId: 1,
      message: 'Convite',
    },
  });
}

async function createPaymentMethods() {
  await prisma.paymentMethod.createMany({
    data: paymentMethods,
    skipDuplicates: true,
  });
}

async function createClients() {
  for (const client of clients) {
    await prisma.client.create({ data: client });
  }
}

async function createJobTypes() {
  await prisma.jobType.createMany({
    data: jobTypes,
    skipDuplicates: true,
  });
}

async function createJob() {
  await prisma.job.createMany({
    data: jobs,
    skipDuplicates: true,
  });
}

async function createPayments() {
  await prisma.payment.createMany({
    data: payments,
    skipDuplicates: true,
  });
}

async function main() {
  await createGroup();
  await createDoctors();
  await createGroupInvites();
  await createPaymentMethods();
  await createClients();
  await createJobTypes();
  await createJob();
  await createPayments();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
