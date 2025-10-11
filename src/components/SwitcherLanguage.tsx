import React from 'react';
import { useTranslation } from 'react-i18next';

const SwitcherLanguage = () => {
  const { i18n } = useTranslation();
  const change = React.useCallback(
    (lng: string) => {
      i18n.changeLanguage(lng);
    },
    [i18n],
  );

  const selected = i18n.language ? i18n.language.split('-')[0] : 'en';

  React.useEffect(() => {
    const handleLanguageChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target && target.name === 'lang') {
        change(target.id === 'lang-en' ? 'en' : 'id');
      }
    };

    document.addEventListener('change', handleLanguageChange);

    return () => {
      document.removeEventListener('change', handleLanguageChange);
    };
  }, [change]);

  return (
    <div
      className="inline-flex items-center bg-gray-700 rounded-full p-1 py-2 px-7 mx-4 cursor-pointer"
      role="radiogroup"
      aria-label="Select language">
      <input
        type="radio"
        id="lang-en"
        name="lang"
        className="sr-only peer"
        checked={selected === 'en'}
        onChange={() => change('en')}
      />
      <label
        htmlFor="lang-en"
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-200 cursor-pointer transition-colors duration-150
                   peer-checked:bg-blue-600 peer-checked:text-white
                   peer-focus:ring-2 peer-focus:ring-blue-300"
        title="English">
        <span aria-hidden>🇬🇧</span>
        <span className="sr-only">English</span>
        <span className="hidden sm:inline">EN</span>
      </label>

      <input
        type="radio"
        id="lang-id"
        name="lang"
        className="sr-only peer"
        checked={selected === 'id'}
        onChange={() => change('id')}
      />
      <label
        htmlFor="lang-id"
        className={
          selected === 'id'
            ? `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-200 cursor-pointer transition-colors duration-150
                   peer-checked:bg-blue-600 peer-checked:text-white
                   peer-focus:ring-2 peer-focus:ring-blue-300`
            : `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-200 cursor-pointer transition-colors duration-150
                   hover:bg-blue-600 hover:text-white`
        }
        title="Indonesian">
        <span aria-hidden>🇮🇩</span>
        <span className="sr-only">Indonesian</span>
        <span className="hidden sm:inline">ID</span>
      </label>
    </div>
  );
};

export default SwitcherLanguage;
