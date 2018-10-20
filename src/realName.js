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
