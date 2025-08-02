export default function ResultContent({
  result,
  loading,
}: {
  result: string | null;
  loading: boolean;
}) {
  if (loading) return <p className="text-center p-4">⏳ Tailoring your resume...</p>;
  if (!result) return <p className="text-center p-4">No result available.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">🎯 Tailored Resume</h2>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{result}</pre>
    </div>
  );
}
