const SidebarButton = ({ icon: Icon, label, active, onClick, variant = "default" }) => {
    const baseStyles = "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2";
    
    const variants = {
      default: active 
        ? "bg-pink-50 text-pink-600" 
        : "text-gray-700 hover:bg-gray-100",
      primary: "bg-pink-600 text-white hover:bg-pink-1000",
      danger: "text-red-600 hover:bg-red-50"
    };
  
    return (
      <button 
        onClick={onClick}
        className={`${baseStyles} ${variants[variant]}`}
      >
        <Icon size={20} />
        {label}
      </button>
    );
  };
  export default SidebarButton;