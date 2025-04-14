const BASE_URL = "http://localhost:8000"; // Change if needed

/** Send quiz data to the backend */
export const submitQuiz = async (quizData) => {
    try {
        console.log(JSON.stringify(quizData))
        const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/question`, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `bearer ${localStorage.getItem("access_token")}` },
            body: JSON.stringify(quizData),
        });

        if (!response.ok) throw new Error("Failed to submit quiz");

        const data = await response.json();

        console.log("✅ Quiz submitted successfully:", data);
        return data;
    } catch (error) {
        console.error("❌ Error submitting quiz:", error);
        throw error;
    }
};



export const submitAns = async (ansData) => {
    try {
        console.log(JSON.stringify(ansData))
        const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/answer`, {
            method: "POST",
            headers: {"Content-Type": "application/json", "Authorization": `bearer ${localStorage.getItem("access_token")}`},
            body: JSON.stringify(ansData)
        })

        if (!response.ok) throw new Error("Failed to submit answer");

        const data = await response.json();

        console.log("Ans submitted successfully", data);
        return data;
    } catch (error) {
        console.error("❌ Error submitting quiz:", error)
        throw error
    }
}

/** Fetch all questionnaires */
export const fetchAllQuestionnaires = async () => {
    try {
        const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/all-questions`,{
            method: 'GET',
            headers: {"Authorization": `bearer ${localStorage.getItem("access_token")}` },
        });
        if (!response.ok) throw new Error("Failed to fetch questionnaires");
        const data = await response.json();
        console.log(data)
        return data.result || [];
    } catch (error) {
        console.error("❌ Error fetching questionnaires:", error);
        return [];
    }
};


export const fetchQuestionnaireById = async (id) => {
    try{
        const response = await fetch(
            `${BASE_URL}/quiz-app/api/v1/qna/question/${id}`, {
                method: 'GET',
                headers: {"Authorization": `bearer ${localStorage.getItem("access_token")}` },
            }
        )

        if (!response.ok) throw new Error('Failed to fetch question');
        const data = await response.json()
        return data.result|| [];
        
    }catch (error) {
        console.error("❌ Error fetching questionnaires:", error);
        return [];
    }
}


export const fetchQuizByCode = async (code) => {
    try {
        const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/quiz_code/${code}`, {
            method: 'GET',
            headers: {"Authorization": `bearer ${localStorage.getItem("access_token")}` },
        });
        if (!response.ok) throw new Error("Quiz not found");
        return await response.json();
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
};


export const deleteQuestionnaireById = async (id) => {
    const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/question/${id}`, {
        method: "DELETE",
        headers: {"Authorization": `bearer ${localStorage.getItem("access_token")}` },
    });

    if (!response.ok) {
        throw new Error("Failed to delete questionnaire");
    }

    return response.json(); // Or just return true if backend returns no body
};


export const fetchAnswers = async () => {
    const response = await fetch(`${BASE_URL}/quiz-app/api/v1/qna/answer`, {
        method: "GET",
        headers: {"Authorization": `bearer ${localStorage.getItem("access_token")}` },
    });

    if (!response.ok) {
        throw new Error("Failed to fetch the answers");
    }

    return response.json()
}


export const fetchUserSubmissions = async () => {
    try {
        const response = await fetch(
            `${BASE_URL}/quiz-app/api/v1/qna/question`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        );

        if (!response.ok) throw new Error('Failed to fetch submissions');
        const data = await response.json();
        return data.result || [];

    } catch (error) {
        console.error("❌ Error fetching user submissions:", error);
        return [];
    }
};



export const fetchResultById = async (id) => {
    try {
        const response = await fetch(
            `${BASE_URL}/quiz-app/api/v1/qna/quiz_result/${id}`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        );

        if (!response.ok) throw new Error("Failed to fetch result");

        const data = await response.json();
        return data.result;
    } catch (error) {
        console.error("❌ Error fetching quiz result:", error);
        return null;
    }
};



// export const fetchQuestionnaireById = async (id) => {
//     try {
//         const response = await fetch(`http://localhost:5000/questionnaire/${id}`);
//         if (!response.ok) throw new Error("Failed to fetch");
//         const data = await response.json();
//         return data; // Returns the list of questions
//     } catch (error) {
//         console.error("Error fetching questionnaire:", error);
//         throw error;
//     }
// };