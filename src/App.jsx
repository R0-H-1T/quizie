// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import TakeQuiz from "./pages/TakeQuiz";
import QuizSummary from "./pages/QuizSummary";
import QuestionnaireDetail from "./pages/QuestionnaireDetail";
import JoinQuiz from "./pages/JoinQuiz"; 
import UserSubmissions from "./pages/UserSubmissions";
import './App.css'; 
import ResultPage from "./pages/ResultPage";


const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/take-quiz" element={<TakeQuiz />} /> 
          <Route path="/quiz-summary" element={<QuizSummary />} /> 
          <Route path="/questionnaire/:id" element={<QuestionnaireDetail />} />
          <Route path="/quiz/:code" element={<JoinQuiz />} />  
          <Route path="/submissions" element={<UserSubmissions />} />
          <Route path="/results/:id" element={<ResultPage />} />

        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
