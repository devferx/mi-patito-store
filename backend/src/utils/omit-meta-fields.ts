export const omitMetaFields = <T extends Record<string, any>>(entity: T) => {
  const { createdAt, updatedAt, isDeleted, ...rest } = entity
  return rest
}
