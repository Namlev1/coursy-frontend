import React from 'react'

interface HeaderSectionProps {
  logoText: string
  navigation: Array<{ label: string; href: string }>
  theme: any
}

export default function HeaderSection({ logoText, navigation, theme }: HeaderSectionProps) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div
          className="flex items-center justify-between whitespace-nowrap border-b border-solid py-4"
          style={{ borderColor: theme.borderColor }}
        >
          <div className="flex items-center gap-3" style={{ color: theme.textPrimary }}>
            <div className="w-8 h-8" style={{ color: theme.primaryColor }}>
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold tracking-tight">{logoText}</h2>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <a
                key={item.label}
                className="text-sm font-medium transition-colors hover:opacity-80"
                style={{ color: theme.textSecondary }}
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              className="hidden sm:inline-flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-transparent text-sm font-bold transition-colors hover:bg-gray-100"
              style={{ color: theme.textPrimary }}
            >
              <span className="truncate">Login</span>
            </button>
            <button
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 text-white text-sm font-bold shadow-sm transition-all hover:opacity-90"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <span className="truncate">Get Started</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}