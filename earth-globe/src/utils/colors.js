/**
 * Okabe-Ito colorblind-safe palette (8 colors).
 * For exactly 2 groups: high-contrast orange + sky-blue pair.
 * For 3+ groups: full palette assigned in sorted group order.
 */

const OKABE_ITO = [
    '#E69F00', // orange
    '#56B4E9', // sky blue
    '#009E73', // bluish green
    '#F0E442', // yellow
    '#0072B2', // blue
    '#D55E00', // vermillion
    '#CC79A7', // reddish purple
    '#000000', // black
  ]
  
  const TWO_GROUP_COLORS = ['#E69F00', '#56B4E9']
  
  /**
   * Build a stable { groupName → hexColor } map.
   * Groups are sorted alphabetically for determinism.
   * @param {string[]} groups
   * @returns {Object}
   */
  export function buildColorMap(groups) {
    const sorted  = [...groups].sort()
    const palette = sorted.length === 2 ? TWO_GROUP_COLORS : OKABE_ITO
    return Object.fromEntries(
      sorted.map((g, i) => [g, palette[i % palette.length]])
    )
  }