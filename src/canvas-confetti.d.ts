declare module 'canvas-confetti' {
  interface ConfettiOptions {
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: string[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
    particleCount?: number;
  }

  type Confetti = (options?: ConfettiOptions) => Promise<null>;

  const confetti: Confetti;

  export default confetti;
}
