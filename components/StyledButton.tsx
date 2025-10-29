import React from 'react';

interface StyledButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function StyledButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  onClick,
  className = ''
}: StyledButtonProps) {
  
  const baseClasses = `
    inline-flex items-center justify-center font-medium
    transition-all duration-200 ease-calm
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    active:translate-y-[1px]
  `;

  const variantClasses = {
    primary: `
      bg-black text-white border border-black
      hover:bg-neutral-800 hover:border-neutral-800
      focus:ring-neutral-500
    `,
    secondary: `
      bg-neutral-100 text-neutral-800 border border-neutral-200
      hover:bg-neutral-200 hover:border-neutral-300
      focus:ring-neutral-400
    `,
    accent: `
      border border-black/10
      focus:ring-2 focus:ring-offset-2
    `
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-xl',
    md: 'px-6 py-3 text-base rounded-xl', 
    lg: 'px-8 py-4 text-lg rounded-2xl'
  };

  const widthClasses = fullWidth ? 'w-full' : '';

  const accentStyles = variant === 'accent' ? {
    background: 'var(--accent)',
    color: 'var(--accent-contrast)'
  } : {};

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      style={accentStyles}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${widthClasses}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-3 h-5 w-5" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
}
