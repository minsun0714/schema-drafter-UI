import React, { useState } from 'react';
import { fetchRequirementsMarkdown } from '../api/designApi';
import FileInput from './FileInput';

const RequirementsPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const blob = await fetchRequirementsMarkdown(file);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const baseName = file.name.replace(/\.[^.]+$/, '');
      a.href = url;
      a.download = `${baseName}-requirements.md`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-gray-800">
        📄 요구사항 문서 → REQ Markdown 다운로드
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        .pdf 또는 .xlsx 파일을 업로드하면 REQ-001 형식의 Markdown 파일을 다운로드합니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput onFileChange={setFile} />

        <button
          type="submit"
          disabled={!file || loading}
          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              변환 중...
            </>
          ) : (
            '다운로드'
          )}
        </button>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div className="rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700 border border-green-200">
            ✅ Markdown 파일이 다운로드되었습니다.
          </div>
        )}
      </form>
    </section>
  );
};

export default RequirementsPanel;
