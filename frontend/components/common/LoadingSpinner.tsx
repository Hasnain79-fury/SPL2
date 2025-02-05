// components/common/LoadingSpinner.tsx
export default function LoadingSpinner() {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#04AA6D]"></div>
        <span className="ml-2">{BANGLA_TEXT.common.loading}</span>
      </div>
    );
  }
  
  // components/common/ErrorMessage.tsx
  interface ErrorMessageProps {
    message: string;
  }
  
  export default function ErrorMessage({ message }: ErrorMessageProps) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        {message}
      </div>
    );
  }
  