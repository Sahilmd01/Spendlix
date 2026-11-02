import React from "react";

const InfoCard = ({ 
  icon, 
  label, 
  value, 
  color = "bg-indigo-500",
  currency = "₹", 
  loading = false,
  trend = null, // 'up', 'down', or null
  trendValue = null,
  onClick = null
}) => {
  // Trend colors and icons
  const trendConfig = {
    up: {
      color: "text-emerald-500",
      icon: "↑",
      bg: "bg-emerald-50"
    },
    down: {
      color: "text-rose-500",
      icon: "↓",
      bg: "bg-rose-50"
    }
  };

  return (
    <div 
      className={`
        flex gap-5 p-5 rounded-lg 
        bg-[var(--surface)]
        border border-[var(--border-default)]
        transition-all duration-200
        ${onClick ? "cursor-pointer hover:bg-[var(--surface-hover)]" : ""}
        relative overflow-hidden
      `}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-br from-${color.split('-')[1]}-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
      
      {/* Icon container with subtle shadow */}
      <div
        className={`
          w-14 h-14 flex items-center justify-center 
          text-[26px] text-white 
          ${color} rounded-xl 
          shadow-lg shadow-${color.split('-')[1]}-200/50
          transition-all duration-300
          group-hover:rotate-6 group-hover:scale-110
          flex-shrink-0
        `}
      >
        {icon}
      </div>
      
      <div className="flex flex-col justify-center">
        <h6 className="text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
          {label}
        </h6>
        
        {loading ? (
          <div className="h-7 w-32 bg-gray-100 rounded-md animate-pulse"></div>
        ) : (
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-semibold text-gray-800">
              {currency}{value.toLocaleString()}
            </span>
            
            {trend && (
              <span className={`
                text-xs px-2 py-1 rounded-full flex items-center gap-1
                ${trendConfig[trend].color} ${trendConfig[trend].bg}
              `}>
                {trendConfig[trend].icon} {trendValue}%
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;