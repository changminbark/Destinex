import React, { useState } from "react";
import './common_questions.css';

const CommonQuestions = ({ question, answer }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="commonQuestions">

            <div className="commonQuestionsQuestion" onClick={() => setIsActive(!isActive)}>
                <div>{question}</div>
                <div className="commonQuestionsBtn">{isActive ? '-' : '+'}</div>
            </div>
            {isActive && <div className="commonQuestionsAnswer">{answer}</div>}
            <hr></hr>

        </div>
    )
}

export default CommonQuestions;