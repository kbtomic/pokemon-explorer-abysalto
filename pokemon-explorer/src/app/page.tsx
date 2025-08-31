import HeroBanner from '@/components/home/HeroBanner';
import PowerfulFeatures from '@/components/home/PowerfulFeatures';
import { Footer } from '@/components/home/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <PowerfulFeatures />
      <Footer />
    </div>
  );
}
