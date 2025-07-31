import { headers } from 'next/headers'
import { getTenantConfig } from '@/lib/mock-data'
import { SectionComponents } from '@/components/sections'

export default async function HomePage() {
  const headersList = headers()
  const tenantId = headersList.get('x-tenant-id') || 'coursy'

  // Get tenant configuration (in real app, this calls COURSY-PLATFORMS API)
  const tenantConfig = await getTenantConfig(tenantId)

  if (!tenantConfig) {
    return <div>Tenant not found</div>
  }

  // Generate CSS variables for theming
  const cssVariables = {
    '--primary-color': tenantConfig.branding.primaryColor,
    '--text-primary': tenantConfig.branding.textPrimary,
    '--text-secondary': tenantConfig.branding.textSecondary,
    '--background-light': tenantConfig.branding.backgroundLight,
    '--border-color': tenantConfig.branding.borderColor
  }

  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{tenantConfig.name} - Empower Your Organization</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap" rel="stylesheet" />
      <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
      <style dangerouslySetInnerHTML={{
        __html: `
            :root {
              --primary-color: ${tenantConfig.branding.primaryColor};
              --text-primary: ${tenantConfig.branding.textPrimary};
              --text-secondary: ${tenantConfig.branding.textSecondary};
              --background-light: ${tenantConfig.branding.backgroundLight};
              --border-color: ${tenantConfig.branding.borderColor};
            }
            body {
              font-family: 'Inter', sans-serif;
            }
          `
      }} />
    </head>
    <body className="bg-white">
    <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {tenantConfig.homePageTemplate.sections
          .sort((a, b) => a.order - b.order)
          .map((section, index) => {
            const Component = SectionComponents[section.type as keyof typeof SectionComponents]

            if (!Component) {
              console.warn(`Unknown section type: ${section.type}`)
              return null
            }

            return (
              <Component
                key={index}
                {...section.props}
                theme={tenantConfig.branding}
              />
            )
          })}
      </div>
    </div>
    </body>
    </html>
  )
}