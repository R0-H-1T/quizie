import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchResultById } from "../api/quizApi";

const ResultPage = () => {
  const { id } = useParams();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getResult = async () => {
      try {
        const data = await fetchResultById(id);
        setQuizData(data);
        console.log("THIS IS THE REAL DEAl")
        console.log(data)
      } catch (err) {
        setError("Failed to load result.");
      } finally {
        setLoading(false);
      }
    };

    getResult();
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading result...</p>;
  if (error) return <p className="text-danger text-center mt-5">{error}</p>;
  if (!quizData) return <p className="text-muted text-center mt-5">No result data available.</p>;

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-center">Quiz Result</h3>
      {quizData.questions.map((q, index) => {
        const userAnswer = quizData.answer[index];
        const isMCQ = q.mcq;

        return (
          <div className="card my-3 p-3" key={index}>
            <h5>Q{index + 1}: {q.question}</h5>

            {isMCQ ? (
              <div>
                <ul className="list-group">
                  {q.options.map((opt, i) => {
                    const optionNumber = i + 1;
                    const isCorrect = q.correct === optionNumber;
                    const isSelected = userAnswer.choice === optionNumber;

                    return (
                      <li
                        key={i}
                        className={`list-group-item d-flex justify-content-between 
                          ${isCorrect ? "list-group-item-success" : ""}
                          ${isSelected && !isCorrect ? "list-group-item-danger" : ""}
                        `}
                      >
                        {opt}
                        {isCorrect && <span className="badge bg-success">Correct</span>}
                        {isSelected && !isCorrect && <span className="badge bg-danger">Your Answer</span>}
                        {isSelected && isCorrect && <span className="badge bg-primary">You Got It!</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              <div>
                <p><strong>Your Answer:</strong></p>
                <p className="border p-2 bg-light">{userAnswer.text}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultPage;
