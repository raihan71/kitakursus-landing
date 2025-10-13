import type { TranslationProps } from '../types/TranslationProps';

const CTA = ({ translate }: TranslationProps) => {
  return (
    <div className="text-center pt-16 pb-24 px-12 text-white blue-glassmorphism">
      <h2 className="text-2xl font-bold">{translate('cta_title')}</h2>
      <p className="mt-4">{translate('cta_subtitle')}</p>
      <div className="flex justify-between md:block mt-6">
        <button className="md:w-60 mx-4 md:mx-2 px-3 md:p-2 text-lg bg-[#2952e3] text-white rounded-lg  hover:bg-[#2546bd]">
          {translate('cta_button')}
        </button>
        <button className="md:w-60 md:mx-2 p-0.5 md:p-2 text-lg bg-green-500 text-white rounded-lg hover:bg-green-600">
          {translate('cta_button_2')}
        </button>
      </div>
    </div>
  );
};

export default CTA;
