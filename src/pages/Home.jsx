import 'bootstrap/dist/css/bootstrap.min.css';
import QuizOptions from "../components/QuizOptions";
import QuestionnaireList from "../components/QuestionnaireList";

const Home = () => {
    return (
        <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
            <h1 className="text-center mb-4" style={{ fontSize: "3rem", fontWeight: "bold" }}>
                Welcome to Quizie
            </h1>
            <QuizOptions />
            <QuestionnaireList /> {/* ✅ Display the list of questionnaires */}
        </div>
    );
};

export default Home;
