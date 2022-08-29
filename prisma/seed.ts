import doctors = require('./seeds/doctors.json');
import clients = require('./seeds/clients.json');
import jobTypes = require('./seeds/jobTypes.json');
import jobs = require('./seeds/jobs.json');
import payments = require('./seeds/payments.json');
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createDoctors() {
  await prisma.doctor.create({
    data: {
      id: 'a242decb-e589-4ecb-be7d-b7ff6f20ade5',
      name: 'Ana',
      lastName: 'Martins',
      role: 'ADMIN',
    },
  });

  await prisma.doctor.createMany({
    data: doctors,
    skipDuplicates: true,
  });
}

async function createGroup() {
  await prisma.group.create({
    data: {
      id: '10faad0e-2714-11ed-a261-0242ac120002',
      adminId: 'a242decb-e589-4ecb-be7d-b7ff6f20ade5',
      name: 'Clínica Sorriso',
    },
  });
}

async function createGroupInvites() {
  await prisma.groupInvite.create({
    data: {
      doctorId: 'af7c1fe6-d669-414e-b066-e9733f0de7a8',
      groupId: '10faad0e-2714-11ed-a261-0242ac120002',
    },
  });
}

async function createClients() {
  await prisma.client.createMany({
    data: clients,
    skipDuplicates: true,
  });
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
  await createDoctors();
  await createGroup();
  await createGroupInvites();
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
