'use client';

import { cn } from '@innovo/utils';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { HTMLMotionProps, motion } from 'framer-motion';
import { useWindowSize } from '@uidotdev/usehooks';
// Create the MouseEnterContext and useMouseEnter hook from the 3d Card
const MouseEnterContext = createContext<
  [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

const useMouseEnter = () => {
  const context = useContext(MouseEnterContext);
  if (context === undefined) {
    throw new Error('useMouseEnter must be used within a MouseEnterProvider');
  }
  return context;
};

interface CardProps extends HTMLMotionProps<'div'> {
  threeDEffect?: boolean;
  className?: string;
  containerClassName?: string;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, containerClassName, threeDEffect = false, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);
    const windowSize = useWindowSize();
    const isMobile = useMemo(() => {
      if (windowSize === null) return false;
      return windowSize?.width ? windowSize.width <= 768 : false;
    }, [windowSize]);
    // Mouse event handlers from the 3d Card's CardContainer
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (isMobile) return;
      if (!containerRef.current) return;
      const { left, top, width, height } =
        containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) / 100;
      const y = (e.clientY - top - height / 2) / 100;
      containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsMouseEntered(true);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      setIsMouseEntered(false);
      if (!containerRef.current) return;
      containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };

    // The content of the Card remains the same
    const cardContent = (
      <motion.div
        ref={ref}
        className={cn(
          'rounded-4xl border bg-card text-card-foreground shadow max-w-full flex flex-col',
          className
        )}
        style={{
          borderRadius: '30px',
          border: '1px solid #404040',
          background:
            'linear-gradient(180deg, rgba(81, 81, 81, 0.20) 0%, rgba(9, 9, 9, 0.00) 5%, rgba(9, 9, 9, 0.00) 95%, rgba(81, 81, 81, 0.25) 100%), linear-gradient(90deg, rgba(81, 81, 81, 0.25) 0%, rgba(9, 9, 9, 0.00) 5%, rgba(9, 9, 9, 0.00) 95%, rgba(81, 81, 81, 0.25) 100%), #101010',
          transformStyle: threeDEffect ? 'preserve-3d' : undefined,
          ...props.style,
        }}
        whileHover={
          !threeDEffect
            ? {
                borderColor: '#4CAF50', // Replace with your primary color
                transition: { duration: 0.4 },
              }
            : undefined
        }
        {...props}
      />
    );

    // When threeDEffect is true, wrap with the context and event handlers from the 3d Card
    if (threeDEffect) {
      return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
          <div
            className={cn(
              'flex items-center justify-center h-full',
              containerClassName
            )}
            style={{
              perspective: '1000px',
            }}
          >
            <div
              ref={containerRef}
              onMouseEnter={handleMouseEnter}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="flex items-center justify-center relative transition-all duration-200 ease-linear h-full flex-col "
              style={{
                transformStyle: 'preserve-3d',
                maxWidth: '100%',
              }}
            >
              {cardContent}
            </div>
          </div>
        </MouseEnterContext.Provider>
      );
    } else {
      return cardContent;
    }
  }
);

Card.displayName = 'Card';

// Reusing the CardItem component from the 3d Card
interface CardItemProps {
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
  [key: string]: any;
}

const CardItem = ({
  as: Tag = 'div',
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}: CardItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isMouseEntered] = useMouseEnter();

  const windowSize = useWindowSize();
  const isMobile = useMemo(() => {
    if (windowSize === null) return false;
    return windowSize?.width ? windowSize.width <= 768 : false;
  }, [windowSize]);
  useEffect(() => {
    if (!ref.current) return;
    if (isMobile) {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
      return;
    }

    if (isMouseEntered) {
      ref.current.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
    } else {
      ref.current.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    isMobile,
  ]);

  return (
    <Tag
      ref={ref}
      className={cn('w-fit transition duration-200 ease-linear', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};

// Adjusting the Card components to incorporate CardItem when threeDEffect is true
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { threeDEffect?: boolean }
>(({ className, threeDEffect = false, ...props }, ref) => {
  if (threeDEffect) {
    return (
      <CardItem
        className={cn('flex flex-col space-y-1.5 px-6 pt-6', className)}
        translateZ={25}
      >
        <div ref={ref} {...props} />
      </CardItem>
    );
  } else {
    return (
      <div
        ref={ref}
        className={cn('flex flex-col space-y-1.5 px-6 pt-6', className)}
        {...props}
      />
    );
  }
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        'font-semibold leading-none tracking-tight text-white text-xl',
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { threeDEffect?: boolean }
>(({ className, threeDEffect = false, ...props }, ref) => {
  if (threeDEffect) {
    return (
      <CardItem className={cn('p-6 pt-0 w-full', className)} translateZ={25}>
        <div ref={ref} {...props} className={className} />
      </CardItem>
    );
  } else {
    return <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />;
  }
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { threeDEffect?: boolean }
>(({ className, threeDEffect = false, ...props }, ref) => {
  if (threeDEffect) {
    return (
      <CardItem
        className={cn('flex items-center p-6 pt-0 w-full', className)}
        translateZ={30}
      >
        <div ref={ref} {...props} className={'w-full'} />
      </CardItem>
    );
  } else {
    return (
      <div
        ref={ref}
        className={cn('flex items-center p-6 pt-0', className)}
        {...props}
      />
    );
  }
});
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
