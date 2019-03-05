import {
  ValidationError,
  isEthereumAddress,
  assertEthereumAddress,
  addressesMatch,
  isInAddressList,
} from './'

describe('address', () => {
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
      expect(isEthereumAddress(input)).toEqual(expected)

      if (expected) {
        expect(() => assertEthereumAddress(input)).not.toThrow()
      } else {
        expect(() => assertEthereumAddress(input)).toThrow()
        try {
          assertEthereumAddress(input)
        } catch (err) {
          expect(err instanceof ValidationError).toBeTruthy()
          expect(err.rules).toEqual([])
        }
      }
    })
  })
})

describe('address match', () => {
  it('works', () => {
    expect(addressesMatch('0x', '0x1')).toEqual(false)
    expect(addressesMatch('0xabcdef00', '0xabcdef00')).toEqual(true)
    expect(addressesMatch('0xabcdef00', '0xabcdef00')).toEqual(true)
    expect(addressesMatch('0xabcDEf001', '0xABcdeF00')).toEqual(false)
  })
})

describe('address list search', () => {
  it('by needle', () => {
    const addresses = [
      '0xabcdef00',
      '0xabcDEf001',
      '0x2323234',
    ]

    expect(isInAddressList(addresses, '0xab')).toEqual(false)
    expect(isInAddressList(addresses, '0xabcdef001')).toEqual(true)
  })
})
