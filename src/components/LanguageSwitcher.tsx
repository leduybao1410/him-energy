'use client';
import { useRouter, usePathname } from 'next/navigation';
import { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { locales, localeNames, localeFlags, type Locale } from '@/lib/i18n';

const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (newLocale: Locale) => {
    // Xóa locale cũ khỏi pathname (đảm bảo chỉ xóa ở đầu path)
    const regex = new RegExp(`^/(${locales.join('|')})`);
    const pathWithoutLocale = pathname.replace(regex, '') || '/';
    // Điều hướng sang locale mới với path đã loại bỏ locale cũ
    router.push(`/${newLocale}${pathWithoutLocale}`);

    setIsOpen(false);
  };

  const isCurrentLang = (lang: Locale) => {
    const regex = new RegExp(`^/(${lang})(/|$)`);
    return regex.test(pathname);
  };

  const getCurrentLang = (): Locale => {
    const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
    const lang = match && locales.includes(match[1] as Locale) ? (match[1] as Locale) : 'vi';
    return lang;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/80 hover:bg-primary-50 text-gray-900 hover:text-primary-700 transition-colors duration-200 border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-300"
        aria-label="Chuyển đổi ngôn ngữ"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(!isOpen);
        }}
      >
        <Globe className="w-4 h-4" aria-hidden="true" />
        <span className="text-sm font-medium">
          {localeFlags[getCurrentLang()]} {localeNames[getCurrentLang()]}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {locales.map((loc) => (
            <button
              key={loc}
              onClick={() => handleLanguageChange(loc)}
              className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 ${isCurrentLang(loc) ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                }`}
            >
              <span className="text-lg">{localeFlags[loc]}</span>
              <span className="text-sm font-medium">{localeNames[loc]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
