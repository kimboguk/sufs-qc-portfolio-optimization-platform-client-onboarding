// src/components/common/Select.tsx

interface SelectProps {
  label?: string
  options: string[]
  value?: string
  onChange: (value: string) => void
  multiple?: boolean
  type?: 'radio' | 'checkbox' | 'select'
}

export function Select({
  label,
  options,
  value,
  onChange,
  multiple = false,
  type = 'radio'
}: SelectProps) {
  return (
    <div className="space-y-2">
      {label && <label className="block font-medium text-gray-700">{label}</label>}
      
      {type === 'checkbox' && (
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                defaultChecked={value?.includes(option)}
                onChange={(e) => {
                  // 복수선택 로직
                }}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === 'radio' && (
        <div className="space-y-2">
          {options.map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={label}
                value={option}
                checked={value === option}
                onChange={(e) => onChange(e.target.value)}
                className="mr-2"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      )}

      {type === 'select' && (
        <select
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2"
        >
          <option value="">선택해주세요</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}