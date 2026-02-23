import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/ui/Footer';

export const metadata = {
  title: 'Threaded Leaves - Premium Tea E-commerce',
  description: 'Threaded Leaves: premium tea rituals engineered for stillness and focus.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Cinzel+Decorative:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-screen flex flex-col bg-tl-paper text-tl-soot font-sans selection:bg-tl-matcha selection:text-white antialiased">
        <Providers>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}