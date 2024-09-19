import "./globals.css";

export const metadata = {
  title: "Poradna - dotazy - zdarma",
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
        <link 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          rel="stylesheet"
        />{/* Načtení ikon */}
      </head>
      <body >
        {children}
      </body>
    </html>

  );
}
