import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import {
  client1,
  client2,
  createClient1Input,
  updateClient2Input,
  updatedClient2,
} from '../../mock/clients';
import { PrismaService } from '../../prisma/prisma.service';
import { ClientService } from './client.service';

const results = {
  create: client1,
  findMany: [client1, client2],
  update: updatedClient2,
  findUnique: client2,
  delete: client2,
};

describe('ClientService', () => {
  let service: ClientService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should return the created client', async () => {
      prismaService.client.create = jest.fn().mockResolvedValue(results.create);
      expect(await service.create({ data: createClient1Input })).toStrictEqual(
        results.create,
      );
      expect(prismaService.client.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return an array of clients', async () => {
      prismaService.client.findMany = jest
        .fn()
        .mockResolvedValue(results.findMany);
      expect(await service.findAll()).toStrictEqual(results.findMany);
      expect(prismaService.client.findMany).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a client with the provided id', async () => {
      prismaService.client.findUnique = jest
        .fn()
        .mockResolvedValue(results.findUnique);
      expect(await service.findOne({ where: { id: 2 } })).toStrictEqual(
        results.findUnique,
      );
      expect(prismaService.client.findUnique).toHaveBeenCalledTimes(1);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      expect(await service.findOne({ where: { id: null } })).toStrictEqual(
        null,
      );
    });
  });

  describe('update', () => {
    it('should return a client with the provided id and altered data', async () => {
      prismaService.client.update = jest.fn().mockResolvedValue(results.update);
      expect(
        await service.update({
          where: { id: updateClient2Input.id },
          data: updateClient2Input,
        }),
      ).toStrictEqual(results.update);
      expect(prismaService.client.update).toHaveBeenCalledTimes(1);
    });
  });

  describe('remove', () => {
    it('should return the deleted client with the provided id', async () => {
      prismaService.client.delete = jest.fn().mockResolvedValue(results.delete);
      expect(await service.remove({ where: { id: 2 } })).toStrictEqual(
        results.delete,
      );
      expect(prismaService.client.delete).toHaveBeenCalledTimes(1);
    });
  });
});
