import {
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

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(isTwitterId(input)).toEqual(expected)

      if (expected) {
        expect(() => assertTwitterId(input)).not.toThrow()
      } else {
        expect(() => assertTwitterId(input)).toThrow()
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
