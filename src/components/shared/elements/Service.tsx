import { BsShieldFillCheck } from 'react-icons/bs';
import { BiSearchAlt, BiSolidRocket } from 'react-icons/bi';
import { RiHeart2Fill } from 'react-icons/ri';
import { FaMoneyBillAlt } from 'react-icons/fa';
import type { ServiceCardProps } from '../../../types/ServiceCardProps';
import type { TranslationProps } from '../../../types/TranslationProps';
import { serviceData } from '../../../configs/constants';

const ServiceCard = ({ color, title, icon, subtitle }: ServiceCardProps) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 py-5 hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Service = ({ translate }: TranslationProps) => (
  <div className="flex w-full justify-center items-center gradient-bg-transactions pb-10">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-28 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <h1 className="text-white text-3xl sm:text-5xl py-2 text-gradient ">
          {translate('service_title_1')} <br />
          {translate('service_title_2')}
        </h1>
        <p className="text-left my-2 text-white font-light md:w-9/12 w-11/12 text-base">
          {translate('service_subtitle')}
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        {serviceData.map((item, index) => (
          <ServiceCard
            key={index}
            color={item.color}
            title={translate(item.titleKey)}
            icon={
              item.icon === 'BsShieldFillCheck' ? (
                <BsShieldFillCheck fontSize={21} className="text-white" />
              ) : item.icon === 'BiSearchAlt' ? (
                <BiSearchAlt fontSize={21} className="text-white" />
              ) : item.icon === 'RiHeart2Fill' ? (
                <RiHeart2Fill fontSize={21} className="text-white" />
              ) : item.icon === 'BiSolidRocket' ? (
                <BiSolidRocket fontSize={21} className="text-white" />
              ) : item.icon === 'FaMoneyBillAlt' ? (
                <FaMoneyBillAlt fontSize={21} className="text-white" />
              ) : null
            }
            subtitle={translate(item.subtitleKey)}
          />
        ))}
      </div>
    </div>
  </div>
);

export default Service;
