import {
  ROLE,
  userHasRole,
  extractUsersWithGivenEventRole,
} from './'

describe('role', () => {
  it('is exported', () => {
    expect(ROLE).toEqual({
      SUPER_ADMIN: 'SUPER_ADMIN',
      EVENT_ADMIN: 'EVENT_ADMIN',
    })
  })
})

describe('userHasRole', () => {
  it('works', () => {
    expect(userHasRole({ roles: [] }, 'test')).toEqual(false)
    expect(userHasRole({ roles: [ 'test' ] }, 'test')).toEqual(true)
    expect(userHasRole({ roles: [ 'test0', 'test' ] }, 'test')).toEqual(true)
    expect(userHasRole({}, 'test')).toEqual(false)
  })
})

describe('extractUsersWithGivenEventRole', () => {
  it('works', () => {
    const event = {
      roles: [
        {
          role: ROLE.SUPER_ADMIN,
          user: 1,
        },
        {
          role: 'test',
          user: 2,
        },
        {
          role: ROLE.EVENT_ADMIN,
          user: 3,
        },
        {
          role: ROLE.SUPER_ADMIN,
          user: 4,
        },
      ]
    }

    expect(extractUsersWithGivenEventRole(event, 'unknown')).toEqual([])
    expect(extractUsersWithGivenEventRole(event, 'test')).toEqual([ 2 ])
    expect(extractUsersWithGivenEventRole(event, ROLE.SUPER_ADMIN)).toEqual([ 1, 4 ])
    expect(extractUsersWithGivenEventRole(event, ROLE.EVENT_ADMIN)).toEqual([ 3 ])
  })
})
