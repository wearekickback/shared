import {
  hasAcceptedLegalAgreements,
  assertHasAcceptedLegalAgreements,
  LEGAL
} from './'

describe('legal', () => {
  it('is exported', () => {
    expect(LEGAL).toEqual({
      TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
      PRIVACY_POLICY: 'PRIVACY_POLICY',
      MARKETING_INFO: 'MARKETING_INFO',
    })
  })
})


describe('legal agreements', () => {
  it('checks and assertions', () => {
    const tests = [
      [ undefined, false ],
      [ [], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS' }, { type: 'PRIVACY_POLICY' }, { type: 'MARKETING' } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS', accepted: true } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS', accepted: true }, { type: 'PRIVACY_POLICY' } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS' }, { type: 'PRIVACY_POLICY' } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS' }, { type: 'PRIVACY_POLICY', accepted: true } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS', accepted: true }, { type: 'PRIVACY_POLICY', accepted: true } ], true ],
      [
        [
          { type: 'TERMS_AND_CONDITIONS', accepted: true },
          { type: 'PRIVACY_POLICY', accepted: true },
          { type: 'MARKETING' }
        ],
        true
      ],
    ]

    expect.assertions(tests.length * 2)

    tests.forEach(([ input, expected ]) => {
      expect(hasAcceptedLegalAgreements(input)).toEqual(expected)

      if (expected) {
        expect(() => assertHasAcceptedLegalAgreements(input)).not.toThrow()
      } else {
        expect(() => assertHasAcceptedLegalAgreements(input)).toThrow()
      }
    })
  })
})
