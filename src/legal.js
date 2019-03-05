import safeGet from 'lodash.get'

import { ValidationError } from './errors'

export const hasAcceptedLegalAgreements = (legal = []) => {
  const terms = legal.find(l => l.type === 'TERMS_AND_CONDITIONS')
  const privacy = legal.find(p => p.type === 'PRIVACY_POLICY')

  return !!(safeGet(terms, 'accepted') && safeGet(privacy, 'accepted'))
}

export const assertHasAcceptedLegalAgreements = legal => {
  if (!hasAcceptedLegalAgreements(legal)) {
    throw new ValidationError(`Legal agreements must be accepted (terms, privacy)`)
  }
}

export const getLegalAgreement = (legal, idType) => (
  (legal || []).find(({ type }) => type === idType) || null
)

export const getUserAcceptedLegalAgreement = (userLegal, actualLegal, idType) => {
  const actual = actualLegal.find(({ type }) => type === idType)

  return (userLegal || []).find(({ type, accepted, id }) => (
    type === idType && accepted && id === actual.id
  )) || null
}

export const LEGAL = {
  TERMS_AND_CONDITIONS: 'TERMS_AND_CONDITIONS',
  PRIVACY_POLICY: 'PRIVACY_POLICY',
  MARKETING_INFO: 'MARKETING_INFO',
}
