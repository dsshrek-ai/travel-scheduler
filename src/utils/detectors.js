const PHONE_RE = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

const ADDRESS_KEYWORDS = [
  'street', 'st.', 'avenue', 'ave', 'road', 'rd', 'drive', 'dr',
  'boulevard', 'blvd', 'lane', 'ln', 'court', 'ct', 'place', 'pl',
  'highway', 'hwy', 'way', 'circle', 'cir', 'suite', 'apt', 'floor',
]

export function isPhone(value) {
  if (!value) return false
  const cleaned = value.replace(/[\s\-().+]/g, '')
  return PHONE_RE.test(value.trim()) || /^\d{10,11}$/.test(cleaned)
}

export function isAddress(value) {
  if (!value) return false
  const lower = value.toLowerCase()
  const hasNumber = /^\d+\s/.test(value.trim())
  const hasKeyword = ADDRESS_KEYWORDS.some(k => lower.includes(k))
  return hasNumber && hasKeyword
}

export function formatPhone(value) {
  const digits = value.replace(/\D/g, '')
  if (digits.length === 10) {
    return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits[0] === '1') {
    return `+1 (${digits.slice(1,4)}) ${digits.slice(4,7)}-${digits.slice(7)}`
  }
  return value
}

export function mapsUrl(address) {
  return `https://maps.google.com/?q=${encodeURIComponent(address)}`
}
