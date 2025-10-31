export default function ClassicalTemplate({ formData, handleChange }) {
  return (
    <div className="cv-template">
      <div className="cv-header">
        <h1>{formData.name || "Your Name"}</h1>
        <p>{formData.email || "your.email@example.com"}</p>
        <p>{formData.phone || "Phone Number"}</p>
        <p>{formData.address || "Address"}</p>
      </div>

      {formData.summary && (
        <div className="cv-section">
          <h3>Professional Summary</h3>
          <p>{formData.summary}</p>
        </div>
      )}

      {formData.experience && (
        <div className="cv-section">
          <h3>Work Experience</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{formData.experience}</p>
        </div>
      )}

      {formData.education && (
        <div className="cv-section">
          <h3>Education</h3>
          <p style={{ whiteSpace: 'pre-line' }}>{formData.education}</p>
        </div>
      )}

      {formData.skills && (
        <div className="cv-section">
          <h3>Skills</h3>
          <p>{formData.skills}</p>
        </div>
      )}

      {/* Render Custom Sections */}
      {formData.customSections && formData.customSections.length > 0 && (
        <>
          {formData.customSections.map((section) => (
            section.content && (
              <div key={section.id} className="cv-section">
                <h3>{section.title}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{section.content}</p>
              </div>
            )
          ))}
        </>
      )}
    </div>
  );
}
