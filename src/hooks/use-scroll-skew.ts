"use client";

import { useScroll, useVelocity, useTransform, useSpring } from "framer-motion";

export function useScrollSkew() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);

  // Maps fast scroll velocity to subtle -3deg to 3deg skew
  const rawSkew = useTransform(scrollVelocity, [-3000, 3000], [-3, 3]);
  const smoothSkew = useSpring(rawSkew, { stiffness: 100, damping: 20 });

  return smoothSkew;
}
