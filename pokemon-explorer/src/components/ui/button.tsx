import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
}

const Button = ({ className, variant = 'default', size = 'default', asChild = false, ref, ...props }: ButtonProps) => {
  const Comp = asChild ? 'span' : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group',
        {
          // Default variant - Modern gradient with enhanced hover
          'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'default',

          // Destructive variant - Modern red gradient
          'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'destructive',

          // Outline variant - Modern border with gradient hover
          'border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm hover:shadow-md hover:border-blue-500 dark:hover:border-blue-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 dark:hover:from-blue-900/20 dark:hover:to-blue-800/20 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'outline',

          // Secondary variant - Subtle gradient
          'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 text-gray-900 dark:text-white shadow-sm hover:shadow-md hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-700 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'secondary',

          // Ghost variant - Enhanced hover effects
          'hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-800 hover:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'ghost',

          // Link variant - Enhanced underline
          'text-blue-600 dark:text-blue-400 underline-offset-4 hover:underline hover:text-blue-700 dark:hover:text-blue-300 transform hover:scale-[1.02]':
            variant === 'link',
        },
        {
          'h-10 px-6 py-2': size === 'default',
          'h-9 px-4 py-1.5': size === 'sm',
          'h-12 px-10 py-3 text-base': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        className
      )}
      ref={ref}
      {...props}
    >
      {/* Subtle shine effect for default and destructive variants */}
      {(variant === 'default' || variant === 'destructive') && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
      {props.children}
    </Comp>
  );
};

export { Button };
