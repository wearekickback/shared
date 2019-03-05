import { ValidationError } from './errors'

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
    throw new ValidationError(`Invalid twitter id: ${str}`, [
      'Must be between 2 and 16 characters',
      'Must only contain letters, numbers and underscores',
      'Must not be a URL, e.g. if the URL is twitter.com/myId then use "myId"',
    ])
  }
}

export const sanitizeTwitterId = str => {
  if (typeof str !== 'string') {
    return ''
  }

  if (str.charAt(0) === '@') {
    return str.substr(1)
  }

  return str
}
