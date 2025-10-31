import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar/SideBar";
import "./Builder.css";

export default function Builder() {
  const location = useLocation();
  const navigate = useNavigate();
  const template = new URLSearchParams(location.search).get("template") || "classical";

  const [cvData, setCvData] = useState({
    personal: {
      name: "",
      email: "",
      phone: "",
      address: ""
    },
    experiences: [],
    educations: [],
    skills: [],
    summary: "",
    customSections: []
  });

  const [activeSection, setActiveSection] = useState("personal");
  const [showAddSectionModal, setShowAddSectionModal] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  // Load data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`cv-data-${template}`);
    if (savedData) {
      setCvData(JSON.parse(savedData));
    }
  }, [template]);

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(`cv-data-${template}`, JSON.stringify(cvData));
    }, 1000);
    return () => clearTimeout(timer);
  }, [cvData, template]);

  // Calculate completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      let totalFields = 4; // personal fields
      let filledFields = Object.values(cvData.personal).filter(v => v.trim()).length;

      totalFields += cvData.experiences.length > 0 ? 1 : 0;
      filledFields += cvData.experiences.length > 0 ? 1 : 0;

      totalFields += cvData.educations.length > 0 ? 1 : 0;
      filledFields += cvData.educations.length > 0 ? 1 : 0;

      totalFields += cvData.skills.length > 0 ? 1 : 0;
      filledFields += cvData.skills.length > 0 ? 1 : 0;

      totalFields += cvData.summary ? 1 : 0;
      filledFields += cvData.summary.trim() ? 1 : 0;

      return Math.round((filledFields / totalFields) * 100);
    };

    setCompletionPercentage(calculateCompletion());
  }, [cvData]);

  const updateCvData = (section, data) => {
    setCvData(prev => ({ ...prev, [section]: data }));
  };

  const handleSave = () => {
    localStorage.setItem(`cv-data-${template}`, JSON.stringify(cvData));
    alert("✅ CV saved successfully!");
  };

  const handleClear = () => {
    if (window.confirm("Clear all data? This cannot be undone.")) {
      setCvData({
        personal: { name: "", email: "", phone: "", address: "" },
        experiences: [],
        educations: [],
        skills: [],
        summary: "",
        customSections: []
      });
      localStorage.removeItem(`cv-data-${template}`);
    }
  };

  const handleExport = () => {
    window.print();
  };

  const handleChangeTemplate = () => {
    const newTemplate = template === "classical" ? "europass" : "classical";
    navigate(`/builder?template=${newTemplate}`);
  };

  return (
    <div className="builder-wrapper">
      <BuilderToolbar
        onSave={handleSave}
        onClear={handleClear}
        onExport={handleExport}
      />

      <ProgressBar percentage={completionPercentage} />

      <div className="builder-container">
        <Sidebar
          template={template}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          cvData={cvData}
          updateCvData={updateCvData}
          onChangeTemplate={handleChangeTemplate}
          onAddSection={() => setShowAddSectionModal(true)}
        />

        <PreviewPanel
          template={template}
          cvData={cvData}
        />
      </div>

      {showAddSectionModal && (
        <AddSectionModal
          onClose={() => setShowAddSectionModal(false)}
          onAddSection={(sectionType, title) => {
            // Handle adding new section
            setShowAddSectionModal(false);
          }}
          existingSections={cvData.customSections}
        />
      )}
    </div>
  );
}