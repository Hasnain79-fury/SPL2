import React from 'react';
import { IconType } from 'react-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  success?: boolean;
  helperText?: string;
  prefixIcon?: IconType;
  suffixIcon?: IconType;
  fullWidth?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      success,
      helperText,
      prefixIcon: PrefixIcon,
      suffixIcon: SuffixIcon,
      fullWidth = false,
      disabled,
      className = '',
      id,
      ...props
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const baseInputStyles = `
      block
      rounded-md
      shadow-sm
      transition-colors
      focus:outline-none
      focus:ring-2
      focus:ring-offset-0
      ${fullWidth ? 'w-full' : ''}
      ${
        error
          ? 'border-red-300 focus:border-red-300 focus:ring-red-500'
          : success
          ? 'border-green-300 focus:border-green-300 focus:ring-green-500'
          : 'border-gray-300 focus:border-indigo-300 focus:ring-indigo-500'
      }
      ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''}
      ${PrefixIcon ? 'pl-10' : ''}
      ${SuffixIcon ? 'pr-10' : ''}
    `;

    return (
      <div className={`${fullWidth ? 'w-full' : ''} ${className}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {PrefixIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <PrefixIcon
                className={`h-5 w-5 ${
                  error
                    ? 'text-red-400'
                    : success
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}
              />
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={baseInputStyles}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={
              error || helperText ? `${inputId}-description` : undefined
            }
            {...props}
          />
          {SuffixIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <SuffixIcon
                className={`h-5 w-5 ${
                  error
                    ? 'text-red-400'
                    : success
                    ? 'text-green-400'
                    : 'text-gray-400'
                }`}
              />
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            id={`${inputId}-description`}
            className={`mt-1 text-sm ${
              error ? 'text-red-600' : 'text-gray-500'
            }`}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;