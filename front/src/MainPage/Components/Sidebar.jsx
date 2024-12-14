import SidebarButton from "./SidebarButton";
import React from "react";
import { Mail, Trash2, Users, LogOut, Send, Menu, X,MessageCircle,PlusIcon,TrashIcon } from "lucide-react";

const Sidebar = ({
  isSidebar,
  toggleSidebar,
  activeSection,
  navigateSection,
  onLogout,
}) => {
  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 flex ${
        isSidebar ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 h-full w-full relative">
        <div className="flex items-center justify-between mb-8">
          <h2
            className={`font-bold text-xl text-gray-800 ${
              !isSidebar && "hidden"
            }`}
          >
            Categories
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            {isSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isSidebar && (
          <div className="space-y-2">
            <SidebarButton
              
              label="home"
              onClick={() => navigateSection("home")}
              active={activeSection === "home"}
            />

            <nav className="mt-8 space-y-2">
              <SidebarButton
               
                label="work"
                active={activeSection === "work"}
                onClick={() => navigateSection("work")}
              />

              <SidebarButton
                
                label="gym"
                active={activeSection === "gym"}
                onClick={() => navigateSection("gym")}
              />
   <div className="min-w-full min-h-full ">
  <button 
    className="
      bg-green-500 
      hover:bg-green-600 
      text-white 
      p-3 
      rounded-full 
      shadow-lg 
      transition 
      duration-300 
      ease-in-out 
      hover:scale-110 
      fixed
      right-12
      bottom-20
    "
  >
    <PlusIcon className="w-full h-full" />
  </button>

  <button 
    className="
      bg-red-500 
      hover:bg-red-600 
      text-white 
      p-3 
      rounded-full 
      shadow-lg 
      transition 
      duration-300 
      ease-in-out 
      hover:scale-110 
      fixed
      left-80
      bottom-20
    "
  >
    <TrashIcon className="w-full h-full" />
  </button>
</div>
            

             
            </nav>

            <div className="absolute bottom-4 w-56">
              <SidebarButton
                icon={LogOut}
                label="Log out"
                onClick={onLogout}
                variant="danger"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
