const SidebarButton = ({  label, active, onClick, variant = "default" }) => {
    const baseStyles = "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2";
    
    const variants = {
      default: active 
        ? "bg-pink-500 text-pink-100" 
        : "text-gray-700 hover:bg-pink-600",
      
      danger: "text-red-600 hover:bg-red-50"
    };
  
    return (
      <button 
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
      >
        
        {label}
      </button>
    );
  };
  export default SidebarButton;