'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import {
  contactUsForm,
  contactUsFormInitialValues,
} from '../../forms/contactUsForm';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Textarea,
} from '@innovo/ui';
import { CountryCodeSelector } from '../CountryCodeSelector';
import * as React from 'react';
import { useState } from 'react';
import { getCountryCallingCode } from 'react-phone-number-input/input';
import { CountryCode } from 'libphonenumber-js';
import { Turnstile } from 'next-turnstile';

export const ContactUsSection = () => {
  // const { toast } = useToast();
  const [turnstileStatus, setTurnstileStatus] = useState<
    'success' | 'error' | 'expired' | 'required'
  >('required');
  const [error, setError] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const form = useForm<contactUsForm>({
    defaultValues: contactUsFormInitialValues,
    resolver: yupResolver(contactUsForm),
    mode: 'onChange',
  });

  const handleContactUs = async (data: contactUsForm) => {
    setIsSubmitting(true);
    const response = await fetch('/api/contact-us', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
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
    } else {
      toast('Something went wrong. Please try again later');
    }
  };

  return (
    <div
      className={
        'grid grid-cols-12 md:gap-x-[40px] md:gap-y-[0px] gap-y-[40px] gap-x-[0px]'
      }
    >
      <div className={'md:col-span-6 col-span-12 flex'}>
        <div className={'flex flex-col gap-[40px] my-auto w-full'}>
          <h2 className={'text-4xl font-bold text-white'}>Contact Us</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleContactUs)}
              className="flex h-full w-full flex-col space-y-5"
            >
              <div className={'grid grid-cols-12 gap-4'}>
                <div className={'md:col-span-3 col-span-12'}>
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
                </div>
                <div className={'md:col-span-4 col-span-12'}>
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
                </div>
                <div className={'md:col-span-5 col-span-12'}>
                  <div className="flex  space-x-2">
                    <FormField
                      control={form.control}
                      name="phoneCountryCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CountryCodeSelector {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem className={'flex-1'}>
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
                </div>
                <div className={'md:col-span-3 col-span-12'}>
                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={'Business Name'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={'md:col-span-4 col-span-12'}>
                  <FormField
                    control={form.control}
                    name="position"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={'Position'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className={'md:col-span-5 col-span-12'}>
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder={'Business Website'} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className={'col-span-12'}>
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder={'Message'}
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className={'flex gap-2'}>
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
              <div className={'flex gap-[40px] !mt-[40px]'}>
                <Button size={'lg'} type={'submit'} loading={isSubmitting}>
                  CALL ME
                </Button>

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
              </div>
            </form>
          </Form>
        </div>
      </div>
      <div className={'md:col-span-6 col-span-12'}>
        <div
          className={
            'bg-[url("/static/location.png")] min-h-[500px] md:p-[30px] p-[10px] rounded-3xl flex relative cursor-pointer'
          }
          onClick={() => {
            window.open(
              'https://www.google.com/maps/search/2nd+Floor+College+House+17+King+Edwards+Road,+RUISLIP,+London+HA4+7AE,+UNITED+KINGDOM/@51.5746133,-0.4314865,17z/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI0MTExMy4xIKXMDSoASAFQAw%3D%3D',
              '_blank'
            );
          }}
          style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div
            className={'absolute inset-0 bg-black bg-opacity-50 rounded-3xl'}
          />
          <div
            className={
              'absolute inset-0 bg-black bg-opacity-50 rounded-3xl z-0'
            }
          />
          <div
            className={'flex gap-[20px] mt-auto z-[10] w-full justify-between'}
          >
            <div className={'flex gap-2 justify-center '}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_49_235"
                  style={{ maskType: 'alpha' }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                >
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_49_235)">
                  <path
                    d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z"
                    fill="#7D7D7D"
                  />
                </g>
              </svg>

              <p className={'text-muted-foreground text-md'}>
                2nd Floor College House
                <br />
                17 King Edwards Road,
                <br />
                RUISLIP, London
                <br />
                HA4 7AE, UNITED KINGDOM
              </p>
            </div>

            <div className={'flex gap-2 justify-center '}>
              <svg
                width="25"
                height="24"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <mask
                  id="mask0_49_240"
                  style={{ maskType: 'alpha' }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="25"
                  height="24"
                >
                  <rect x="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_49_240)">
                  <path
                    d="M20.45 21C18.3667 21 16.3083 20.5458 14.275 19.6375C12.2417 18.7292 10.3917 17.4417 8.725 15.775C7.05833 14.1083 5.77083 12.2583 4.8625 10.225C3.95417 8.19167 3.5 6.13333 3.5 4.05C3.5 3.75 3.6 3.5 3.8 3.3C4 3.1 4.25 3 4.55 3H8.6C8.83333 3 9.04167 3.07917 9.225 3.2375C9.40833 3.39583 9.51667 3.58333 9.55 3.8L10.2 7.3C10.2333 7.56667 10.225 7.79167 10.175 7.975C10.125 8.15833 10.0333 8.31667 9.9 8.45L7.475 10.9C7.80833 11.5167 8.20417 12.1125 8.6625 12.6875C9.12083 13.2625 9.625 13.8167 10.175 14.35C10.6917 14.8667 11.2333 15.3458 11.8 15.7875C12.3667 16.2292 12.9667 16.6333 13.6 17L15.95 14.65C16.1 14.5 16.2958 14.3875 16.5375 14.3125C16.7792 14.2375 17.0167 14.2167 17.25 14.25L20.7 14.95C20.9333 15.0167 21.125 15.1375 21.275 15.3125C21.425 15.4875 21.5 15.6833 21.5 15.9V19.95C21.5 20.25 21.4 20.5 21.2 20.7C21 20.9 20.75 21 20.45 21ZM6.525 9L8.175 7.35L7.75 5H5.525C5.60833 5.68333 5.725 6.35833 5.875 7.025C6.025 7.69167 6.24167 8.35 6.525 9ZM15.475 17.95C16.125 18.2333 16.7875 18.4583 17.4625 18.625C18.1375 18.7917 18.8167 18.9 19.5 18.95V16.75L17.15 16.275L15.475 17.95Z"
                    fill="#7D7D7D"
                  />
                </g>
              </svg>

              <p className={'text-muted-foreground text-md'}>
                Call us on this number and our <br />
                AI assistant will help you HA4
                <br />
                <a className={'text-primary'} href="tel:+1 (217) 833 8291">
                  +1 (217) 833 8291
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
