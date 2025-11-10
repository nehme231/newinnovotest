'use client';
import { animate, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';
import { GoogleGeminiEffect, MovingBorderButton } from '@innovo/animations';
import { useRouter } from 'next/navigation';

export function Electricity() {
  const speed = 3; // Duration in seconds (adjust to control speed)
  const duration = speed * 2; // Total duration of the animation
  const totalProgress = useMotionValue(0);
  const router = useRouter();
  React.useEffect(() => {
    const controls = animate(totalProgress, [0, 1], {
      duration,
      repeat: Infinity,
      ease: 'linear',
    });
    return controls.stop;
  }, [totalProgress, duration]);

  // Define delays
  const delays = [0, 0, 0, 0, 0]; // Delays in seconds
  const delayFractions = delays.map((delay) => delay / duration);

  // Line 1
  const perLineProgress1 = useTransform(totalProgress, (value) => {
    const progress = (value - delayFractions[0] + 1) % 1;
    return progress;
  });

  const perLinePathLength1 = useTransform(perLineProgress1, (value) => {
    if (value < 0.5) {
      return value * 2; // From 0 to 1 over first half
    } else {
      return 1; // Remain at 1
    }
  });

  const perLinePathOffset1 = useTransform(perLineProgress1, (value) => {
    if (value < 0.5) {
      return 0; // Remain at 0
    } else {
      return (value - 0.5) * 2; // From 0 to 1 over second half
    }
  });

  // Line 2
  const perLineProgress2 = useTransform(totalProgress, (value) => {
    const progress = (value - delayFractions[1] + 1) % 1;
    return progress;
  });

  const perLinePathLength2 = useTransform(perLineProgress2, (value) => {
    if (value < 0.5) {
      return value * 2;
    } else {
      return 1;
    }
  });

  const perLinePathOffset2 = useTransform(perLineProgress2, (value) => {
    if (value < 0.5) {
      return 0;
    } else {
      return (value - 0.5) * 2;
    }
  });

  // Line 3
  const perLineProgress3 = useTransform(totalProgress, (value) => {
    const progress = (value - delayFractions[2] + 1) % 1;
    return progress;
  });

  const perLinePathLength3 = useTransform(perLineProgress3, (value) => {
    if (value < 0.5) {
      return value * 2;
    } else {
      return 1;
    }
  });

  const perLinePathOffset3 = useTransform(perLineProgress3, (value) => {
    if (value < 0.5) {
      return 0;
    } else {
      return (value - 0.5) * 2;
    }
  });

  // Line 4
  const perLineProgress4 = useTransform(totalProgress, (value) => {
    const progress = (value - delayFractions[3] + 1) % 1;
    return progress;
  });

  const perLinePathLength4 = useTransform(perLineProgress4, (value) => {
    if (value < 0.5) {
      return value * 2;
    } else {
      return 1;
    }
  });

  const perLinePathOffset4 = useTransform(perLineProgress4, (value) => {
    if (value < 0.5) {
      return 0;
    } else {
      return (value - 0.5) * 2;
    }
  });

  // Line 5
  const perLineProgress5 = useTransform(totalProgress, (value) => {
    const progress = (value - delayFractions[4] + 1) % 1;
    return progress;
  });

  const perLinePathLength5 = useTransform(perLineProgress5, (value) => {
    if (value < 0.5) {
      return value * 2;
    } else {
      return 1;
    }
  });

  const perLinePathOffset5 = useTransform(perLineProgress5, (value) => {
    if (value < 0.5) {
      return 0;
    } else {
      return (value - 0.5) * 2;
    }
  });

  // Arrays for pathLengths and pathOffsets
  const perLinePathLengths = [
    perLinePathLength1,
    perLinePathLength2,
    perLinePathLength3,
    perLinePathLength4,
    perLinePathLength5,
  ];

  const perLinePathOffsets = [
    perLinePathOffset1,
    perLinePathOffset2,
    perLinePathOffset3,
    perLinePathOffset4,
    perLinePathOffset5,
  ];

  return (
    <div className=" w-full dark:border dark:border-white/[0.1] rounded-md relative overflow-clip min-h-[60vh]">
      <GoogleGeminiEffect
        button={
          <MovingBorderButton
            onClick={() => {
              router.push('#contact-us', {
                scroll: true,
              });
            }}
          >
            Book a Call
          </MovingBorderButton>
        }
        pathLengths={perLinePathLengths}
        pathOffsets={perLinePathOffsets}
      />
    </div>
  );
}
