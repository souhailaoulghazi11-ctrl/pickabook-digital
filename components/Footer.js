export default function Footer() {
  return (
    <footer className="bg-[#FAF9F6] border-t border-gray-200 text-gray-700 pt-16 pb-12 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-xl font-serif tracking-widest text-gray-900 mb-4">PickaBook</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Curated eBooks, panoramic wall assets, manga, and language learning tools.
          </p>
        </div>

        {/* Column 2: Categories */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Categories</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#" className="hover:text-black">Health & Nutrition</a></li>
            <li><a href="#" className="hover:text-black">Personal Growth</a></li>
            <li><a href="#" className="hover:text-black">Languages & Learning</a></li>
            <li><a href="#" className="hover:text-black">Manga</a></li>
            <li><a href="#" className="hover:text-black">Papier peint panoramique</a></li>
            <li><a href="#" className="hover:text-black">Ciné-roman</a></li>
          </ul>
        </div>

        {/* Column 3: Navigation */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="/" className="hover:text-black">Home</a></li>
            <li><a href="/about" className="hover:text-black">About Us</a></li>
            <li><a href="#" className="hover:text-black">Shopify Developer Specs</a></li>
          </ul>
        </div>

        {/* Column 4: PickaBook Assurance */}
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">PickaBook Assurance</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Instant Secure Downloads</li>
            <li>Shopify Storefront Compatible</li>
            <li>High Resolution Formats</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <p>&copy; 2026 PickaBook. All rights reserved.</p>
        <p className="mt-4 md:mt-0">Read. Grow. Inspire.</p>
      </div>
    </footer>
  );
}