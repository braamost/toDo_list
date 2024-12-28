import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import ContentSection from "./Components/ContentSection";
import { Datacontext } from "../main";
const MainPage = () => {
  const [isSidebar, setSidebar] = useState(true);
  const [activeSection, setActiveSection] = useState("compose");
  const navigate = useNavigate();
  const { user, setUser } = useContext(Datacontext);
  const toggleSidebar = () => {
    setSidebar(!isSidebar);
  };

  const navigateSection = (section) => {
    setActiveSection(section);
  };

  const onLogout = () => {
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isSidebar={isSidebar}
        toggleSidebar={toggleSidebar}
        activeSection={activeSection}
        navigateSection={navigateSection}
        onLogout={onLogout}
      />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6 min-h-[calc(100vh-4rem)]">
          {user.categories &&
            user.categories.map(
              (c) =>
                activeSection === c.name && (
                  <ContentSection
                    key={c.categoryId} // Add a key prop
                    category={c}
                  >
                    <div className="text-gray-600">
                      Your messages will appear here
                    </div>
                  </ContentSection>
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
