import {
  isEthereumAddress,
  assertEthereumAddress,
} from './'

describe('real name', () => {
  it('checks and assertions', () => {
    const tests = [
      [ '', false ],
      [ '0x', false ],
      [ '0x0', false ],
      [ '0x123456789', false ],
      [ '0x123456789012345678901234567890123456789', false ],
      [ '0x1234567890123456789012345678901234567890', true ],
      [ '0x12345678901234567890123456789012345678901', false ],
      [ '0xffffffffffffffffffffffffffffffffffffffff', true ],
      [ '0x0000000000000000000000000000000000000000', true ],
    ]

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(isEthereumAddress(input)).toEqual(expected)

      if (expected) {
        expect(() => assertEthereumAddress(input)).not.toThrow()
      } else {
        expect(() => assertEthereumAddress(input)).toThrow()
      }
    })
  })
})
