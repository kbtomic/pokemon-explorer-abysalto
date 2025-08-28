import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'type';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  typeColor?: string;
  isSelected?: boolean;
}

const Button = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ref,
  typeColor,
  isSelected,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? 'span' : 'button';

  return (
    <Comp
      className={cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden group cursor-pointer',
        {
          // Default variant - White background with red border and text
          'bg-white border-2 border-red-600 text-red-600 shadow-sm hover:shadow-md hover:bg-red-50 hover:border-red-700 hover:text-red-700 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'default',

          // Destructive variant - Modern red gradient
          'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'destructive',

          // Outline variant - Modern border with red hover
          'border-2 border-gray-300 bg-white text-gray-900 shadow-sm hover:shadow-md hover:border-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'outline',

          // Secondary variant - Red gradient
          'bg-gradient-to-r from-red-100 to-red-200 text-red-900 shadow-sm hover:shadow-md hover:from-red-200 hover:to-red-300 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'secondary',

          // Ghost variant - Red hover effects
          'hover:bg-gradient-to-r hover:from-red-100 hover:to-red-200 hover:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]':
            variant === 'ghost',

          // Link variant - Red underline
          'text-red-600 underline-offset-4 hover:underline hover:text-red-700 transform hover:scale-[1.02]': variant === 'link',

          // Type variant - Pokemon type filter buttons
          'flex items-center justify-center px-3 py-2 rounded-md text-sm font-medium transition-colors border transform hover:scale-[1.02]':
            variant === 'type',
        },
        {
          'h-10 px-6 py-2': size === 'default',
          'h-9 px-4 py-1.5': size === 'sm',
          'h-12 px-10 py-3 text-base': size === 'lg',
          'h-10 w-10': size === 'icon',
        },
        // Type variant specific styling
        variant === 'type' && {
          'text-white  shadow-sm': isSelected,
          'text-gray-700 border-gray-200 hover:bg-red-50 hover:border-red-300': !isSelected,
        },
        className
      )}
      ref={ref}
      style={variant === 'type' && typeColor ? { backgroundColor: isSelected ? typeColor : 'transparent' } : undefined}
      {...props}
    >
      {/* Subtle shine effect for destructive variant only */}
      {variant === 'destructive' && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
      {props.children}
    </Comp>
  );
};

export { Button };
