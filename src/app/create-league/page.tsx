import Image from 'next/image';

export default function LeagueSetup() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold">Last Step!</h2>
        <p className="text-gray-600 text-sm mb-4">Configure league dues. You can always change them later.</p>
        
        <div className="flex justify-center my-4">
          <Image src="/images/icons/trophy.png" alt="Champions League" width={80} height={80} className="rounded-md" />
        </div>
        
        <h3 className="text-xl font-semibold">Champions League</h3>
        
        <div className="text-left mt-4">
          <label className="block text-gray-700 text-sm font-medium">Username</label>
          <input 
            type="text" 
            placeholder="username" 
            className="w-full p-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-left mt-4">
          <label className="block text-gray-700 text-sm font-medium">Dues / Team</label>
          <div className="relative">
            <input 
              type="number" 
              placeholder="100" 
              className="w-full p-2 pr-10 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-3 text-gray-500">💰</span>
          </div>
        </div>
        
        <button 
          className="w-full mt-6 text-white py-2 rounded-lg bg-gray-700 transition"
        >
          Create League Treasury
        </button>
        
        <p className="mt-4 text-gray-500 text-sm cursor-pointer hover:underline">Start Over?</p>
      </div>
    </div>
  );
}
