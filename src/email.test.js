import {
  ValidationError,
  isEmailAddress,
  assertEmailAddress,
} from './'



describe('email address', () => {
  it('checks and assertions', () => {
    const tests = [
      [ 1024, false ],
      [ '', false ],
      [ 'str', false ],
      [ 'str@', false ],
      [ 'str@sd', false ],
      [ 'str@sd.com', true ],
      [ '你好@哦好.com', true ],
    ]

    const { numToPass, numToFail } = tests.reduce((m, [ , exp ]) => {
      if (exp) {
        m.numToPass += 1
      } else {
        m.numToFail += 1
      }
      return m
    }, { numToPass: 0, numToFail: 0 })

    expect.assertions(numToPass * 2 + numToFail * 4)

    tests.forEach(([ input, expected ]) => {
      expect(isEmailAddress(input)).toEqual(expected)

      if (expected) {
        expect(() => assertEmailAddress(input)).not.toThrow()
      } else {
        expect(() => assertEmailAddress(input)).toThrow()
        try {
          assertEmailAddress(input)
        } catch (err) {
          expect(err instanceof ValidationError).toBeTruthy()
          expect(err.rules).toEqual([])
        }
      }
    })
  })
})
