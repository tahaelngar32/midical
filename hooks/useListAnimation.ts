import { useEffect, useRef } from "react";
import gsap from "gsap";

export const useListAnimation = () => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(listRef.current?.children ?? [], {
        x: -100,
        opacity: 0,
        duration: 2,
        stagger: {
          amount: 0.5,
          from: "random",
        },
        ease: "power3.out",
      });
    });

    return () => ctx.revert();
  }, []);

  return { listRef };
};