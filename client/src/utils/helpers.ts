export function pickKeysFromReference(source: Record<any, any>, reference: Record<any, any>) {
  const result: Record<any, any> = {}
  const referenceKeys = Object.keys(reference)

  // Iterate over the reference keys
  referenceKeys.forEach((key) => {
    // If the key exists in the source object, add it to the result
    if (source.hasOwnProperty(key)) {
      result[key] = source[key]
    }
  })

  return result
}
