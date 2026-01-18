import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n";

import Header from "@/components/site/header/Header";
import Footer from "@/components/site/footer/Footer";
import Providers from "@/components/Providers";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html lang={locale} >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
