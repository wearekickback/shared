import {
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

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(isEmailAddress(input)).toEqual(expected)

      if (expected) {
        expect(() => assertEmailAddress(input)).not.toThrow()
      } else {
        expect(() => assertEmailAddress(input)).toThrow()
      }
    })
  })
})
