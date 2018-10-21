import {
  isEthereumAddress,
  assertEthereumAddress,
  addressesMatch,
  isInAddressList,
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
