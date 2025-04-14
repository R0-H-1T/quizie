import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const QuizOptions = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [quizCode, setQuizCode] = useState("");

  /** Handles quiz code submission */
  const handleJoinQuiz = () => {
    if (quizCode.trim() === "") {
      alert("Please enter a valid quiz code.");
      return;
    }
    setShowPopup(false);  // Close popup
    navigate(`/quiz/${quizCode}`);  // Navigate to quiz page
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center gap-4">
      {/* Buttons */}
      <div className="d-flex gap-3">
        <button
          className="btn btn-lg btn-primary px-5 py-3"
          onClick={() => (!user ? navigate("/login") : setShowPopup(true))}
        >
          Join Quiz
        </button>
        <button
          className="btn btn-lg btn-success px-5 py-3"
          onClick={() => (!user ? navigate("/login") : navigate("/take-quiz"))}
        >
          Create Quiz
        </button>
      </div>

      {/* Popup Modal */}
      {showPopup && (
  <div className="popup-overlay">
    <div className="popup">
      {/* <button className="close-btn" onClick={() => setShowPopup(false)}>❌</button> */}
      <h4>Enter Quiz Code</h4>
      <input
        type="text"
        className="form-control mt-2"
        placeholder="Enter code..."
        value={quizCode}
        onChange={(e) => setQuizCode(e.target.value)}
      />
      <div className="mt-3 d-flex justify-content-end">
        <button className="btn btn-secondary me-2" onClick={() => setShowPopup(false)}>Cancel</button>
        <button className="btn btn-primary" onClick={handleJoinQuiz}>Join</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default QuizOptions;
