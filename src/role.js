import { addressesMatch } from './address'

export const ROLE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  EVENT_ADMIN: 'EVENT_ADMIN',
}

export const userHasRole = (user, role) => (user.roles || []).includes(role)

export const extractUsersWithGivenEventRole = (event, r) => (
  event.roles
    .filter(({ role }) => role === r)
    .map(({ user }) => user)
)

export const userHasEventRole = (addressOrId, event, r) => !!(
  event.roles.find(({ role, user }) => (
    role === r && (user.id === addressOrId || addressesMatch(user.address, addressOrId))
  ))
)
