import React from "react";

const Logo: React.FC<{ size?: number }> = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Noisy bars left */}
    <rect x="2" y="30" width="5" height="22" rx="1.5" fill="#f43f5e" opacity="0.4"/>
    <rect x="10" y="22" width="5" height="38" rx="1.5" fill="#f43f5e" opacity="0.4"/>
    <rect x="18" y="35" width="5" height="12" rx="1.5" fill="#f43f5e" opacity="0.4"/>
    <rect x="26" y="18" width="5" height="44" rx="1.5" fill="#f43f5e" opacity="0.4"/>

    {/* Center lens */}
    <circle cx="50" cy="50" r="16" fill="#4f8eff" opacity="0.15"/>
    <circle cx="50" cy="50" r="16" stroke="#4f8eff" stroke-width="1.5" opacity="0.8"/>
    <circle cx="50" cy="50" r="10" stroke="#4f8eff" stroke-width="1" opacity="0.5"/>
    <circle cx="50" cy="50" r="3" fill="#4f8eff"/>
    <circle cx="50" cy="34" r="2" fill="#7c3aed"/>
    <circle cx="50" cy="66" r="2" fill="#7c3aed"/>

    {/* Clean bars right */}
    <rect x="69" y="38" width="5" height="24" rx="1.5" fill="#10b981" opacity="0.9"/>
    <rect x="77" y="34" width="5" height="32" rx="1.5" fill="#10b981" opacity="0.9"/>
    <rect x="85" y="38" width="5" height="24" rx="1.5" fill="#10b981" opacity="0.9"/>
    <rect x="93" y="34" width="5" height="32" rx="1.5" fill="#10b981" opacity="0.9"/>
  </svg>
);

export default Logo;