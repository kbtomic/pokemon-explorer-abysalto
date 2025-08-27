import TechnologyBadge from './TechnologyBadge';

export default function Footer() {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-8 sm:py-10 md:py-12 mt-8 sm:mt-12 md:mt-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Contact */}
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            {/* Logo Icon */}
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            {/* Contact Info */}
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-bold">Pokemon Explorer</h3>
              <p className="text-red-100 text-xs sm:text-sm">
                Contact:{' '}
                <a href="mailto:klarabrunatomic@gmail.com" className="hover:text-white transition-colors">
                  klarabrunatomic@gmail.com
                </a>
              </p>
              <p className="text-red-200 text-xs mt-1">Made with ❤️ for Pokemon fans</p>
            </div>
          </div>

          {/* Technology Badges */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
            <TechnologyBadge technology="Next.js 15" />
            <TechnologyBadge technology="React 19" />
            <TechnologyBadge technology="TypeScript" />
            <TechnologyBadge technology="Tailwind CSS" />
            <TechnologyBadge technology="PokeAPI" />
          </div>
        </div>
      </div>
    </div>
  );
}
