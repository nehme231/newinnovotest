'use client';

import React, { FC } from 'react';
import { cn } from '@innovo/utils';
import { MovingBorder } from '@innovo/animations';
import { Button } from '@innovo/ui';
import { InnovoIcon } from '@innovo/icons';
import Link from 'next/link';

interface FloatingNavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems: FloatingNavItem[];
  className?: string;
  borderRadius?: string;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  [key: string]: any;
}
export const FloatingNav: FC<FloatingNavProps> = ({
  navItems,
  borderRadius = '5rem',
  as: Component = 'div',
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}) => {
  return (
    <Component
      className={cn(
        'bg-transparent relative text-xl  md:h-16 h-12 w-fit p-[1px] overflow-hidden max-w-fit  fixed md:top-10 top-4 inset-x-0 mx-auto z-[100] ',
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
          WebkitBackdropFilter: 'blur(24px) saturate(140%)',
          backdropFilter: ' blur(24px) saturate(140%)',
        }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%">
          <div
            className={cn(
              'h-20 w-20 opacity-[0.8] bg-[radial-gradient(var(--emerald-500)_40%,transparent_60%)]',
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          'relative bg-neutral-900/[0.5] border border-neutral-800 backdrop-blur-xl  flex items-center justify-center w-full h-full text-sm antialiased',
          'md:px-6 md:py-4 px-4 py-2  items-center justify-center space-x-4',
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        <InnovoIcon className={'md:h-[25px] h-[15px] mb-[4px]'} />
        {navItems.map((navItem, idx: number) => (
          <Link
            key={`link=${idx}`}
            href={navItem.link}
            className={cn(
              'relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500'
            )}
          >
            <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-sm">{navItem.name}</span>
          </Link>
        ))}
        <Link href={'#demo'}>
          <Button className={'md:block hidden '}>Try Demo</Button>
          <Button className={'md:hidden block'} size={'sm'}>
            Try Demo
          </Button>
        </Link>
      </div>
    </Component>
  );
};
