export const stringsMatchIgnoreCase = (a1, a2) => (typeof a1 === 'string') && (typeof a2 === 'string') && a1.toLowerCase() === a2.toLowerCase()

export const pluralize = (str, value) => (1 === value ? str : `${str}s`)

export const trimOrEmpty = str => (typeof str === 'string' ? str.trim() : '')

export const trimOrEmptyStringProps = stringProps => (
  Object.keys(stringProps).reduce((m, k) => {
    m[k] = trimOrEmpty(stringProps[k])
    return m
  }, {})
)
