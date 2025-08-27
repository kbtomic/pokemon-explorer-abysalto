import HeroBanner from '@/components/homePage/HeroBanner';
import PowerfulFeatures from '@/components/homePage/PowerfulFeatures';
import Footer from '@/components/homePage/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroBanner />
      <PowerfulFeatures />
      <Footer />
    </div>
  );
}
