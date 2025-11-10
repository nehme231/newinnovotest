import * as yup from 'yup';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input/input';

export const featureDemoForm = yup.object({
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
});

export type featureDemoForm = yup.InferType<typeof featureDemoForm>;

export const featureDemoFormInitialValues: featureDemoForm = {
  fullName: '',
  email: '',
  phoneCountryCode: 'US',
  phoneNumber: '',
  token: '',
};
