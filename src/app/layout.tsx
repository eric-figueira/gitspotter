import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import TanstackProvider from '@/providers/TanstackProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Gitmate',
  description: 'Spot those who do not follow you back in Github',
  icons: {
    icon: '/gitmate-logo.ico'
  },
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
