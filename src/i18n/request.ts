import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';


// Can be imported from a shared config
const LOCALES = ['vi', 'en', 'ru', 'zh'];

export default getRequestConfig(async ({ locale }) => {
  // Kiểm tra locale hợp lệ
  // console.log(locale);
  const common = await import(`../locales/vi/common.json`);
  const home = await import(`../locales/vi/home.json`);
  const about = await import(`../locales/vi/about.json`);
  const services = await import(`../locales/vi/services.json`);
  const projects = await import(`../locales/vi/projects.json`);
  const contact = await import(`../locales/vi/contact.json`);
  const products = await import(`../locales/vi/products.json`);
  if (locale == undefined) return {
    locale: 'vi',
    messages: {
      common: common,
      home: home,
      about: about,
      services: services,
      projects: projects,
      contact: contact,
      products: products,
    }
  };
  // if (!LOCALES.includes(locale as 'vi' | 'en' | 'ru' | 'zh')) {
  //   console.log('locale not found');
  //   notFound();
  // }

  // Nạp các file dịch cho locale với error handling
  try {
    const [common, home, about, services, projects, contact, products] = await Promise.all([
      import(`../locales/${locale}/common.json`),
      import(`../locales/${locale}/home.json`),
      import(`../locales/${locale}/about.json`),
      import(`../locales/${locale}/services.json`),
      import(`../locales/${locale}/projects.json`),
      import(`../locales/${locale}/contact.json`),
      import(`../locales/${locale}/products.json`),
    ]);

    return {
      locale: locale as string,
      messages: {
        common: common.default,
        home: home.default,
        about: about.default,
        services: services.default,
        projects: projects.default,
        contact: contact.default,
        products: products.default,
      }
    };
  } catch (error) {
    console.error(`Error loading translations for locale: ${locale}`, error);
    notFound();
  }
});
