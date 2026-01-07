
import React, { useState } from 'react';
import Layout from '../../Components/Layout';


// --- Helper Components: Icons ---
// Save Icon ke liye SVG code
const SaveIcon = ({ className = "me-2" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
    <polyline points="17 21 17 13 7 13 7 21"></polyline>
    <polyline points="7 3 7 8 15 8"></polyline>
  </svg>
);
// Pencil (Edit) Icon ke liye SVG code
const PencilIcon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
  </svg>
);
// Trash (Delete) Icon ke liye SVG code
const Trash2Icon = ({ className = "w-4 h-4" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 6h18"></path>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

// --- Component: EmotionFieldCard (Inner Card) ---
// Har ek input field (Old/New Self Love) ke liye card component
const EmotionFieldCard = ({ title, value, onChange, placeholder }) => (
  <div className="card shadow-sm border-0 h-100"> 
    <div className="card-body p-4 bg-light rounded-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h5 card-title text-dark">{title}</h3>
        <div className="d-flex align-items-center text-muted">
          <PencilIcon className="me-3 cursor-pointer text-primary" />
          <Trash2Icon className="cursor-pointer text-danger" />
        </div>
      </div>
      <textarea
        className="form-control"
        rows="4"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  </div>
);

// --- Component: MainCardContainer (Outer Card) ---
// Dono input cards ko wrap karne wala bada container
const MainCardContainer = ({ title, children, onSave }) => (
  <div className="card shadow-lg border-0 mt-5 mb-4">
    <div className="card-body p-4 p-md-5">
      
      {/* Header with Title and Save Button */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 border-bottom pb-3">
        <h2 className="h4 card-title text-dark fw-bold mb-3 mb-md-0">{title}</h2>
        <button
          onClick={onSave}
          className="btn btn-danger d-flex align-items-center px-4 py-2 fw-semibold shadow-sm w-100 w-md-auto justify-content-center"
        >
          <SaveIcon />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Content Area: Old Self Love and New Self Love Cards Side-by-Side */}
      <div className="row g-4">
        {children}
      </div>
    </div>
  </div>
);

// --- Component: EmotionPageContent (The main display, accepts slug as prop) ---
const EmotionPageContent = ({ emotionSlug }) => {
    // Slug se Clean Title banana (e.g., 'rejection' se 'Rejection')
    const displayEmotion = emotionSlug
        .replace(/-/g, ' ')
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    // State for input fields
    const [oldValue, setOldValue] = useState("");
    const [newValue, setNewValue] = useState("");
    
    // Save function for UI demo
    const handleSave = () => {
      console.log(`Saving changes for: ${displayEmotion}`);
      
      const saveMessage = document.getElementById('save-message');
      if (saveMessage) {
          saveMessage.innerHTML = `<strong>Success!</strong> Changes for ${displayEmotion} saved (UI Demo).`;
          saveMessage.classList.remove('d-none', 'alert-danger');
          saveMessage.classList.add('show', 'alert-success');
          setTimeout(() => {
              saveMessage.classList.remove('show');
              saveMessage.classList.add('d-none');
          }, 3000);
      }
    };

    return (
        <>
            {/* --- Main Page Title (Dynamic) --- */}
            <h1 className="display-5 fw-bold text-dark mt-3">{displayEmotion} Reconciliation</h1>
            {/* <p className="text-muted mb-4">Customize your emotional reconciliation script for {displayEmotion}.</p> */}
            
            {/* --- RESTRUCTURED CARD COMPONENT (Title is Dynamic) --- */}
            <MainCardContainer
              title={`${displayEmotion} Reconciliation Customization`}
              onSave={handleSave}
            >
              {/* Old Self Love Field Card */}
              <div className="col-12 col-lg-6">
                <EmotionFieldCard
                  title="Old Self Love"
                  value={oldValue}
                  onChange={(e) => setOldValue(e.target.value)}
                  placeholder="Describe how this emotion was experienced before. What were the old patterns or limiting beliefs associated with it?"
                />
              </div>

              {/* New Self Love Field Card */}
              <div className="col-12 col-lg-6">
                <EmotionFieldCard
                  title="New Self Love"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="Describe the new empowered belief, mindset, or behavior you choose to adopt for this emotion."
                />
              </div>
            </MainCardContainer>
        </>
    );
}

// --- Main Application Component ---
export default function App() {
  // Yeh value aapke router se aayegi. Abhi demo ke liye 'rejection' set hai.
  const mockEmotionSlug = 'rejection'; 

  return (
    <Layout>
    <div className="bg-light min-vh-100" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Load Bootstrap 5 CSS */}
      <link 
        rel="stylesheet" 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" 
        xintegrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" 
        crossOrigin="anonymous" 
      />
      {/* Load Bootstrap JS bundle */}
      <script 
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" 
        xintegrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" 
        crossOrigin="anonymous"
      ></script>

      {/* --- Main Content Area --- */}
      <div className="container-fluid pt-4 pb-5">
        
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10"> {/* Content ki max width */}

            {/* --- Floating Save Message (Bootstrap Alert) --- */}
            <div 
              id="save-message" 
              className="alert alert-success alert-dismissible fade d-none position-fixed top-0 end-0 m-3 z-3"
              role="alert"
              style={{ minWidth: '300px' }}
            >
              {/* Message yahan insert hoga */}
            </div>
            
            {/* --- DYNAMIC PAGE CONTENT --- */}
            <EmotionPageContent emotionSlug={mockEmotionSlug} />
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}