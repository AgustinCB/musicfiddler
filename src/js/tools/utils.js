export function Enum (obj) {
  const keysByValue = new Map()
  const EnumLookup = (value) => keysByValue.get(value)

  for (let key of Object.keys(obj)) {
    EnumLookup[key] = obj[key]
    keysByValue.set(EnumLookup[key], key)
  }

  return Object.freeze(EnumLookup)
}
