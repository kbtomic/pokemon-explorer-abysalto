import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { ButtonSize } from '@/types/enums';

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
      {/* Animated Background Gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-400/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-bl from-pink-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-t from-yellow-400/30 to-transparent rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-bounce"
            style={{
              left: `${(i * 5.5) % 100}%`,
              top: `${(i * 3.7) % 100}%`,
              animationDelay: `${(i * 0.2) % 3}s`,
              animationDuration: `${3 + (i % 2)}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Glassmorphism Pokemon Ball */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative group">
          {/* Main Pokemon Ball with Glassmorphism */}
          <div className="relative animate-[spin_20s_linear_infinite]">
            {/* Top half with glass effect */}
            <div className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 lg:w-96 lg:h-48 bg-gradient-to-b from-white/90 to-white/70 rounded-t-full border-2 sm:border-4 border-gray-800/80 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent rounded-t-full"></div>
            </div>
            {/* Bottom half with glass effect */}
            <div className="w-48 h-24 sm:w-64 sm:h-32 md:w-80 md:h-40 lg:w-96 lg:h-48 bg-gradient-to-t from-red-500/90 to-red-600/70 rounded-b-full border-2 sm:border-4 border-gray-800/80 border-t-0 backdrop-blur-sm shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-red-400/40 to-transparent rounded-b-full"></div>
            </div>
            {/* Center circle with glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-full border-2 sm:border-4 border-gray-800 flex items-center justify-center shadow-2xl">
              <div className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gray-800 rounded-full shadow-inner"></div>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-ping"></div>
            </div>
            {/* Center line with glow */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 sm:h-1 bg-gray-800/80 transform -translate-y-1/2 shadow-lg"></div>
          </div>

          {/* Outer glow ring */}
          <div className="absolute inset-0 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 blur-xl animate-pulse"></div>
        </div>
      </div>

      {/* Glassmorphism Content Overlay */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center">
          {/* Glassmorphism Card for Content */}
          <div className="inline-block backdrop-blur-md bg-white/10 rounded-xl sm:rounded-2xl border border-white/20 shadow-2xl p-4 sm:p-6 md:p-8 mb-4 sm:mb-6 md:mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-4 sm:mb-6 drop-shadow-2xl bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
              Pokemon Explorer
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed font-medium px-2">
              Discover the ultimate Pokemon database with advanced filtering, detailed statistics, and comprehensive information.
            </p>
            <Link href="/explorer">
              <Button
                size={ButtonSize.LG}
                className="relative overflow-hidden bg-gradient-to-r from-white/90 to-white/80 hover:from-white hover:to-gray-100 text-red-600 hover:text-red-700 px-4 sm:px-6 md:px-8 lg:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg lg:text-xl font-bold shadow-2xl hover:shadow-2xl transition-all duration-300 border border-white/30 backdrop-blur-sm group cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mr-2 sm:mr-3 group-hover:scale-110 transition-transform duration-300" />
                Start Exploring
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
