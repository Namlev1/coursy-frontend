import NavbarSection from '@/components/sections/navbar/NavbarSection';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarSection />
      <main>{children}</main>
      {/*<FooterSection />*/}
    </div>
  );
}
