import TechnologyBadge from './TechnologyBadge';
import { TechnologyName } from '@/types/enums';

export function Footer() {
  return (
    <footer className="bg-white border-t border-red-200 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Built with Modern Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <TechnologyBadge technology="Next.js" />
            <TechnologyBadge technology="React" />
            <TechnologyBadge technology={TechnologyName.TYPESCRIPT} />
            <TechnologyBadge technology="Tailwind CSS" />
            <TechnologyBadge technology={TechnologyName.POKEAPI} />
          </div>
          <div className="text-left"></div>
          <p className="text-sm text-gray-600">© 2025 Pokemon Explorer. All Pokemon data provided by the PokeAPI.</p>
          <p className="text-gray-600 text-xs mt-1">Made with ❤️ for Pokemon fans</p>

          <p className="text-gray-600 text-xs">
            Contact: <a href="mailto:klarabrunatomic@gmail.com">klarabrunatomic@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
