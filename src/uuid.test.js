import {
  ValidationError,
  isUUID,
  assertUUID,
} from './'



describe('uuid', () => {
  it('checks and assertions', () => {
    const tests = [
      [ 1024, false ],
      [ '', false ],
      [ 'str', false ],
      [ 'a21c09cc-f1db-4086-9bd7-e568e23fe160', true ],
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
      expect(isUUID(input)).toEqual(expected)

      if (expected) {
        expect(() => assertUUID(input)).not.toThrow()
      } else {
        expect(() => assertUUID(input)).toThrow()
        try {
          assertUUID(input)
        } catch (err) {
          expect(err instanceof ValidationError).toBeTruthy()
          expect(err.rules).toEqual([])
        }
      }
    })
  })
})
