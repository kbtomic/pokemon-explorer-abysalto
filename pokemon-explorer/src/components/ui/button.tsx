import { cn } from '@/lib/utils';
import { ButtonVariant, ButtonSize } from '@/types/enums';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  ref?: React.Ref<HTMLButtonElement>;
  typeColor?: string;
  isSelected?: boolean;
}

const Button = ({
  className,
  variant = ButtonVariant.DEFAULT,
  size = ButtonSize.DEFAULT,
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
            variant === ButtonVariant.DEFAULT,

          // Destructive variant - Modern red gradient
          'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg hover:shadow-xl hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === ButtonVariant.DESTRUCTIVE,

          // Outline variant - Modern border with red hover
          'border-2 border-gray-300 bg-white text-gray-900 shadow-sm hover:shadow-md hover:border-red-500 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === ButtonVariant.OUTLINE,

          // Secondary variant - Red gradient
          'bg-gradient-to-r from-red-100 to-red-200 text-red-900 shadow-sm hover:shadow-md hover:from-red-200 hover:to-red-300 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === ButtonVariant.SECONDARY,

          // Ghost variant - Red hover effects
          'text-gray-700 hover:text-red-600 hover:bg-red-50 transform hover:scale-[1.02] active:scale-[0.98]':
            variant === ButtonVariant.GHOST,

          // Link variant - Red underline
          'text-red-600 underline-offset-4 hover:underline hover:text-red-700 transform hover:scale-[1.02]': variant === ButtonVariant.LINK,

          // Type variant - Dynamic type colors
          'border-2 border-gray-300 bg-white text-gray-900 shadow-sm hover:shadow-md transform hover:scale-[1.02] active:scale-[0.98]':
            variant === ButtonVariant.TYPE,
        },
        {
          // Size variants
          'h-10 px-6 py-2': size === ButtonSize.DEFAULT,
          'h-9 px-4 py-1.5': size === ButtonSize.SM,
          'h-12 px-10 py-3 text-base': size === ButtonSize.LG,
          'h-10 w-10': size === ButtonSize.ICON,
        },
        variant === ButtonVariant.TYPE && {
          borderColor: typeColor || 'rgb(209 213 219)',
          color: typeColor ? 'white' : 'rgb(17 24 39)',
        },
        className
      )}
      style={variant === ButtonVariant.TYPE && typeColor ? { backgroundColor: isSelected ? typeColor : 'transparent' } : undefined}
      ref={ref}
      {...props}
    >
      {props.children}
      {variant === ButtonVariant.DESTRUCTIVE && (
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
    </Comp>
  );
};

export { Button };
