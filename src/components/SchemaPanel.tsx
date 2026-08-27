import React, { useState } from 'react';
import { fetchDesignDocument, type DesignDocumentResponse } from '../api/designApi';
import FileInput from './FileInput';

const SchemaPanel: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DesignDocumentResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'requirements' | 'analysis' | 'schema'>('requirements');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await fetchDesignDocument(file);
      setResult(data);
      setActiveTab('requirements');
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const tabs: { key: 'requirements' | 'analysis' | 'schema'; label: string }[] = [
    { key: 'requirements', label: '요구사항 Markdown' },
    { key: 'analysis', label: '분석 결과' },
    { key: 'schema', label: 'DB 스키마' },
  ];

  const getTabContent = () => {
    if (!result) return null;
    if (activeTab === 'requirements') {
      return (
        <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
          {result.requirementsMarkdown}
        </pre>
      );
    }
    const data = activeTab === 'analysis' ? result.analysis : result.schema;
    return (
      <pre className="whitespace-pre-wrap break-words text-sm text-gray-700">
        {JSON.stringify(data, null, 2)}
      </pre>
    );
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-1 text-lg font-semibold text-gray-800">
        🗄️ 문서 → DB 설계 JSON
      </h2>
      <p className="mb-5 text-sm text-gray-500">
        .pdf 또는 .xlsx 파일을 업로드하면 요구사항 분석 및 DB 스키마 설계 결과를 반환합니다.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FileInput onFileChange={setFile} />

        <button
          type="submit"
          disabled={!file || loading}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              분석 중...
            </>
          ) : (
            '분석 실행'
          )}
        </button>

        {error && (
          <div className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 border border-red-200">
            ⚠️ {error}
          </div>
        )}
      </form>

      {result && (
        <div className="mt-6">
          <div className="flex border-b border-gray-200 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-t-lg ${
                  activeTab === tab.key
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-gray-50 p-4 max-h-96 overflow-auto border border-gray-200">
            {getTabContent()}
          </div>
        </div>
      )}
    </section>
  );
};

export default SchemaPanel;
