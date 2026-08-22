/**
 * statueFrames — a single, shared preloader for the statue's WebP frame
 * sequence. Both the intro <Preloader/> and <StatueModel/> use this so the
 * ~270 frames are fetched and decoded exactly once, and the loading screen's
 * progress reflects the real download.
 */

export const FRAME_COUNT = 270;

export function framePath(index: number): string {
  return `/frames/${String(index + 1).padStart(4, "0")}.webp`;
}

type Listener = (progress: number) => void;

const images: HTMLImageElement[] = new Array(FRAME_COUNT);
const loaded: boolean[] = new Array(FRAME_COUNT).fill(false);
let settled = 0;
let promise: Promise<void> | null = null;
const listeners = new Set<Listener>();

export function getFrameImages(): HTMLImageElement[] {
  return images;
}

export function isFrameLoaded(index: number): boolean {
  return loaded[index];
}

export function frameProgress(): number {
  return settled / FRAME_COUNT;
}

/** Subscribe to load progress (0–1). Fires immediately with current value. */
export function onFrameProgress(cb: Listener): () => void {
  listeners.add(cb);
  cb(frameProgress());
  return () => {
    listeners.delete(cb);
  };
}

/** Start loading every frame once, with a bounded parallel pool. Idempotent. */
export function preloadFrames(): Promise<void> {
  if (promise) return promise;
  if (typeof window === "undefined") return Promise.resolve();

  promise = (async () => {
    const CONCURRENCY = 16;
    let next = 0;

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        const img = new Image();
        img.decoding = "async";
        const done = () => {
          settled++;
          const p = settled / FRAME_COUNT;
          listeners.forEach((l) => l(p));
          resolve();
        };
        img.onload = () => {
          images[i] = img;
          loaded[i] = true;
          done();
        };
        img.onerror = done;
        img.src = framePath(i);
      });

    const worker = async () => {
      for (;;) {
        const i = next++;
        if (i >= FRAME_COUNT) return;
        await loadOne(i);
      }
    };

    await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  })();

  return promise;
}
