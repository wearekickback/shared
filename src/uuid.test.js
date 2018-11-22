import {
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

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(isUUID(input)).toEqual(expected)

      if (expected) {
        expect(() => assertUUID(input)).not.toThrow()
      } else {
        expect(() => assertUUID(input)).toThrow()
      }
    })
  })
})
