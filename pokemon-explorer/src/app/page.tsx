import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Pokemon Explorer</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore the world of Pokemon with advanced filtering, search, and sorting capabilities. Discover your favorite Pokemon and learn
            about their stats, types, and abilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">🔍 Advanced Filtering</CardTitle>
              <CardDescription>Filter Pokemon by type, generation, stats, and abilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Find exactly the Pokemon you&apos;re looking for with our comprehensive filtering system.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📊 Detailed Stats</CardTitle>
              <CardDescription>View comprehensive Pokemon statistics and information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Explore detailed stats, abilities, and evolution chains for every Pokemon.
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">📱 Responsive Design</CardTitle>
              <CardDescription>Optimized for all devices and screen sizes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enjoy a seamless experience on desktop, tablet, and mobile devices.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <Link href="/explorer">
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              Start Exploring
            </Button>
          </Link>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Built with Modern Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">Next.js 15</span>
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 rounded-full">React 19</span>
            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-cyan-100 dark:bg-cyan-900 rounded-full">Tailwind CSS</span>
            <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 rounded-full">Zustand</span>
            <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900 rounded-full">React Query</span>
          </div>
        </div>
      </div>
    </div>
  );
}
