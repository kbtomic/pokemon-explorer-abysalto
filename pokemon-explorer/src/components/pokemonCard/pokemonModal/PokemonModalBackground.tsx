export function PokemonModalBackground() {
  return (
    <>
      {/* Modern gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-400/30 via-red-300/20 to-red-200/40 opacity-100 transition-all duration-700 ease-out" />
      <div className="absolute inset-0 bg-gradient-to-tl from-red-600/50 via-transparent to-transparent opacity-100 transition-all duration-1000 ease-out delay-200" />
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-400/20 opacity-100 transition-all duration-800 ease-out delay-100" />

      {/* Floating decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-red-400/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-8 left-6 w-16 h-16 bg-red-300/30 rounded-full blur-lg animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-4 w-12 h-12 bg-red-200/40 rounded-full blur-md animate-pulse delay-500" />
    </>
  );
}
