import FeatureCard from './FeatureCard';
import { features } from '@/lib/data/features';

export default function PowerfulFeatures() {
  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600 mb-2 sm:mb-3 md:mb-4">Powerful Features</h2>
          <p className="text-sm sm:text-base md:text-lg text-red-500">Everything you need to explore the Pokemon world</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgColor={feature.iconBgColor}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
