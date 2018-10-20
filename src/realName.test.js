import {
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

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(isRealName(input)).toEqual(expected)

      if (expected) {
        expect(() => assertRealName(input)).not.toThrow()
      } else {
        expect(() => assertRealName(input)).toThrow()
      }
    })
  })
})
