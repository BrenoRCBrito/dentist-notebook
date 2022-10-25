import { createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { DoctorService } from '../doctor/doctor.service';
import { GroupService } from '../group/group.service';
import { doctor2 } from '../../mock/doctor';
import { group1 } from '../../mock/group';
import {
  createGroupInvite1Input,
  groupInvite1,
  groupInvite2,
  updatedGroupInvite2,
} from '../../mock/group-invite';
import { GroupInviteResolver } from './group-invite.resolver';
import { GroupInviteService } from './group-invite.service';

const results = {
  create: groupInvite1,
  findAll: [groupInvite1, groupInvite2],
  findOne: groupInvite2,
  update: updatedGroupInvite2,
  remove: groupInvite2,
  group: group1,
  doctor: doctor2,
};

describe('GroupInviteResolver', () => {
  let resolver: GroupInviteResolver;
  let service: GroupInviteService;
  let groupService: GroupService;
  let doctorService: DoctorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupInviteResolver],
    })
      .useMocker(createMock)
      .compile();

    resolver = module.get<GroupInviteResolver>(GroupInviteResolver);
    service = module.get<GroupInviteService>(GroupInviteService);
    groupService = module.get<GroupService>(GroupService);
    doctorService = module.get<DoctorService>(DoctorService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createGroupInvite', () => {
    it('should return the created groupInvite', async () => {
      service.create = jest.fn().mockResolvedValue(results.create);
      expect(
        await resolver.createGroupInvite(createGroupInvite1Input),
      ).toStrictEqual(results.create);
    });
  });

  describe('findAll', () => {
    it('should return an array of groupInvites', async () => {
      service.findAll = jest.fn().mockResolvedValue(results.findAll);
      expect(await resolver.findAll()).toStrictEqual(results.findAll);
    });
  });

  describe('findOne', () => {
    it('should return a groupInvite with the provided id', async () => {
      service.findOne = jest.fn().mockResolvedValue(results.findOne);
      expect(await resolver.findOne(2)).toStrictEqual(results.findOne);
    });

    it('if there is no true key in args.where object, it should return null', async () => {
      service.findOne = jest.fn().mockResolvedValue(null);
      expect(await resolver.findOne(null)).toStrictEqual(null);
    });
  });

  describe('updateGroupInvite', () => {
    it('should return a groupInvite with the provided id and altered data', async () => {
      service.update = jest.fn().mockResolvedValueOnce(results.update);
      expect(
        await resolver.updateGroupInvite(updatedGroupInvite2),
      ).toStrictEqual(results.update);
    });
  });

  describe('removeGroupInvite', () => {
    it('should return the deleted groupInvite with the provided id', async () => {
      service.remove = jest.fn().mockResolvedValue(results.remove);
      expect(await resolver.removeGroupInvite(2)).toStrictEqual(results.remove);
    });
  });

  describe('group', () => {
    it('should return the group related to the invite', async () => {
      groupService.findAll = jest.fn().mockResolvedValue(results.group);
      expect(await resolver.group(groupInvite1)).toStrictEqual(results.group);
    });
  });

  describe('doctor', () => {
    it('should return the doctor who invite was sent', async () => {
      doctorService.findOne = jest.fn().mockResolvedValue(results.doctor);
      expect(await resolver.doctor(groupInvite1)).toStrictEqual(results.doctor);
    });
  });
});
