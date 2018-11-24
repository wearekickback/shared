import {
  ROLE
} from './'

describe('role', () => {
  it('is exported', () => {
    expect(ROLE).toEqual({
      SUPER_ADMIN: 'SUPER_ADMIN',
      EVENT_ADMIN: 'EVENT_ADMIN',
    })
  })
})
