import RequirementsPanel from './components/RequirementsPanel';
import SchemaPanel from './components/SchemaPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-2xl font-bold text-gray-900">Schema Drafter</h1>
        <p className="text-sm text-gray-500 mt-0.5">
          문서를 업로드하여 요구사항 분석 및 DB 스키마를 자동 생성합니다.
        </p>
      </header>
      <main className="mx-auto max-w-3xl space-y-6 px-4 py-8">
        <RequirementsPanel />
        <SchemaPanel />
      </main>
    </div>
  );
}

export default App;
