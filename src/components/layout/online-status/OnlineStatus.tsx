export default function OnlineStatus() {
  return (
    <div className="relative flex items-center justify-center">
      <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping"></span>
      <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500"></span>
    </div>
  );
}
