'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
  speed?: number;
  smoothness?: number;
}

export default function SmoothScroll({
  children,
  speed = 1,
  smoothness = 0.1,
}: SmoothScrollProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let currentScroll = 0;
    let targetScroll = 0;
    let animationFrameId: number;

    const updateScroll = () => {
      targetScroll = window.scrollY;
      
      // Smooth lerp (linear interpolation)
      currentScroll += (targetScroll - currentScroll) * smoothness;

      if (contentRef.current) {
        contentRef.current.style.transform = `translate3d(0, ${-currentScroll}px, 0)`;
      }

      // Continue animation
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    // Start the animation loop
    animationFrameId = requestAnimationFrame(updateScroll);

    // Update body height to match content
    const updateHeight = () => {
      if (scrollRef.current && contentRef.current) {
        document.body.style.height = `${contentRef.current.offsetHeight}px`;
      }
    };

    updateHeight();

    // Update on resize
    window.addEventListener('resize', updateHeight);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', updateHeight);
      document.body.style.height = '';
    };
  }, [smoothness]);

  return (
    <div ref={scrollRef} className="fixed top-0 left-0 w-full">
      <div ref={contentRef} className="will-change-transform">
        {children}
      </div>
    </div>
  );
}

// Alternative: CSS-based smooth scroll (lighter weight)
export function SmoothScrollCSS({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Add smooth scroll to html element
    document.documentElement.style.scrollBehavior = 'smooth';

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return <>{children}</>;
}

// Scroll to section helper with smooth animation
export function useScrollToSection() {
  const scrollTo = (sectionId: string, offset = 0) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const targetPosition = element.offsetTop - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // 1 second
    let start: number | null = null;

    const easeInOutCubic = (t: number): number => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    };

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  return scrollTo;
}

// Scroll reveal hook for sections
export function useScrollReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-revealed');
        }
      },
      {
        threshold,
        rootMargin: '-50px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return ref;
}
