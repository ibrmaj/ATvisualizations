/**
 * Convert lat/lng degrees to a 3D Cartesian position on a sphere.
 *
 * Coordinate system (Three.js):
 *   Y = up, Z = toward viewer, X = right
 *
 * Conversion:
 *   phi   = (90 - lat) × π/180   → polar angle from Y+
 *   theta = (lng + 180) × π/180  → azimuthal angle
 *
 *   x =  r · sin(phi) · cos(theta)
 *   y =  r · cos(phi)
 *   z = -r · sin(phi) · sin(theta)   ← negative so +lng goes East
 *
 * @param {number} lat    Latitude in degrees  [-90, 90]
 * @param {number} lng    Longitude in degrees [-180, 180]
 * @param {number} radius Sphere radius
 */
export function latLngToXYZ(lat, lng, radius = 1) {
    const phi   = (90 - lat)   * (Math.PI / 180)
    const theta = (lng )  * (Math.PI / 180)
  
    return {
      x:  radius * Math.sin(phi) * Math.cos(theta),
      y:  radius * Math.cos(phi),
      z: -radius * Math.sin(phi) * Math.sin(theta),
    }
  }