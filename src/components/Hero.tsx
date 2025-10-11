import React from 'react';
import { AiFillPlayCircle } from 'react-icons/ai';
import { jobTitles } from '../configs/constants';
import CardEmployee from './CardEmployee';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const [currentJobTitle, setCurrentJobTitle] = React.useState(jobTitles[0]);
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);

      setTimeout(() => {
        setCurrentJobTitle((prev) => {
          const currentIndex = jobTitles.indexOf(prev);
          const nextIndex = (currentIndex + 1) % jobTitles.length;
          return jobTitles[nextIndex];
        });
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            {t('hero_title_1')} <br /> {t('hero_title_2')}
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            {t('hero_description')}
          </p>
          <button
            type="button"
            className="flex w-1/2 flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]">
            <AiFillPlayCircle className="text-white mr-2" />
            <p className="text-white text-base font-semibold">
              {t('learn_more')}
            </p>
          </button>

          {/* <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>
              Reliability
            </div>
            <div className={companyCommonStyles}>Security</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>
              Ethereum
            </div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>
              Web 3.0
            </div>
            <div className={companyCommonStyles}>Low Fees</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>
              Blockchain
            </div>
          </div> */}
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <CardEmployee
            currentJobTitle={currentJobTitle}
            isAnimating={isAnimating}
          />
          {/* <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <div className="h-[1px] w-full bg-gray-400 my-2" />

            <Loader />
            <button
              type="button"
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer">
              Send now
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Hero;
