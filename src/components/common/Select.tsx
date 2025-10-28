import { ChangeEvent } from 'react'

interface SelectProps {
  label: string
  options: string[] | { value: string; label: string }[]  // ← 타입 수정
  value: string
  onChange: (value: string) => void
  error?: string
  placeholder?: string
  required?: boolean
}

export default function Select({
  label,
  options,
  value,
  onChange,
  error,
  placeholder = '선택하세요',
  required = false,
}: SelectProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {  // ← e 타입 명시
    onChange(e.target.value)
  }

  const isObjectArray = options.length > 0 && typeof options[0] === 'object'

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={handleChange}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {isObjectArray
          ? (options as { value: string; label: string }[]).map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          : (options as string[]).map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
      </select>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  )
}