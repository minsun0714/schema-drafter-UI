import React, { useRef, useState } from 'react';

interface Props {
  onFileChange: (file: File | null) => void;
  accept?: string;
  label?: string;
}

const FileInput: React.FC<Props> = ({ onFileChange, accept = '.pdf,.xlsx', label = '파일 선택' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file ? file.name : '');
    onFileChange(file);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
      >
        {label}
      </button>
      <span className="text-sm text-gray-500 truncate max-w-xs">
        {fileName || '파일이 선택되지 않았습니다'}
      </span>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
    </div>
  );
};

export default FileInput;
