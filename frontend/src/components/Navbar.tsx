import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-white text-blue-600 font-bold text-xl px-3 py-1 rounded">
            EXI
          </div>
          <span className="text-xl font-semibold">Exibeat</span>
        </div>
        <div className="bg-black text-white px-4 py-2 rounded-lg">
          <div className="flex space-x-6">
            <Link href="/producer" className="hover:text-blue-300 transition">Producer</Link>
            <Link href="/dj" className="hover:text-blue-300 transition">DJ</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

