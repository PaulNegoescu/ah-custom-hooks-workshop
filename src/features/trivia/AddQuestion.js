import React, { Component } from 'react';

/*
    "category": 4,
    "type": "multiple",
    "difficulty": "hard",
    "question": "What is the official name of Prince&#039;s backing band?",
    "correct_answer": "The Revolution",
    "incorrect_answers": [
        "The Paupers",
        "The Wailers",
        "The Heartbreakers"
    ]
*/

export default class AddQuestion extends Component {
    state = {
        inputValues: {
            question: '',
            difficulty: '',
            correct_answer: '',
            incorrect_answer1: '',
            incorrect_answer2: '',
            incorrect_answer3: '',
        },
    };
    // static contextType = CurrencyContext;

    handleChange = (e) => {
        this.setState({
            inputValues: {
                ...this.state.inputValues,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleAddQuestion = async (e) => {
        e.preventDefault();
        const data = await fetch('http://localhost:3001/questions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(this.state.inputValues),
        }).then((res) => res.json());

        console.log(data);
    };

    /*
        useEffect(() => {
            //whatever
        }, [])
    */
    componentDidMount() {
        //whatever
    }

    render() {
        const { inputValues } = this.state;

        return (
            <form onSubmit={this.handleAddQuestion}>
                <p>
                    <label htmlFor="question">Question</label>
                    <input
                        id="question"
                        type="text"
                        name="question"
                        value={inputValues.question}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="difficulty">Difficulty</label>
                    <select
                        id="difficulty"
                        name="difficulty"
                        value={inputValues.difficulty}
                        onChange={this.handleChange}
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </p>
                <p>
                    <label htmlFor="correct_answer">Correct Answer</label>
                    <input
                        id="correct_answer"
                        type="text"
                        name="correct_answer"
                        value={inputValues.correct_answer}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="incorrect_answer1">
                        Incorrect Answer 1
                    </label>
                    <input
                        id="incorrect_answer1"
                        type="text"
                        name="incorrect_answer1"
                        value={inputValues.incorrect_answer1}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="incorrect_answer2">
                        Incorrect Answer 2
                    </label>
                    <input
                        id="incorrect_answer2"
                        type="text"
                        name="incorrect_answer2"
                        value={inputValues.incorrect_answer2}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <label htmlFor="incorrect_answer3">
                        Incorrect Answer 3
                    </label>
                    <input
                        id="incorrect_answer3"
                        type="text"
                        name="incorrect_answer3"
                        value={inputValues.incorrect_answer3}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <button type="submit">Save</button>
                </p>
            </form>
        );
    }
}
