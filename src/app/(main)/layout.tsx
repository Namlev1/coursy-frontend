import Navbar from '@/components/sections/header/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      {/*<FooterSection />*/}
    </div>
  );
}
