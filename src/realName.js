import { ValidationError } from './errors'

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
    throw new ValidationError(`Invalid real name: ${str}`, [
      'Must be between 2 and 48 characters',
      'Must NOT contain numbers or underscores',
    ])
  }
}
