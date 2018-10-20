import {
  isUsername,
  assertUsername,
} from './'

describe('username', () => {
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
      expect(isUsername(input)).toEqual(expected)

      if (expected) {
        expect(() => assertUsername(input)).not.toThrow()
      } else {
        expect(() => assertUsername(input)).toThrow()
      }
    })
  })
})
