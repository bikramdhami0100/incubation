// components/common/Logo.tsx
import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark';
}

const Logo: React.FC<LogoProps> = ({ variant = 'light' }) => {
  const isLight = variant === 'light';

  return (
    <Link href="/" className="flex items-center space-x-3 group">
      {/* Logo container with glow effect */}
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full opacity-0 group-hover:opacity-70 blur-md transition-opacity duration-300"></div>

        {/* Logo image */}
        <div className="relative h-12 w-12 bg-gradient-to-br from-indigo-100 to-white p-0.5 rounded-full overflow-hidden border border-indigo-100 shadow-md group-hover:shadow-indigo-300/50 transition-all duration-300 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10 rounded-full group-hover:opacity-0 transition-opacity duration-300"></div>
          <div className="h-full w-full rounded-full overflow-hidden">
            <Image
              src="/circlelogo.png"
              alt="Far Western University Logo"
              width={48}
              height={48}
              className="object-contain transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Text content */}
      <div className=" flex-col hidden md:block lg:block">
        {isLight ? (
          <>
            {/* Light variant */}
            <div className="relative ">
              <span className="text-xl font-bold  transition-colors leading-tight">
                Far Western University
              </span>
              {/* Animated underline on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-blue-500 group-hover:w-full transition-all duration-500 ease-out"></span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-black  transition-colors">
                <span className="text-indigo-500 font-medium">Incubation</span> Center
              </span>
              {/* Animated dot */}
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
            </div>
          </>
        ) : (
          <>
            {/* Dark variant */}
            <div className="relative">
              <span className="text-xl font-bold text-white group-hover:text-indigo-200 transition-colors leading-tight">
                Far Western University
              </span>
              {/* Animated underline on hover */}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-400 to-blue-400 group-hover:w-full transition-all duration-500 ease-out"></span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-indigo-200 group-hover:text-white transition-colors">
                <span className="text-indigo-300 font-medium">Incubation</span> Center
              </span>
              {/* Animated dot */}
              <span className="ml-1 w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Logo;