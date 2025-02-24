export default function LeagueCreated() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold">League Created 🎉</h2>
        <p className="text-gray-600 text-sm mb-4">The Champions League has been immortalized onchain</p>
        
        <button 
          className="w-full mt-6 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
        >
          Invite Teams
        </button>
        
        <p className="mt-4 text-gray-500 text-sm cursor-pointer hover:underline">League Dashboard</p>
      </div>
    </div>
  );
}
