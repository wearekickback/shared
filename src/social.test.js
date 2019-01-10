import { getSocialId } from './social'

describe('get social id', () => {
  it('works as expected', () => {
    const socials = [
      {
        type: 'twitter',
        value: 123,
      },
      {
        type: 'linkedin',
        value: 456,
      },
    ]

    expect(getSocialId(socials, 'twitter')).toEqual(123)
    expect(getSocialId([], 'twitter')).toEqual(undefined)
    expect(getSocialId(socials, 'linkedin')).toEqual(456)
    expect(getSocialId(socials, 'twitter2')).toEqual(undefined)
  })
})
