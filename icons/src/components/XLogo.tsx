import * as React from 'react';
import type { SVGProps } from 'react';
export default function XLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 300 300"
      {...props}
    >
      <path
        fill="#3B9E65"
        d="M50 59.09h22.727L209.091 240.91h-22.727zm40.91 0h22.726L250 240.91h-22.727z"
      />
      <path
        fill="#3B9E65"
        d="M68.182 59.09h45.454v18.183H68.182zM186.364 240.91h45.454v-18.182h-45.454zM209.091 59.09h31.818L86.364 240.91H54.545z"
      />
    </svg>
  );
}
