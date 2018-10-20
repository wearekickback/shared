import {
  PARTICIPANT_STATUS,
} from './'

describe('participant status', () => {
  it('is exported', () => {
    expect(PARTICIPANT_STATUS).toEqual({
      UNKNOWN: 'UNKNOWN',
      REGISTERED: 'REGISTERED',
      SHOWED_UP: 'SHOWED_UP',
      WITHDRAWN_PAYOUT: 'WITHDRAWN_PAYOUT',
    })
  })
})
