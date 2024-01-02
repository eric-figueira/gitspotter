import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import TanstackProvider from '@/providers/TanstackProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: 'Gitmate',
  authors: [{ name: 'Éric Carvalho Figueira' }],
  description: 'Spot those who do not follow you back in GitHub',
  icons: {
    icon: '/gitmate-logo.ico',
  },
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript'],
  openGraph: {

  },
  title: {
    default: 'Gitmate',
    template: '%s | Gitmate',
  },
  twitter: {

  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  )
}
