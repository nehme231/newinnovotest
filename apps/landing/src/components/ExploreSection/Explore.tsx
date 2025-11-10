'use client';

import { MovingBorderButton } from '@innovo/animations';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from '@innovo/ui';
import { toast } from 'sonner';
import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CountryCodeSelector } from '../CountryCodeSelector';
import {
  featureDemoForm,
  featureDemoFormInitialValues,
} from '../../forms/featureDemoForm';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import { CountryCode } from 'libphonenumber-js';
import { Turnstile } from 'next-turnstile';

export const Explore = () => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selected, setSelected] = useState<string>('');
  const [open, setOpen] = useState(false);
  const form = useForm<featureDemoForm>({
    defaultValues: featureDemoFormInitialValues,
    resolver: yupResolver(featureDemoForm),
    mode: 'onChange',
  });
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');
  const [error, setError] = useState<string | null>(null);

  const handleFeatureDemo = async (data: featureDemoForm) => {
    setIsSubmitting(true);
    const response = await fetch('/api/contact-us/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        selected,
        phoneCountryCode: getCountryCallingCode(
          data.phoneCountryCode as CountryCode
        ),
      }),
    });

    const result = (await response.json()) as {
      status: string;
      message?: string;
    };
    setIsSubmitting(false);
    form.reset();
    if (result.status === 'success') {
      toast('Our AI assistant will call you');
      setOpen(false);
    } else {
      toast('Something went wrong. Please try again later');
    }
  };

  return (
    <div className={'flex flex-col gap-[20px]'}>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className={'flex flex-wrap gap-[20px] justify-center'}>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('real-estate')}>
              Real Estate
            </MovingBorderButton>
          </DialogTrigger>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('restaurants')}>
              Restaurants
            </MovingBorderButton>
          </DialogTrigger>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('law-firms')}>
              Law Firms
            </MovingBorderButton>
          </DialogTrigger>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('finance')}>
              Finance
            </MovingBorderButton>
          </DialogTrigger>
        </div>
        <div className={'flex flex-wrap gap-[20px] justify-center'}>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('insurance')}>
              Insurance
            </MovingBorderButton>
          </DialogTrigger>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('car-rentals')}>
              Car Rentals
            </MovingBorderButton>
          </DialogTrigger>
          <DialogTrigger className="group/modal-btn" asChild>
            <MovingBorderButton onClick={() => setSelected('construction')}>
              Construction
            </MovingBorderButton>
          </DialogTrigger>
        </div>
        <DialogContent
          className={' p-[25px] min-h-[unset]'}
          style={{
            width: 'fit-content',
            minWidth: '300px',
            maxWidth: '400px',
          }}
        >
          <div className={'flex flex-col gap-[20px] text-white '}>
            <div className={'flex flex-col gap-[10px]'}>
              <p className={'text-xl'}>Automate your success</p>
              <p className={'text-4xl'}>Book a call</p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleFeatureDemo)}
                className="flex h-full w-full flex-col space-y-5"
              >
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={'Full Name'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={'Email'} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className={'flex gap-2 flex-1'}>
                  <FormField
                    control={form.control}
                    name="phoneCountryCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CountryCodeSelector {...field} />
                        </FormControl>
                        <FormMessage className={'max-w-[87px]'} />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="Phone number"
                            className="flex-1"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={'flex gap-2 justify-center items-center'}>
                  <Turnstile
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    retry="auto"
                    refreshExpired="auto"
                    // sandbox={process.env.NODE_ENV === 'development'}
                    onError={() => {
                      setTurnstileStatus('error');
                      setError('Security check failed. Please try again.');
                    }}
                    onExpire={() => {
                      setTurnstileStatus('expired');
                      setError('Security check expired. Please verify again.');
                    }}
                    onLoad={() => {
                      setTurnstileStatus('required');
                      setError(null);
                    }}
                    onVerify={(token) => {
                      form.setValue('token', token);
                      setTurnstileStatus('success');
                      setError(null);
                    }}
                  />
                </div>
                {error && (
                  <div
                    className="flex items-center gap-2 text-red-500 text-sm mb-2"
                    aria-live="polite"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-circle-alert"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
                <div className={'flex  justify-between mt-[20px]'}>
                  <div className={'flex gap-2 justify-center items-center'}>
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <mask
                        id="mask0_49_228"
                        style={{
                          maskType: 'alpha',
                        }}
                        maskUnits="userSpaceOnUse"
                        x="0"
                        y="0"
                        width="40"
                        height="40"
                      >
                        <rect width="40" height="40" fill="#D9D9D9" />
                      </mask>
                      <g mask="url(#mask0_49_228)">
                        <path
                          d="M33.25 35C29.7778 35 26.3472 34.2431 22.9583 32.7292C19.5694 31.2153 16.4861 29.0694 13.7083 26.2917C10.9306 23.5139 8.78472 20.4306 7.27083 17.0417C5.75694 13.6528 5 10.2222 5 6.75C5 6.25 5.16667 5.83333 5.5 5.5C5.83333 5.16667 6.25 5 6.75 5H13.5C13.8889 5 14.2361 5.13194 14.5417 5.39583C14.8472 5.65972 15.0278 5.97222 15.0833 6.33333L16.1667 12.1667C16.2222 12.6111 16.2083 12.9861 16.125 13.2917C16.0417 13.5972 15.8889 13.8611 15.6667 14.0833L11.625 18.1667C12.1806 19.1944 12.8403 20.1875 13.6042 21.1458C14.3681 22.1042 15.2083 23.0278 16.125 23.9167C16.9861 24.7778 17.8889 25.5764 18.8333 26.3125C19.7778 27.0486 20.7778 27.7222 21.8333 28.3333L25.75 24.4167C26 24.1667 26.3264 23.9792 26.7292 23.8542C27.1319 23.7292 27.5278 23.6944 27.9167 23.75L33.6667 24.9167C34.0556 25.0278 34.375 25.2292 34.625 25.5208C34.875 25.8125 35 26.1389 35 26.5V33.25C35 33.75 34.8333 34.1667 34.5 34.5C34.1667 34.8333 33.75 35 33.25 35ZM10.0417 15L12.7917 12.25L12.0833 8.33333H8.375C8.51389 9.47222 8.70833 10.5972 8.95833 11.7083C9.20833 12.8194 9.56944 13.9167 10.0417 15ZM24.9583 29.9167C26.0417 30.3889 27.1458 30.7639 28.2708 31.0417C29.3958 31.3194 30.5278 31.5 31.6667 31.5833V27.9167L27.75 27.125L24.9583 29.9167Z"
                          fill="#7D7D7D"
                        />
                      </g>
                    </svg>

                    <p className={'text-muted-foreground text-md'}>
                      Our AI Assistant
                      <br />
                      will call you
                    </p>
                  </div>

                  <Button
                    size={'lg'}
                    loading={isSubmitting}
                    // disabled={turnstileStatus !== 'success'}
                  >
                    CALL ME
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          {/*</ModalContent>*/}
        </DialogContent>
      </Dialog>
    </div>
  );
};
