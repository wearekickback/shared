import {
  ValidationError,
  isTwitterId,
  assertTwitterId,
  sanitizeTwitterId,
} from './'

describe('twitter id', () => {
  it('checks and assertions', () => {
    const tests = [
      [ 1024, false ],
      [ '', false ],
      [ 'str str', false ],
      [ 'str.23', false ],
      [ 'a-str', false ],
      [ '2234234', true ],
      [ ' 2234234  ', false ],
      [ '23adsc', true ],
      [ '23adsc_2234', true ],
      [ '_23adsc_22', true ],
      [ '99234_', true ],
      [ '你好', false ],
      [ '1', false ],
      [ '12', true ],
      [ '1234567890123456', true ],
      [ '12345678901234567', false ],
    ]

    const { numToPass, numToFail } = tests.reduce((m, [ i, exp ]) => {
      if (exp) {
        m.numToPass++
      } else {
        m.numToFail++
      }
      return m
    }, { numToPass: 0, numToFail: 0 })

    expect.assertions(numToPass * 2 + numToFail * 4)

    tests.forEach(([ input, expected ]) => {
      expect(isTwitterId(input)).toEqual(expected)

      if (expected) {
        expect(() => assertTwitterId(input)).not.toThrow()
      } else {
        expect(() => assertTwitterId(input)).toThrow()
        try {
          assertTwitterId(input)
        } catch (err) {
          expect(err instanceof ValidationError).toBeTruthy()
          expect(err.rules).toEqual([
            'Must be between 2 and 16 characters',
            'Must only contain letters, numbers and underscores',
            'Must not be a URL, e.g. if the URL is twitter.com/myId then use "myId"',
          ])
        }
      }
    })
  })

  it('sanitization', () => {
    expect(sanitizeTwitterId()).toEqual('')
    expect(sanitizeTwitterId(123)).toEqual('')
    expect(sanitizeTwitterId(null)).toEqual('')
    expect(sanitizeTwitterId(true)).toEqual('')
    expect(sanitizeTwitterId('')).toEqual('')
    expect(sanitizeTwitterId('dracula')).toEqual('dracula')
    expect(sanitizeTwitterId('@dracula')).toEqual('dracula')
    expect(sanitizeTwitterId('@@dracula')).toEqual('@dracula')
  })
})
