'use client';

import {
  ChatgptLogoIcon,
  FacebookLogoIcon,
  GohighlevelLogoIcon,
  GoogleLogoIcon,
  HubspotLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
  SalesforceLogoIcon,
  SlackLogoIcon,
  TrelloLogoIcon,
  XLogoIcon,
  ZapierLogoIcon,
} from '@innovo/icons';
import { motion } from 'framer-motion';

const LogoIconWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex items-center justify-center h-16 w-16 rounded-lg border-2 bg-[rgba(40,40,40)]
      border-[rgba(255,255,255,0.20)]
      shadow-[inset_0px_0px_8px_0px_rgba(248,248,248,0.25),inset_0px_32px_24px_-16px_rgba(0,0,0,0.40)]
      flex-shrink-0
      hover:scale-[0.98] transition duration-200"
    >
      <div className="h-8 w-8 rounded-md overflow-hidden">{children}</div>
    </div>
  );
};

export const AutomationAnimation = () => {
  return (
    <div
      className="h-[20rem] rounded-xl z-40 overflow-hidden"
      style={{
        maskImage:
          'radial-gradient(50% 50% at 50% 50%,#fff 0,transparent 100%)',
        background: 'rgba(40,40,40,.3)',
      }}
    >
      <div className="p-8 h-full overflow-hidden">
        <div className="flex flex-col gap-4 items-center justify-center h-full relative">
          <div className="flex gap-4 items-center justify-center flex-shrink-0 z-[5]">
            <LogoIconWrapper>
              <InstagramLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <LinkedinLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <ChatgptLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <FacebookLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <GohighlevelLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <HubspotLogoIcon />
            </LogoIconWrapper>
          </div>
          {/* Second Row of LogoIcons */}
          <div className="flex gap-4 items-center justify-center flex-shrink-0 ml-8  z-[5]">
            <LogoIconWrapper>
              <SlackLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <SalesforceLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <TrelloLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <ZapierLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <XLogoIcon />
            </LogoIconWrapper>
            <LogoIconWrapper>
              <GoogleLogoIcon />
            </LogoIconWrapper>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="62"
            height="105"
            viewBox="0 0 62 105"
            fill="none"
            className="absolute left-1/2 -translate-x-[102px]  -top-10 text-neutral-600"
          >
            <path
              d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
            <path
              d="M1.00001 -69L1 57.5C1 64.1274 6.37258 69.5 13 69.5H49C55.6274 69.5 61 74.8726 61 81.5L61 105"
              stroke="url(#linearGradient1)"
              strokeWidth="3"
            ></path>
            <defs>
              <motion.linearGradient
                id="linearGradient1"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="0%"
                animate={{
                  x1: ['0%', '100%'],
                  y1: ['0%', '90%'],
                  x2: ['0%', '120%'],
                  y2: ['0%', '120%'],
                }}
                transition={{
                  duration: 2 * Math.random() + 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <stop stopColor="#3B9E65" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#3B9E65"></stop>
                <stop offset="1" stopColor="#3B9E65" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>

          <svg
            width="128"
            height="69"
            viewBox="0 0 128 69"
            fill="none"
            className="absolute left-1/2 translate-x-[55px]  -bottom-2 text-neutral-600"
          >
            <path
              d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
              stroke="currentColor"
              strokeWidth="1.5"
            ></path>
            <path
              d="M1.00002 0.5L1.00001 29.5862C1 36.2136 6.37259 41.5862 13 41.5862H115C121.627 41.5862 127 46.9588 127 53.5862L127 75"
              stroke="url(#linearGradient1)"
              strokeWidth="3"
            ></path>
            <defs>
              <motion.linearGradient
                id="linearGradient1"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="0%"
                animate={{
                  x1: ['0%', '100%'],
                  y1: ['0%', '90%'],
                  x2: ['0%', '120%'],
                  y2: ['0%', '120%'],
                }}
                transition={{
                  duration: 2 * Math.random() + 2,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <stop stopColor="#3B9E65" stopOpacity="0"></stop>
                <stop offset="1" stopColor="#3B9E65"></stop>
                <stop offset="1" stopColor="#3B9E65" stopOpacity="0"></stop>
              </motion.linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};
