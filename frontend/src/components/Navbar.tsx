import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-black text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Brand section with blue background */}
        <div className="bg-blue-600 rounded-lg px-4 py-2">
          <div className="flex items-center space-x-2">
          
            <span className="text-xl font-semibold">Exibeat</span>
          </div>
        </div>
        
        {/* Navigation links */}
        <div className="flex space-x-6">
          <Link href="/producer" className="hover:text-blue-300 transition">Producer</Link>
          <Link href="/dj" className="hover:text-blue-300 transition">DJ</Link>
        </div>
      </div>
    </nav>
  );
}