import { Module } from '@nestjs/common';
import { GroupInviteService } from './group-invite.service';
import { GroupInviteResolver } from './group-invite.resolver';
import { PrismaService } from '../../prisma/prisma.service';
import { GroupService } from '../group/group.service';
import { DoctorService } from '../doctor/doctor.service';

@Module({
  providers: [
    PrismaService,
    GroupInviteResolver,
    GroupInviteService,
    GroupService,
    DoctorService,
  ],
})
export class GroupInviteModule {}
