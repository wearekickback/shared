import { isEmail } from 'validator'

export const isEmailAddress = str => {
  if (typeof str !== 'string') {
    return false
  }

  return isEmail(str)
}

export const assertEmailAddress = str => {
  if (!isEmailAddress(str)) {
    throw new Error(`Invalid email: ${str}`)
  }
}
