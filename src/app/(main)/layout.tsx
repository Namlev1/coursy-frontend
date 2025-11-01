import NavbarSection from '@/components/sections/navbar/NavbarSection';
import FooterSection from '@/components/sections/footer/FooterSection';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarSection />
      <main className={'flex-1 flex flex-col'}>{children}</main>
      <FooterSection />
    </div>
  );
}
