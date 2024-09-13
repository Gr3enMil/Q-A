import "./globals.css";

export const metadata = {
  title: "Poradna - dotazy - zdarma",
  description: "Zeptejte se na cokoliv",
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
