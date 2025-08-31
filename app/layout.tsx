import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Flávio Júnior Portifolio',
  description: 'Portifólio do Flávio Júnior',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  );
}
