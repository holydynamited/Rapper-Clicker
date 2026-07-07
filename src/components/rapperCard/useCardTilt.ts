import { useState, useRef, useCallback } from 'react';

type CardTilt = {
  cardRef: React.RefObject<HTMLDivElement | null>;
  rotateX: number;
  rotateY: number;
  parallaxX: number;
  parallaxY: number;
  chromeAngle: number;
  hovered: boolean;
  onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};

export function useCardTilt(): CardTilt {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [parallaxX, setParallaxX] = useState(0);
  const [parallaxY, setParallaxY] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [chromeAngle, setChromeAngle] = useState(140);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const box = cardRef.current.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    const nx = x / (box.width / 2);
    const ny = y / (box.height / 2);

    setRotateX(-ny * 7);
    setRotateY(nx * 7);
    setParallaxX(nx * 5);
    setParallaxY(ny * 5);
    setChromeAngle(140 + nx * 35 + ny * 18);
  }, []);

  const onMouseLeave = useCallback(() => {
    setRotateX(0);
    setRotateY(0);
    setParallaxX(0);
    setParallaxY(0);
    setHovered(false);
    setChromeAngle(140);
  }, []);

  const onMouseEnter = useCallback(() => setHovered(true), []);

  return {
    cardRef,
    rotateX,
    rotateY,
    parallaxX,
    parallaxY,
    chromeAngle,
    hovered,
    onMouseMove,
    onMouseEnter,
    onMouseLeave,
  };
}
