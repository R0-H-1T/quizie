import { useLocation, useNavigate } from "react-router-dom";
import { submitQuiz } from "../api/quizApi";

const QuizSummary = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quizTitle, questions } = location.state || { quizTitle: "", questions: [] };

    /** Handle Final Submission */
    const finalSubmit = async () => {
        const structuredQuiz = {
            title: quizTitle,
            questions: questions.map(q => q.isMCQ ? ({
                mcq: true,
                question: q.text,
                correct: q.correctAnswer,
                options: q.options
            }) : ({
                mcq: false,
                question: q.text
            }))
        };

        try {
            await submitQuiz(structuredQuiz); 
            alert("Quiz submitted successfully!");
            navigate("/");
        } catch (error) {
            alert("Failed to submit quiz. Please try again.");
        }
    };

    return (
        <div className="container">
            <h2 className="text-center mt-4">Quiz Summary</h2>
            <h4 className="text-center">Title: {quizTitle}</h4>
            
            {questions.map((q, index) => (
                <div key={index} className="card my-3 p-3">
                    <h5>Question {index + 1}: {q.text}</h5>
                    {q.isMCQ ? (
                        <>
                            <h6>Options:</h6>
                            <ul>
                                {q.options.map((option, i) => (
                                    <li key={i}>{option}</li>
                                ))}
                            </ul>
                            <p><strong>Correct Answer:</strong> {q.correctAnswer}</p>
                        </>
                    ) : <p><strong>Type:</strong> Short Answer</p>}
                </div>
            ))}

            <div className="text-center">
                <button className="btn btn-success" onClick={finalSubmit}>Final Submit</button>
            </div>
        </div>
    );
};

export default QuizSummary;