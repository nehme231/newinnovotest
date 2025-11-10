import * as React from 'react';
import type { SVGProps } from 'react';
export default function LinkedinLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      {...props}
    >
      <path
        fill="#3B9E65"
        fillRule="evenodd"
        d="M63.045 48h173.846A14.92 14.92 0 0 1 252 62.727v174.547a14.91 14.91 0 0 1-4.504 10.493A14.92 14.92 0 0 1 236.891 252H63.045A14.917 14.917 0 0 1 48 237.274V62.727A14.92 14.92 0 0 1 63.045 48m45.45 76.499H78.213v97.346h30.282zm-5.433-45.432a17.532 17.532 0 1 0-19.48 29.155 17.532 17.532 0 0 0 19.48-29.155m53.373 45.432h-29.007l-.063 97.601h30.217v-48.131c0-12.686 2.423-24.99 18.169-24.99s15.746 14.216 15.746 25.5v47.366h30.218v-53.422c0-26.201-5.611-46.346-36.274-46.346a31.88 31.88 0 0 0-28.624 15.746h-.382z"
        clipRule="evenodd"
      />
    </svg>
  );
}
