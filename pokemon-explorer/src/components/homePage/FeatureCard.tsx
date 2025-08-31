import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Feature } from '@/types/ui/features';

export default function FeatureCard({ icon: Icon, title, description, iconBgColor, iconColor }: Feature) {
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-red-200 hover:border-red-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className={`p-2 ${iconBgColor} rounded-lg`}>
            <Icon className={`w-6 h-6 ${iconColor}`} />
          </div>
          <CardTitle className="text-red-600 text-sm sm:text-base md:text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xs sm:text-sm md:text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
