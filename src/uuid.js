import { isUUID as checkIsUUID } from 'validator'

import { ValidationError } from './errors'

export const isUUID = str => {
  if (typeof str !== 'string') {
    return false
  }

  return checkIsUUID(str)
}

export const assertUUID = str => {
  if (!isUUID(str)) {
    throw new ValidationError(`Invalid UUID: ${str}`)
  }
}
