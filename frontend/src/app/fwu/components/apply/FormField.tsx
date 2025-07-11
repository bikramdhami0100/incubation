// components/apply/FormField.tsx
import { UseFormRegister, FieldError, Path } from 'react-hook-form';

interface FormValues {
  applicantName: string;
  email: string;
  phone: string;
  teamMembers: { name: string; role: string }[];
  startupIdea: string;
  proposalFile?: FileList;
}

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface FormFieldProps<T extends InputProps | TextareaProps> {
  type: T extends InputProps ? React.HTMLInputTypeAttribute : 'textarea';
  name: Path<FormValues>; // Strongly typed name
  label: string;
  register: UseFormRegister<FormValues>;
  error?: FieldError;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  as?: 'input' | 'textarea';
  rows?: number; // for textarea
  accept?: string; // for file input
}

const FormField = <T extends InputProps | TextareaProps>({
  type,
  name,
  label,
  register,
  error,
  placeholder,
  isRequired = false,
  className = '',
  as = 'input',
  rows,
  accept,
}: FormFieldProps<T>) => {
  const commonProps = {
    id: name,
    placeholder,
    className: `w-full px-4 py-3 border-2 ${
      error ? 'border-red-300 bg-red-50' : 'border-gray-200 focus:border-blue-300'
    } rounded-lg ${
      error ? 'focus:ring-red-200' : 'focus:ring-blue-100'
    } focus:ring-4 outline-none transition-all ${className}`,
    ...register(name),
  };

  return (
    <div className="mb-6">
      <label htmlFor={name} className="flex items-center text-sm font-medium text-gray-700 mb-2">
        {label} {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
      {as === 'textarea' ? (
        <textarea {...commonProps} rows={rows} />
      ) : (
        <input type={type} {...commonProps} accept={accept} />
      )}
      {error && (
        <div className="mt-2 flex items-start text-sm text-red-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 mt-0.5 mr-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <span>{error.message}</span>
        </div>
      )}
    </div>
  );
};

export default FormField;