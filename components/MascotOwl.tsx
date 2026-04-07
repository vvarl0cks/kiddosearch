export default function MascotOwl({ className = "" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="40" fill="#0D9488" />
      <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50C90 27.9086 72.0914 10 50 10Z" fill="#0D9488"/>
      <circle cx="35" cy="45" r="15" fill="white" />
      <circle cx="65" cy="45" r="15" fill="white" />
      <circle cx="35" cy="45" r="6" fill="#1E293B" />
      <circle cx="65" cy="45" r="6" fill="#1E293B" />
      <path d="M45 60L50 68L55 60H45Z" fill="#FBBF24" />
      <path d="M20 70C20 70 30 85 50 85C70 85 80 70 80 70" stroke="white" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="32" cy="42" r="3" fill="white" />
      <circle cx="62" cy="42" r="3" fill="white" />
    </svg>
  );
}
