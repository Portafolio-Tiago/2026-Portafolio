import type { Easing } from 'framer-motion'

/**
 * Shared cubic-bezier easing used across all motion components.
 * Typed as `[number,number,number,number]` so framer-motion v12 is satisfied.
 */
export const ease: Easing = [0.16, 1, 0.3, 1]
