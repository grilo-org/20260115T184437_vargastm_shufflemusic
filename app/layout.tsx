import './globals.css'

import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import type { ReactNode } from 'react'

import NavigationMenu from '@/components/NavigationMenu'

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter-tight',
})

export const metadata: Metadata = {
  title: 'Shuffle Music',
  description: 'Shuffle Music',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${interTight.variable} font-sans antialiased`}>
        <NavigationMenu />
        {children}
      </body>
    </html>
  )
}
