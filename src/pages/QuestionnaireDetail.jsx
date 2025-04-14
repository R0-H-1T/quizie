import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchQuestionnaireById, deleteQuestionnaireById } from "../api/quizApi";

const QuestionnaireDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getQuestions = async () => {
            try {
                const data = await fetchQuestionnaireById(id);
                setQuestions(data);
            } catch (err) {
                setError("Failed to fetch questions. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        getQuestions();
    }, [id]);

    /** Handle delete */
    const handleDelete = async () => {
        const confirmDelete = window.confirm("Are you sure you want to delete this questionnaire?");
        if (!confirmDelete) return;

        try {
            await deleteQuestionnaireById(id);
            navigate("/"); // or to /dashboard if you have one
        } catch (err) {
            alert("Failed to delete. Please try again.");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Questionnaire Details</h2>
                <button className="btn btn-danger" onClick={handleDelete}>
                    🗑️ Delete
                </button>
            </div>

            {questions.length === 0 ? (
                <p>No questions found for this questionnaire.</p>
            ) : (
                <div>
                    {questions.map((q, index) => (
                        <div key={q.id} className="card my-3 p-3">
                            <h5>Q{index + 1}: {q.question}</h5>                            
                            {q.mcq && q.options ? (
                                <ol>
                                    {q.options.map((option, i) => (
                                        <li key={i}>{option}</li>
                                    ))}
                                </ol>
                            ) : (
                                <p><strong>Type:</strong> Short Answer</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default QuestionnaireDetail;
