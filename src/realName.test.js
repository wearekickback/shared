import {
  ValidationError,
  isRealName,
  assertRealName,
} from './'

describe('real name', () => {
  it('checks and assertions', () => {
    const tests = [
      [ 1024, false ],
      [ '', false ],
      [ 'str str', true ],
      [ 'str.23', false ],
      [ 'a-str', true ],
      [ '2234234', false ],
      [ ' str  ', true ],
      [ '23adsc', false ],
      [ '23adsc_2234', false ],
      [ 'asd _sdf', false ],
      [ 'sdf sdf', true ],
      [ ' sdf sdf  ', true ],
      [ '你好', true ],
      [ 'a', false ],
      [ 'ab', true ],
      [ 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefgh', true ],
      [ 'abcdefghijabcdefghijabcdefghijabcdefghijabcdefghi', false ],
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
      expect(isRealName(input)).toEqual(expected)

      if (expected) {
        expect(() => assertRealName(input)).not.toThrow()
      } else {
        expect(() => assertRealName(input)).toThrow()
        try {
          assertRealName(input)
        } catch (err) {
          expect(err instanceof ValidationError).toBeTruthy()
          expect(err.rules).toEqual([
            'Must be between 2 and 48 characters',
            'Must NOT contain numbers or underscores',
          ])
        }
      }
    })
  })
})
