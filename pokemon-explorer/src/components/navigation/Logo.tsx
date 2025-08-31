import Link from 'next/link';
import Image from 'next/image';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src="/favicon.svg" alt="Pokemon Explorer" width={32} height={32} className="w-8 h-8" priority />
      <h1 className="text-xl sm:text-2xl font-bold text-red-600 cursor-pointer hover:text-red-700 transition-colors hidden lg:flex">
        Pokemon Explorer
      </h1>
    </Link>
  );
}
