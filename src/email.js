import { isEmail } from 'validator'

import { ValidationError } from './errors'

export const isEmailAddress = str => {
  if (typeof str !== 'string') {
    return false
  }

  return isEmail(str)
}

export const assertEmailAddress = str => {
  if (!isEmailAddress(str)) {
    throw new ValidationError(`Invalid email: ${str}`)
  }
}
