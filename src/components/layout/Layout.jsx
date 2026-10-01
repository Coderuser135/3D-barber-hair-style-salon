import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import MobileHeader from '@/components/navigation/MobileHeader';
import BottomNav from '@/components/navigation/BottomNav';
import DesktopNav from '@/components/navigation/DesktopNav';
import MoreSheet from '@/components/navigation/MoreSheet';
import WhatsAppButton from '@/components/common/WhatsAppButton';

export default function Layout() {
  const [moreOpen, setMoreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-ink-950">
      <MobileHeader onMore={() => setMoreOpen(true)} />
      <DesktopNav />

      <main className="pb-20 lg:pb-0 lg:pt-16">
        <Outlet />
      </main>

      <BottomNav onMore={() => setMoreOpen(true)} />
      <MoreSheet isOpen={moreOpen} onClose={() => setMoreOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
