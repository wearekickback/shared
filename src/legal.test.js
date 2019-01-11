import {
  hasAcceptedLegalAgreements,
  assertHasAcceptedLegalAgreements,
  getLegalAgreement,
  getUserAcceptedLegalAgreement,
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
      [ [ { type: 'TERMS_AND_CONDITIONS', id: 'id1' }, { type: 'PRIVACY_POLICY' }, { type: 'MARKETING' } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS', accepted: true } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS', accepted: true }, { type: 'PRIVACY_POLICY' } ], false ],
      [ [ { type: 'TERMS_AND_CONDITIONS' }, { type: 'PRIVACY_POLICY', id: 'id2' } ], false ],
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

    expect.assertions(tests.length * 2 + 5)

    tests.forEach(([ input, expected ]) => {
      expect(hasAcceptedLegalAgreements(input)).toEqual(expected)

      if (expected) {
        expect(() => assertHasAcceptedLegalAgreements(input)).not.toThrow()
      } else {
        expect(() => assertHasAcceptedLegalAgreements(input)).toThrow()
      }
    })

    const legal1 = [ { type: 'TERMS_AND_CONDITIONS', id: 'id1' }, { type: 'PRIVACY_POLICY' }, { type: 'MARKETING' } ]
    const legal2 = [ { type: 'TERMS_AND_CONDITIONS' }, { type: 'PRIVACY_POLICY', id: 'id2' } ]

    expect(getLegalAgreement(legal1, LEGAL.TERMS_AND_CONDITIONS)).toEqual({ type: 'TERMS_AND_CONDITIONS', id: 'id1' })
    expect(getLegalAgreement(legal2, LEGAL.PRIVACY_POLICY)).toEqual({ type: 'PRIVACY_POLICY', id: 'id2' })
    expect(getLegalAgreement(legal2, LEGAL.MARKETING_INFO)).toEqual(null)

    const actualLegal = [ { type: 'TERMS_AND_CONDITIONS', id: 'id1' }, { type: 'PRIVACY_POLICY', id: 'id2', accepted: true }, { type: 'MARKETING', id: 'id3' } ]
    const userLegal = [ { type: 'TERMS_AND_CONDITIONS', accepted: true, id: 'id1' }, { type: 'PRIVACY_POLICY', id: 'id4', accepted: true }, { type: 'MARKETING' } ]

    expect(getUserAcceptedLegalAgreement(userLegal, actualLegal, LEGAL.TERMS_AND_CONDITIONS)).toEqual({ type: 'TERMS_AND_CONDITIONS', accepted: true, id: 'id1' })
    expect(getUserAcceptedLegalAgreement(userLegal, actualLegal, LEGAL.PRIVACY_POLICY)).toEqual(null)
  })
})
