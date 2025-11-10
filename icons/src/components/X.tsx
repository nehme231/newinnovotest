import * as React from 'react';
import type { SVGProps } from 'react';
export default function X(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      {...props}
    >
      <path
        fill="#404040"
        d="M96.1 101h12.25l73.5 98H169.6zm22.05 0h12.25l73.5 98h-12.25z"
      />
      <path
        fill="#404040"
        d="M105.9 101h24.5v9.8h-24.5zm63.7 98h24.5v-9.8h-24.5zM181.85 101H199l-83.3 98H98.55z"
      />
    </svg>
  );
}
