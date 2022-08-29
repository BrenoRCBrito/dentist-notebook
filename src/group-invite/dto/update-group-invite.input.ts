import { CreateGroupInviteInput } from './create-group-invite.input';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateGroupInviteInput extends PartialType(CreateGroupInviteInput) {
  id: number;
}
