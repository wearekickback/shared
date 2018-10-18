import { isEmail } from 'validator'
import { isAddress } from 'web3-utils'
import safeGet from 'lodash.get'

export const isEmailAddress = str => {
  if (typeof str !== 'string') {
    return false
  }

  return isEmail(str)
}

export const assertEmailAddress = str => {
  if (!isEmail(str)) {
    throw new Error(`Invalid email: ${str}`)
  }
}

export const isEthereumAddress = str => isAddress(str)


export const assertEthereumAddress = str => {
  if (!isEthereumAddress(str)) {
    throw new Error(`Invalid Ethereum address: ${str}`)
  }
}


export const isUsername = str => {
  if (typeof str !== 'string') {
    return false
  }

  if (!str) {
    return false
  }

  if (!(/^[A-Za-z0-9_]{2,16}$/.test(str))) {
    return false
  }

  return true
}

export const assertUsername = str => {
  if (!isUsername(str)) {
    throw new Error(`Invalid username: ${str}. Must be between 2 and 16 characters and only contains letters, numbers and underscores.`)
  }
}

export const isTwitterId = str => {
  if (typeof str !== 'string') {
    return false
  }

  if (!str) {
    return false
  }

  if (!(/^[A-Za-z0-9_]{2,16}$/.test(str))) {
    return false
  }

  return true
}

export const assertTwitterId = str => {
  if (!isTwitterId(str)) {
    throw new Error(`Invalid twitter id: ${str}. Must be between 2 and 16 characters and only contain letters, numbers and underscores.`)
  }
}

export const isRealName = str => {
  if (typeof str !== 'string') {
    return false
  }

  if (!str) {
    return false
  }

  if (!(/^[^0-9_]{2,48}$/.test(str))) {
    return false
  }

  return true
}

export const assertRealName = str => {
  if (!isRealName(str)) {
    throw new Error(`Invalid real name: ${str}. Must be between 2 and 48 characters and not contain numbers or underscores.`)
  }
}

export const hasAcceptedLegalAgreements = (legal = []) => {
  const terms = legal.find(l => l.type === 'TERMS_AND_CONDITIONS')
  const privacy = legal.find(p => p.type === 'PRIVACY_POLICY')

  return !!(safeGet(terms, 'accepted') && safeGet(privacy, 'accepted'))
}

export const assertHasAcceptedLegalAgreements = legal => {
  if (!hasAcceptedLegalAgreements(legal)) {
    throw new Error(`Legal agreements must be accepted (terms, privacy)`)
  }
}

export const stringsMatchIgnoreCase = (a1, a2) => (typeof a1 === 'string') && (typeof a2 === 'string') && a1.toLowerCase() === a2.toLowerCase()

export const addressesMatch = stringsMatchIgnoreCase
