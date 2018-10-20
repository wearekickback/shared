export const getSocialId = (user = {}, socialType) => {
  const { value } =
    (user.social || []).find(({ type }) => type === socialType) || {}
  return value
}
