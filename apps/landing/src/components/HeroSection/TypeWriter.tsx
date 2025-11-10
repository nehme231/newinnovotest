import { TextGenerateEffect } from '@innovo/animations';

export const TypeWriter = () => {
  return (
    <TextGenerateEffect
      words={'Empowering Your Business with Intelligent AI Solutions'}
      className={'text-white font-light text-7xl '}
      generalTextClassName={'md:text-7xl text-4xl'}
      textClassName={[
        'font-extrabold',
        'font-light',
        'font-extrabold',
        'font-light',
        'font-extrabold',
        'font-extrabold',
        'font-extrabold',
      ]}
    />
  );
};
