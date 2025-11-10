import * as yup from 'yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input/input';

export const contactUsForm = yup.object({
  fullName: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters')
    .max(255, 'Full Name must be at most 255 characters'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  phoneCountryCode: yup.string().required('Phone Country Code is required'),
  token: yup.string().required('Token is required'),
  phoneNumber: yup
    .string()
    .required('You must enter a phone number')
    .test(
      'is-possible-phone-number',
      'Phone number is not valid',
      (value, context) => {
        const phoneCountryCode = context.parent.phoneCountryCode;

        if (!phoneCountryCode) {
          return false;
        }

        return value
          ? isPossiblePhoneNumber(
              '+' + getCountryCallingCode(phoneCountryCode) + value
            )
          : false;
      }
    ),
  businessName: yup
    .string()
    .required('Business Name is required')
    .min(3, 'Business Name must be at least 3 characters')
    .max(255, 'Business Name must be at most 255 characters'),
  position: yup
    .string()
    .required('Position is required')
    .min(3, 'Position must be at least 3 characters')
    .max(255, 'Position must be at most 255 characters'),
  website: yup
    .string()
    .test('is-url', 'Website is invalid', (value) => {
      if (!value) {
        return false;
      }

      try {
        let url = value.trim();

        // If the value doesn't start with a protocol, add http://
        if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(url)) {
          url = 'http://' + url;
        }

        // Create a new URL object
        const parsedUrl = new URL(url);

        // Ensure the hostname contains at least one dot (to avoid accepting 'localhost')
        if (!parsedUrl.hostname.includes('.')) {
          return false;
        }

        return true;
      } catch (error) {
        return false;
      }
    })
    .required('Website is required')
    .min(3, 'Website must be at least 3 characters')
    .max(255, 'Website must be at most 255 characters'),
  message: yup.string(),
});

export type contactUsForm = yup.InferType<typeof contactUsForm>;

export const contactUsFormInitialValues: contactUsForm = {
  fullName: '',
  email: '',
  phoneCountryCode: 'US',
  phoneNumber: '',
  businessName: '',
  position: '',
  website: '',
  message: '',
  token: '',
};
