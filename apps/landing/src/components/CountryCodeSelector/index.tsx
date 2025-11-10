'use client';

import * as React from 'react';
import {
  Button,
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@innovo/ui';
import { CountryCode } from 'libphonenumber-js';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

interface CountryCodeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

export const CountryCodeSelector = ({
  value,
  onChange,
}: CountryCodeSelectorProps) => {
  const [open, setOpen] = React.useState(false);
  const [filter, setFilter] = React.useState('');

  const countries = React.useMemo(() => {
    return getCountries().sort((a, b) => en[a].localeCompare(en[b]));
  }, []);

  const filteredCountries = React.useMemo(() => {
    const lowerFilter = filter.toLowerCase().replace('+', '');
    return countries.filter((country) => {
      const countryName = en[country].toLowerCase();
      const countryCode = country.toLowerCase();
      const callingCode = getCountryCallingCode(country);

      return (
        countryName.includes(lowerFilter) ||
        countryCode.includes(lowerFilter) ||
        callingCode.includes(lowerFilter)
      );
    });
  }, [countries, filter]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit min-w-fit h-[50px] gap-1 px-2 py-2 flex items-center justify-between bg-background hover:bg-background text-white hover:text-white"
        >
          <span className="flex items-center">
            <span className="mr-2">{getCountryFlag(value)}</span>
            <span>{getCountryCallingCode(value as CountryCode)}</span>
          </span>
          <div className={'flex flex-col items-center '}>
            <ChevronUp className="h-4 w-4 opacity-50 -mb-1" />
            <ChevronDown className="h-4 w-4 opacity-50 -mt-1" />
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align={'start'}>
        <Command>
          <CommandInput
            placeholder="Search country..."
            value={filter}
            onValueChange={setFilter}
          />
          <CommandList>
            <CommandGroup>
              {filteredCountries.map((country) => (
                <CommandItem
                  key={country}
                  value={`${en[country]} ${country} ${getCountryCallingCode(
                    country
                  )}`}
                  onSelect={() => {
                    onChange(country);
                    setOpen(false);
                    setFilter('');
                  }}
                >
                  <span className="flex items-center text-white">
                    <span className="mr-2">{getCountryFlag(country)}</span>
                    <span className="mr-2">{en[country]}</span>
                    <span className="ml-auto text-xs text-gray-500">
                      +{getCountryCallingCode(country)}
                    </span>
                  </span>
                  {value === country && (
                    <Check className="ml-2 h-4 w-4 opacity-100" />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

function getCountryFlag(country: string) {
  const codePoints = country
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 10l7 7 7-7"
      stroke="var(--muted-foreground)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronUp = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19 14l-7-7-7 7"
      stroke="var(--muted-foreground)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Check = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5 13l4 4L19 7"
      stroke="var(--muted-foreground)"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
