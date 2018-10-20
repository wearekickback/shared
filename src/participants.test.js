import { toBN } from 'web3-utils'

import {
  calculateNumAttended,
  calculateFinalizeMaps,
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

describe('.calculateNumAttended', () => {
  it('calculates correctly', () => {
    expect(calculateNumAttended([])).toEqual(0)

    expect(calculateNumAttended([
      {
        status: PARTICIPANT_STATUS.UNKNOWN
      }
    ])).toEqual(0)

    expect(calculateNumAttended([
      {
        status: PARTICIPANT_STATUS.REGISTERED
      }
    ])).toEqual(0)

    expect(calculateNumAttended([
      {
        status: PARTICIPANT_STATUS.SHOWED_UP
      }
    ])).toEqual(1)

    expect(calculateNumAttended([
      {
        status: PARTICIPANT_STATUS.WITHDRAWN_PAYOUT
      }
    ])).toEqual(1)

    expect(calculateNumAttended([
      {
        status: PARTICIPANT_STATUS.SHOWED_UP
      },
      {
        status: PARTICIPANT_STATUS.REGISTERED
      },
      {
        status: PARTICIPANT_STATUS.WITHDRAWN_PAYOUT
      },
      {
        status: PARTICIPANT_STATUS.UNKNOWN
      },
      {
        status: PARTICIPANT_STATUS.WITHDRAWN_PAYOUT
      },
    ])).toEqual(3)
  })
})


describe('.calculateFinalizeMaps', () => {
  let ps

  beforeEach(() => {
    ps = []

    for (let i = 0; 300 > i; i += 1) {
      ps.push({
        index: i,
        status: PARTICIPANT_STATUS.REGISTERED
      })
    }

    // randomize sort
    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))
  })

  it('no one showed up', () => {
    expect(calculateFinalizeMaps(ps)).toEqual([ '0', '0' ])
  })

  it('everyone showed up', () => {
    let n1 = toBN(0)
    for (let i = 0; i < 256; i += 1) {
      n1 = n1.bincn(i)
    }

    let n2 = toBN(0)
    for (let i = 0; i < (300 - 256); i += 1) {
      n2 = n2.bincn(i)
    }

    const maps = [ n1.toString(10), n2.toString(10) ]

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.SHOWED_UP
    })

    expect(calculateFinalizeMaps(ps)).toEqual(maps)
  })

  it('p1, p2, p256, p257, p298, p299 showed up', () => {
    const maps = [
      toBN(0).bincn(1).bincn(2).toString(10),
      toBN(0).bincn(0).bincn(1).bincn(298 % 256)
        .bincn(299 % 256)
        .toString(10),
    ]

    ps.forEach(p => {
      switch (p.index) {
        case 1:
        case 2:
        case 256:
        case 257:
        case 298:
        case 299:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    expect(calculateFinalizeMaps(ps)).toEqual(maps)
  })

  it('p256 showed up', () => {
    const maps = [
      toBN(0).toString(10),
      toBN(0).bincn(0).toString(10),
    ]

    ps.forEach(p => {
      switch (p.index) {
        case 256:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    expect(calculateFinalizeMaps(ps)).toEqual(maps)
  })

  it('p255, p257, p299 showed up', () => {
    const maps = [
      toBN(0).bincn(255).toString(10),
      toBN(0).bincn(1).bincn(299 % 256).toString(10),
    ]

    ps.forEach(p => {
      switch (p.index) {
        case 255:
        case 257:
        case 299:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    expect(calculateFinalizeMaps(ps)).toEqual(maps)
  })
})
