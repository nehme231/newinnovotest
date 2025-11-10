import * as React from 'react';
import type { SVGProps } from 'react';
export default function FacebookLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      {...props}
    >
      <path
        fill="#3B9E65"
        d="M253 150.258C253 93.26 206.856 47 150 47S47 93.26 47 150.258c0 49.977 35.432 91.59 82.4 101.193v-70.215h-20.6v-30.978h20.6v-25.814c0-19.929 16.171-36.14 36.05-36.14h25.75v30.977h-20.6c-5.665 0-10.3 4.646-10.3 10.326v20.651h30.9v30.978h-30.9V253c52.015-5.163 92.7-49.151 92.7-102.742"
      />
    </svg>
  );
}
