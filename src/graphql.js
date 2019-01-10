import gql from 'graphql-tag'

export const graphqlSchema = gql`
  scalar DateTime

  enum ParticipantStatus {
    REGISTERED
    SHOWED_UP
    WITHDRAWN_PAYOUT
    UNKNOWN
  }

  # we only allow certain statuses to be externally updateable
  enum UpdateableParticipantStatus {
    REGISTERED # if they don't show up
    SHOWED_UP # if they show up
  }

  enum LegalAgreementType {
    TERMS_AND_CONDITIONS
    PRIVACY_POLICY
    MARKETING_INFO
  }

  enum Role {
    SUPER_ADMIN
    EVENT_ADMIN
  }

  type LegalAgreement {
    id: ID!
    type: LegalAgreementType!
    version: String!
    accepted: DateTime!
  }

  type EmailSettings {
    verified: String
    pending: String
  }

  type SocialMedia {
    type: String!
    value: String!
  }

  type UserProfile {
    id: ID!
    address: String!
    username: String
    realName: String
    roles: [Role]
    social: [SocialMedia]
    legal: [LegalAgreement]
    email: EmailSettings
  }

  type PartyRole {
    role: Role!
    user: UserProfile!
  }

  type Participant {
    index: Int!
    status: ParticipantStatus!
    user: UserProfile!
  }

  type Party {
    id: ID!
    address: String!
    name: String!
    description: String!
    start: DateTime!
    end: DateTime!
    arriveBy: DateTime
    location: String
    headerImg: String
    balance: String!
    deposit: String!
    coolingPeriod: String!
    participantLimit: Int!
    ended: Boolean!
    cancelled: Boolean!
    roles: [PartyRole]!
    participants: [Participant]!
  }

  input PartyMetaInput {
    name: String!
    description: String
    date: String
    location: String
    image: String
  }


  input SocialMediaInput {
    type: String!
    value: String!
  }

  input LegalAgreementInput {
    type: LegalAgreementType!
    accepted: String!
  }

  input UserProfileInput {
    email: String
    username: String
    realName: String
    social: [SocialMediaInput]
    legal: [LegalAgreementInput]
  }

  type LoginChallenge {
    str: String!
  }

  input ParticipantInput {
    address: String!
    status: UpdateableParticipantStatus!
  }

  type Query {
    networkId: String
    allParties: [Party]
    activeParties: [Party]
    party(address: String!): Party
    partyAdminView(address: String!): Party
    userProfile(address: String!): UserProfile
  }

  type Mutation {
    createPendingParty(meta: PartyMetaInput!, password: String): ID
    createLoginChallenge(address: String!): LoginChallenge
    loginUser: UserProfile
    updateUserProfile(profile: UserProfileInput!): UserProfile
    updatePartyMeta(address: String!, meta: PartyMetaInput!): Party
    updateParticipantStatus(
      address: String!
      participant: ParticipantInput!
    ): Participant
  }
`
