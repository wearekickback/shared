import { toBN } from 'web3-utils'

import {
  calculateNumAttended,
  calculateFinalizeMaps,
  updateParticipantListFromMaps,
  isParticipant,
  PARTICIPANT_STATUS,
} from './'

describe('participant status', () => {
  it('is exported', () => {
    expect(PARTICIPANT_STATUS).toEqual({
      UNKNOWN: 'UNKNOWN',
      REGISTERED: 'REGISTERED',
      SHOWED_UP: 'SHOWED_UP',
      WITHDRAWN_PAYOUT: 'WITHDRAWN_PAYOUT',
      REFUND_READY: 'REFUND_READY',
      WITHDRAWN_REFUND: 'WITHDRAWN_REFUND',
    })
  })
})

describe('check if participant', () => {
  it('in list', () => {
    const ps = [
      {},
      { user: null },
      { user: { address: '0x123' } },
      { user: { address: '0xABdef1' } },
    ]
    expect(isParticipant(ps, undefined)).toEqual(undefined)
    expect(isParticipant(ps, null)).toEqual(null)
    expect(isParticipant(ps, '0x456')).toEqual(false)
    expect(isParticipant(ps, '0x123')).toEqual(true)
    expect(isParticipant(ps, '0xabdef1')).toEqual(true)
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
        index: i + 1,
        status: PARTICIPANT_STATUS.REGISTERED
      })
    }

    // randomize sort
    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))
  })

  it('no one showed up', () => {
    expect(calculateFinalizeMaps(ps)).toEqual([ '0', '0' ])
  })

  it('unexpected bad status value - withdrawn payout', () => {
    ps[1].status = PARTICIPANT_STATUS.WITHDRAWN_PAYOUT

    expect(() => calculateFinalizeMaps(ps)).toThrow()
  })

  it('unexpected bad status value - unknown', () => {
    ps[1].status = PARTICIPANT_STATUS.UNKNOWN

    expect(() => calculateFinalizeMaps(ps)).toThrow()
  })

  it('unexpected bad status value - null', () => {
    ps[1].status = null

    expect(() => calculateFinalizeMaps(ps)).toThrow()
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
      toBN(0)
        .bincn(1 - 1)
        .bincn(2 - 1)
        .bincn(256 - 1).toString(10),
      toBN(0)
        .bincn(1 - 1)
        .bincn((298 % 256) - 1)
        .bincn((299 % 256) - 1).toString(10)
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
      toBN(0).bincn(256 - 1).toString(10),
      toBN(0).toString(10),
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
      toBN(0)
        .bincn(255 - 1).toString(10),
      toBN(0)
        .bincn((257 % 256) - 1)
        .bincn((299 % 256) - 1).toString(10)
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

  it('p5 is missing, override REGISTERED', () => {
    // We set #6 to SHOWED_UP and remove #5 from the list
    const maps = [
      toBN(0).bincn(6 - 1).toString(10),
      toBN(0).toString(10)
    ]

    ps.forEach(p => {
      switch (p.index) {
        case 6:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    ps.sort((a, b) => (a.index < b.index ? -1 : 1))
    ps.splice(5 - 1, 1)

    expect(calculateFinalizeMaps(ps, PARTICIPANT_STATUS.REGISTERED)).toEqual(maps)
  })

  it('p5 is missing, override SHOWED_UP', () => {
    // We set #6 to SHOWED_UP and remove #5 from the list
    const maps = [
      toBN(0).bincn(6 - 1).bincn(5 - 1).toString(10),
      toBN(0).toString(10)
    ]

    ps.forEach(p => {
      switch (p.index) {
        case 6:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    ps.sort((a, b) => (a.index < b.index ? -1 : 1))
    ps.splice(5 - 1, 1)

    expect(calculateFinalizeMaps(ps, PARTICIPANT_STATUS.SHOWED_UP)).toEqual(maps)
  })

  it('p5 is missing, override default value', () => {
    ps.forEach(p => {
      switch (p.index) {
        case 6:
          p.status = PARTICIPANT_STATUS.SHOWED_UP
          break
        default:
          break
      }
    })

    ps.sort((a, b) => (a.index < b.index ? -1 : 1))
    ps.splice(5 - 1, 1)

    expect(() => calculateFinalizeMaps(ps)).toThrow()
  })

  it('override invalid value', () => {
    expect(() => calculateFinalizeMaps(ps, 123)).toThrow()
  })
})


describe('.updateParticipantListFromMaps', () => {
  let ps

  beforeEach(() => {
    ps = []

    for (let i = 0; 300 > i; i += 1) {
      ps.push({
        index: i + 1,
        status: PARTICIPANT_STATUS.UNKNOWN
      })
    }

    // randomize sort
    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))
  })

  it('throws if too few maps', () => {
    expect(() => updateParticipantListFromMaps(ps, [ 0 ])).toThrow()
  })

  it('throws if too many maps', () => {
    expect(() => updateParticipantListFromMaps(ps, [ 0, 0, 0 ])).toThrow()
  })

  it('handles none attended', () => {
    expect.assertions(300)

    updateParticipantListFromMaps(ps, [ 0, 0 ])

    ps.forEach(({ status }) => {
      expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
    })
  })

  it('handles all attended', () => {
    expect.assertions(300)

    let n1 = toBN(0)
    for (let i = 0; i < 256; i += 1) {
      n1 = n1.bincn(i)
    }

    let n2 = toBN(0)
    for (let i = 0; i < (300 - 256); i += 1) {
      n2 = n2.bincn(i)
    }

    updateParticipantListFromMaps(ps, [ n1.toString(10), n2.toString(10) ])

    ps.forEach(({ status }) => {
      expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
    })
  })

  it('handles p1, p2, p256, p257, p298, p299 attended', () => {
    expect.assertions(300)

    const maps = [
      toBN(0).bincn(1 - 1)
        .bincn(2 - 1)
        .bincn(256 - 1).toString(10),
      toBN(0).bincn(1 - 1).bincn((298 % 256) - 1)
        .bincn((299 % 256) - 1)
        .toString(10)
    ]

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ index, status }) => {
      switch (index) {
        case 1:
        case 2:
        case 256:
        case 257:
        case 298:
        case 299:
          expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
          break
        default:
          expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
          break
      }
    })
  })

  it('handles p257 attended', () => {
    expect.assertions(300)

    const maps = [
      toBN(0).toString(10),
      toBN(0).bincn(0).toString(10)
    ]

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ index, status }) => {
      switch (index) {
        case 257:
          expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
          break
        default:
          expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
          break
      }
    })
  })

  it('handles p255, p257, p299 attended', () => {
    expect.assertions(300)

    const maps = [
      toBN(0)
        .bincn(255 - 1).toString(10),
      toBN(0)
        .bincn(1 - 1)
        .bincn((299 % 256) - 1).toString(10)
    ]

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ index, status }) => {
      switch (index) {
        case 255:
        case 257:
        case 299:
          expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
          break
        default:
          expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
          break
      }
    })
  })
})

describe('list -> map -> list', () => {
  let ps

  beforeEach(() => {
    ps = []

    for (let i = 0; 300 > i; i += 1) {
      ps.push({
        index: i + 1,
        status: PARTICIPANT_STATUS.REGISTERED
      })
    }

    // randomize sort
    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))
  })

  it('works for p1, p2, p256, p257, p298, p299 showed up', () => {
    expect.assertions(300)

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

    const maps = calculateFinalizeMaps(ps)

    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.UNKNOWN
    })

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ index, status }) => {
      switch (index) {
        case 1:
        case 2:
        case 256:
        case 257:
        case 298:
        case 299:
          expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
          break
        default:
          expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
          break
      }
    })
  })

  it('works for p255, p257, p299 showed up', () => {
    expect.assertions(300)

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

    const maps = calculateFinalizeMaps(ps)

    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.UNKNOWN
    })

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ index, status }) => {
      switch (index) {
        case 255:
        case 257:
        case 299:
          expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
          break
        default:
          expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
          break
      }
    })
  })

  it('works for none showed up', () => {
    expect.assertions(300)

    const maps = calculateFinalizeMaps(ps)

    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.UNKNOWN
    })

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ status }) => {
      expect(status).toEqual(PARTICIPANT_STATUS.REGISTERED)
    })
  })

  it('works for all showed up', () => {
    expect.assertions(300)

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.SHOWED_UP
    })

    const maps = calculateFinalizeMaps(ps)

    ps.sort(() => (Math.random() < 0.5 ? -1 : 1))

    ps.forEach(p => {
      p.status = PARTICIPANT_STATUS.UNKNOWN
    })

    updateParticipantListFromMaps(ps, maps)

    ps.forEach(({ status }) => {
      expect(status).toEqual(PARTICIPANT_STATUS.SHOWED_UP)
    })
  })
})
