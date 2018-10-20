import { toBN } from 'web3-utils'

import { PARTICIPANT_STATUS } from './status'

export const getSocialId = (user = {}, socialType) => {
  const { value } =
    (user.social || []).find(({ type }) => type === socialType) || {}
  return value
}

export const calculateNumAttended = participants => participants.reduce((m, v) => {
  const attended =
    (v.status === PARTICIPANT_STATUS.SHOWED_UP || v.status === PARTICIPANT_STATUS.WITHDRAWN_PAYOUT)
  return m + (attended ? 1 : 0)
}, 0)

export const calculateFinalizeMaps = participants => {
  // sort participants array
  participants.sort((a, b) => (a.index < b.index ? -1 : 1))

  const maps = []
  let currentMap = toBN(0)
  for (let i = 0; participants.length > i; i += 1) {
    if (i && 0 === i % 256) {
      maps.push(currentMap)
      currentMap = toBN(0)
    }

    if (participants[i].status === PARTICIPANT_STATUS.SHOWED_UP) {
      currentMap = currentMap.bincn(i)
    }
  }
  maps.push(currentMap)

  return maps.map(m => m.toString(10))
}

export const updateParticipantListFromMaps = (participants, maps) => {
  // sort
  participants.sort(({ index: indexA }, { index: indexB }) => (
    (parseInt(indexA, 10) < parseInt(indexB, 10)) ? -1 : 1
  ))

  // check maps length
  const totalBits = maps.length * 256
  const numMapsCorrect = totalBits >= participants.length && totalBits - participants.length < 256
  if (!numMapsCorrect) {
    this._log.warn(`Invalid no. of maps provided for updating participant list`)

    return
  }

  const mapBNs = maps.map(m => toBN(m))
  const zeroBN = toBN(0)
  participants.forEach((a, index) => {
    const mapIndex = parseInt(Math.floor(index / 256), 10)
    const bitIndex = index % 256

    const result = mapBNs[mapIndex].and(toBN(0).bincn(bitIndex))

    a.status = result.gt(zeroBN) ? PARTICIPANT_STATUS.SHOWED_UP : PARTICIPANT_STATUS.REGISTERED
  })
}
