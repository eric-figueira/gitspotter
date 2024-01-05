import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'
import TanstackProvider from '@/providers/TanstackProvider'
import { Header } from '@/components/layout/Header'
import ThemeProvider from '@/providers/ThemeProvider'
import { AppConfig as config } from '@/lib/AppConfig'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  applicationName: config.applicationName,
  authors: [{ name: 'Éric Carvalho Figueira' }],
  description: config.description,
  icons: {
    icon: config.icon,
  },
  keywords: ['Next.js', 'React', 'JavaScript', 'TypeScript'],
  openGraph: {

  },
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  twitter: {

  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ThemeProvider 
          attribute='class' 
          defaultTheme='dark'
        >
          <Header />
          <TanstackProvider>
            {children}
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
