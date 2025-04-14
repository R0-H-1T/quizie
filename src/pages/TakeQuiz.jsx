import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TakeQuiz = () => {
    const navigate = useNavigate();
    
    const [quizTitle, setQuizTitle] = useState(""); // Quiz title
    const [questions, setQuestions] = useState([]); // Stores all questions
    const [currentQuestion, setCurrentQuestion] = useState({
        text: "",
        isMCQ: false,
        options: ["", ""], // Minimum 2 MCQ options
        correctAnswer: "",
    });
    const [showQuestionInput, setShowQuestionInput] = useState(false); // Toggle

    /** Handle Question Change */
    const handleQuestionChange = (value) => {
        setCurrentQuestion((prev) => ({ ...prev, text: value }));
    };

    /** Toggle MCQ Checkbox */
    const toggleMCQ = () => {
        setCurrentQuestion((prev) => ({
            ...prev,
            isMCQ: !prev.isMCQ,
            options: ["", ""], // Reset options when toggling MCQ
            correctAnswer: "",
        }));
    };

    /** Handle MCQ Options Change */
    const handleOptionChange = (index, value) => {
        const newOptions = [...currentQuestion.options];
        newOptions[index] = value;
        setCurrentQuestion((prev) => ({ ...prev, options: newOptions }));
    };

    /** Add a new MCQ Option */
    const addOption = () => {
        setCurrentQuestion((prev) => ({
            ...prev,
            options: [...prev.options, ""],
        }));
    };

    /** Delete an MCQ Option */
    const deleteOption = (index) => {
        const newOptions = currentQuestion.options.filter((_, i) => i !== index);
        setCurrentQuestion((prev) => ({ ...prev, options: newOptions }));
    };

    /** Save the current question and reset input */
    const saveQuestion = () => {
        if (currentQuestion.text.trim() === "") return alert("Question cannot be empty!");

        setQuestions((prev) => [...prev, currentQuestion]); // Save question
        setCurrentQuestion({ text: "", isMCQ: false, options: ["", ""], correctAnswer: "" }); // Reset
    };

    /** Submit Quiz and Go to Summary Page */
    const goToSummary = () => {
        if (questions.length === 0) return alert("Please add at least one question!");
        navigate("/quiz-summary", { state: { quizTitle, questions } }); // Navigate with data
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
            {!showQuestionInput ? (
                /** -------------------- STEP 1: Enter Quiz Title -------------------- */
                <div className="w-50">
                    <h2 className="text-center mb-4">Create a Quiz</h2>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter Quiz Title"
                        value={quizTitle}
                        onChange={(e) => setQuizTitle(e.target.value)}
                    />
                    <button className="btn btn-primary float-end" onClick={() => setShowQuestionInput(true)}>
                        Next
                    </button>
                </div>
            ) : (
                /** -------------------- STEP 2: Add Questions -------------------- */
                <div className="w-50">
                    <h2 className="text-center mb-4">Add a Question</h2>
                    <input
                        type="text"
                        className="form-control mb-3"
                        placeholder="Enter your question"
                        value={currentQuestion.text}
                        onChange={(e) => handleQuestionChange(e.target.value)}
                    />

                    {/* MCQ Checkbox */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <div>
                            <input
                                type="checkbox"
                                id="mcqCheckbox"
                                checked={currentQuestion.isMCQ}
                                onChange={toggleMCQ}
                                className="form-check-input me-2"
                            />
                            <label htmlFor="mcqCheckbox" className="form-check-label">
                                MCQ
                            </label>
                        </div>
                    </div>

                    {/* MCQ Options Section */}
                    {currentQuestion.isMCQ && (
                        <div className="mb-3">
                            <h6>MCQ Options:</h6>
                            {currentQuestion.options.map((option, index) => (
                                <div key={index} className="d-flex align-items-center mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder={`Option ${index + 1}`}
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                    />
                                    {index >= 2 && (
                                        <button className="btn ms-2" onClick={() => deleteOption(index)}>
                                            ❌
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button className="btn btn-secondary mt-2" onClick={addOption}>
                                Add Option
                            </button>

                            {/* Correct Answer Input */}
                            <input
                                type="text"
                                className="form-control mt-3"
                                placeholder="Enter correct answer"
                                value={currentQuestion.correctAnswer}
                                onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, correctAnswer: e.target.value }))}
                            />
                        </div>
                    )}

                    {/* Save Question & Submit Quiz */}
                    <div className="d-flex justify-content-between">
                        <button className="btn btn-success" onClick={saveQuestion}>
                            Save Question
                        </button>
                        <button className="btn btn-primary" onClick={goToSummary}>
                            Submit Quiz
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TakeQuiz;
