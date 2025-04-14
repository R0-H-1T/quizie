import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchQuizByCode, submitAns } from "../api/quizApi";
import { useLocation, useNavigate } from "react-router-dom";

const JoinQuiz = () => {
    const navigate = useNavigate();

    const [submitError, setSubmitError] = useState(null);
    const { code } = useParams();
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [responses, setResponses] = useState([]);
    const [started, setStarted] = useState(false); // <-- Controls quiz start

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const data = await fetchQuizByCode(code);
                setQuiz(data.result);

                // Initialize empty answers
                setResponses(data.result.questions.map(() => null));
            } catch (err) {
                setError("Quiz not found. Please check the code.");
            } finally {
                setLoading(false);
            }
        };
        getQuiz();
    }, [code]);

    const handleMCQChange = (qIndex, value) => {
        const updated = [...responses];
        updated[qIndex] = value; // ✅ this is now a number (1-based index)
        setResponses(updated);
    };


    const handleTextChange = (qIndex, value) => {
        const updated = [...responses];
        updated[qIndex] = value;
        setResponses(updated);
    };

    const handleSubmit = async () => {
        const unanswered = responses.some((r, idx) => {
            const q = quiz.questions[idx];
            return q.mcq ? r === null : r === null || r.trim() === "";
        });

        if (unanswered) {
            setSubmitError("Please answer all questions before submitting.");
            return;
        }

        setSubmitError(null);

        const finalPayload = {
            questionnaire_id: quiz.id, // assuming quiz.id is the UUID or ID
            answers: quiz.questions.map((q, index) => {
                const response = responses[index];
                return q.mcq
                    ? { mcq: true, choice: response } // ✅ Already 1-based index
                    : { mcq: false, text: response };
            })

        };

        try {
            await submitAns(finalPayload);
            alert("Ans submitted successfully!");
            navigate("/");
        } catch (error) {
            alert("Failed to submit ans. Please try again.");
        }
    };


    if (loading) return <p>Loading quiz...</p>;
    if (error) return <p className="text-danger">{error}</p>;

    return (
        <div className="container mt-4">
            <h2 className="mb-3">{quiz.title}</h2>

            {!started ? (
                <>
                    <p>Total Questions: {quiz.questions.length}</p>
                    <button className="btn btn-success" onClick={() => setStarted(true)}>Start Quiz</button>
                </>
            ) : (
                <>
                    {quiz.questions.map((q, index) => (
                        <div key={index} className="card my-3 p-3">
                            <h5>Q{index + 1}: {q.question}</h5>

                            {q.mcq && q.options ? (
                                q.options.map((option, i) => (
                                    <div className="form-check" key={i}>
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`q-${index}`}
                                            id={`q-${index}-option-${i}`}
                                            value={i + 1} // ✅ 1-based index
                                            checked={responses[index] === i + 1}
                                            onChange={() => handleMCQChange(index, i + 1)} // ✅ store 1-based index
                                        />
                                        <label className="form-check-label" htmlFor={`q-${index}-option-${i}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))
                            ) : (
                                <textarea
                                    className="form-control mt-2"
                                    rows="3"
                                    placeholder="Your answer..."
                                    value={responses[index] || ""}
                                    onChange={(e) => handleTextChange(index, e.target.value)}
                                />
                            )}
                        </div>
                    ))}

                    {submitError && <p className="text-danger text-center">{submitError}</p>}

                    <div className="text-center mt-4">
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Submit Quiz
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default JoinQuiz;
