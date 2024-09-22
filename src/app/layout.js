import "./globals.css";

export const metadata = {
  title: "Anonymní poradna - Odpovědi na vaše dotazy zdarma | Questions and Answers",
  description: "Zeptejte se na cokoliv. Odpovědi na vaše dotazy. Anonymní poradna zdarma.",
  robots: 'index, follow',
  
  openGraph: {
    title: 'Anonymní poradna',
    description: 'Odpovědi na vaše otázky zdarma.',
    url: 'https://www.questionsandanswers.fun',
    siteName: 'Anonymní poradna',
    images: [
      {
        url: 'https://www.questionsandanswers.fun/logo.png',
        width: 800,
        height: 600,
        alt: 'Logo anonymní poradny',
      },
    ],
    locale: 'cs_CZ',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <head>
        <link rel="icon" href="/logo2.png" type="image/png" />
        {/* Načtení Google reCAPTCHA v3 skriptu */}
        <script
          src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
          async
          defer
        ></script>
      </head>
      <body >
        {children}
      </body>
    </html>

  );
}
