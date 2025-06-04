import Link from 'next/link';

export default function Home() {
  return (
    <div className="text-center py-32">
      <h1 className="text-4xl font-bold mb-6">Track Feedback App</h1>
      <p className="text-gray-600 mb-6">Choose your role:</p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/producer"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Producer
        </Link>
        <Link
          href="/dj"
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          DJ
        </Link>
      </div>
    </div>
  );
}
