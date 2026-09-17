import { useRef, useEffect, useState } from 'react';
import { motion, Variants, Transition } from 'framer-motion';

interface InViewProps {
  children: React.ReactNode;
  variants?: { hidden: object; visible: object };
  transition?: Transition;
  viewOptions?: IntersectionObserverInit & { margin?: string };
  className?: string;
  style?: React.CSSProperties;
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.97,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
  },
};

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.45, ease: 'easeOut' },
  viewOptions,
  className,
  style,
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      {
        threshold: viewOptions?.threshold ?? 0.08,
        rootMargin: viewOptions?.margin ?? '0px 0px -60px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [viewOptions]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={visible ? 'visible' : 'hidden'}
      variants={variants as Variants}
      transition={transition}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
