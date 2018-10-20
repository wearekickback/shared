import safeGet from 'lodash.get'

export const hasAcceptedLegalAgreements = (legal = []) => {
  const terms = legal.find(l => l.type === 'TERMS_AND_CONDITIONS')
  const privacy = legal.find(p => p.type === 'PRIVACY_POLICY')

  return !!(safeGet(terms, 'accepted') && safeGet(privacy, 'accepted'))
}

export const assertHasAcceptedLegalAgreements = legal => {
  if (!hasAcceptedLegalAgreements(legal)) {
    throw new Error(`Legal agreements must be accepted (terms, privacy)`)
  }
}

export const LEGAL = {
  TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
  PRIVACY_POLICY: 'PRIVACY_POLICY',
  MARKETING_INFO: 'MARKETING_INFO',
}
