export const getSocialId = (socials, socialType) => {
  const { value } =
    socials.find(({ type }) => type === socialType) || {}
  return value
}
