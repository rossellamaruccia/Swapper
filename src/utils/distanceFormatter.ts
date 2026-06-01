/**
 * @param meters
 */

export const formatDistance = (meters: number | undefined | null): string => {
  if (meters === undefined || meters === null) return ""

  if (meters < 1000) {
    return `${Math.round(meters / 10) * 10} m`
  }

  const km = meters / 1000
  return `${km.toFixed(1)} km`
}
