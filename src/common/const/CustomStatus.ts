import { registerEnumType } from '@nestjs/graphql'

export enum CustomStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BLOCKED = 'blocked',
  PENDING = 'pending',
}

registerEnumType(CustomStatus, {
  name: 'CustomStatus',
  description: 'Custom status for entities',
})
