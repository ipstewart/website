import { scaleLinear } from 'd3-scale';
import Lottie, { AnimationItem } from 'lottie-web';
import { forwardRef, useEffect, useRef, useImperativeHandle } from 'react';

interface ScrubOptions {
  start: number;
  end: number;
  progress: number;
}

interface MapAnimationProps {
  src: string;
}

export interface MapAnimationRef {
  scrub: ({ start, end, progress }: ScrubOptions) => unknown;
}

export const MapAnimation = forwardRef(({ src }: MapAnimationProps, ref) => {
  const lottieRef = useRef(null);
  const lottieAnimation = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (lottieRef.current) {
      lottieAnimation.current?.destroy();
      lottieAnimation.current = Lottie.loadAnimation({
        container: lottieRef.current,
        autoplay: false,
        loop: false,
        path: src,
      });
    }
  }, [src]);

  const scrub = ({ start, end, progress }: ScrubOptions) => {
    const startFrame = start * (lottieAnimation.current?.frameRate ?? 0);
    const endFrame = end * (lottieAnimation.current?.frameRate ?? 0);

    lottieAnimation.current?.pause();

    const progressToFrame = scaleLinear().domain([0, 1]).range([startFrame, endFrame]);
    const frame = Math.min(progressToFrame(progress), endFrame - 1);

    lottieAnimation.current?.goToAndStop(frame, true);
  };

  useImperativeHandle(ref, () => ({
    scrub,
  }));

  return <div ref={lottieRef} style={{ height: '100%', maxWidth: '100%' }} />;
});

MapAnimation.displayName = 'MapAnimation';
export default MapAnimation;
