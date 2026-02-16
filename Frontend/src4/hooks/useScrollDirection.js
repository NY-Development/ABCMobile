import { useEffect, useRef, useState } from "react";

export const useScrollDirection = (threshold = 10) => {
  const lastScrollY = useRef(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;

      // Always show navbar at top
      if (currentScrollY <= 0) {
        setVisible(true);
        lastScrollY.current = 0;
        return;
      }

      // Scroll UP → show
      if (currentScrollY < lastScrollY.current - threshold) {
        setVisible(true);
      }

      // Scroll DOWN → hide
      if (currentScrollY > lastScrollY.current + threshold) {
        setVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return visible;
};
