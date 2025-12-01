// app/page.js
export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f5e6d3', fontFamily: "'Segoe Script', cursive" }}>
      {/* Your existing page content */}
      {/* Header with black line */}
      <div className="pt-4 sm:pt-6 md:pt-8 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-3 sm:mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-600 rounded-full"></div>
          </div>
          <div className="border-t-2 sm:border-t-3 md:border-t-4 border-black mb-6 sm:mb-8"></div>
        </div>
      </div>

      {/* Rest of your page content remains exactly the same */}
      {/* ... */}
    </div>
  );
}