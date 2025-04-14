import { useEffect, useState } from "react";
import { fetchAllQuestionnaires } from "../api/quizApi";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";


const QuestionnaireList = () => {
    const {user} = useContext(AuthContext);
    const [questionnaires, setQuestionnaires] = useState([]);
    const navigate = useNavigate();

    /** Fetch all questionnaires on mount */
    useEffect(() => {
        const getData = async () => {
            const data = await fetchAllQuestionnaires();
            setQuestionnaires(data);
        };
        getData();
    }, []);

    return user? (
        <div className="container mt-4" style={{ width: "950px" }}>
            <h4 className="mb-3">Your Quizes</h4>
            {questionnaires.length === 0 ? (
                <p className="text-muted">Get on creating the quiz!</p>
            ) : (
                <table className="table">
                    {/* <thead className="table-light">
                        <tr>
                            <th>Title</th>
                            <th>Quiz Code</th>
                            <th>Action</th>
                        </tr>
                    </thead> */}
                    <tbody>
                        {questionnaires.map((quiz) => (
                            <tr key={quiz.id}>
                                <td className="d-flex align-items-center gap-2">
                                    <button
                                        className="btn btn-sm"
                                        onClick={() => {
                                            navigator.clipboard.writeText(quiz.quiz_code);
                                            alert("Quiz code copied!");
                                        }}
                                    >
                                        📋
                                    </button>
                                    <span className="me-">{quiz.quiz_code}</span>
                                </td>
                                <td onClick={() => navigate(`/questionnaire/${quiz.id}`)}>
                                    {quiz.title}
                                </td>
                                <td>
                                    <button
                                        className="btn"
                                        onClick={() => navigate(`/questionnaire/${quiz.id}`)}
                                    >
                                        ▶️
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    ) : null;    
};

export default QuestionnaireList;
