import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useState, useEffect } from 'react';

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

export default function AddQuestion() {
    const [inputValues, setInputValues] = useState({
        question: '',
        categoryId: '',
        difficulty: '',
        correct_answer: '',
        incorrect_answer1: '',
        incorrect_answer2: '',
        incorrect_answer3: '',
    });

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function getCategories() {
            const data = await fetch(
                'http://localhost:3001/categories'
            ).then((res) => res.json());

            setCategories(data);
        }

        getCategories();
    }, []);

    function handleChange(e) {
        // const newValues = {...inputValues};
        // newValues[e.target.name] = e.target.value

        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value,
        });
    }

    async function handleAddQuestion(e) {
        e.preventDefault();
        const data = await fetch('http://localhost:3001/questions', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(inputValues),
        }).then((res) => res.json());

        console.log(data);
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Add Questions
            </Typography>
            <form onSubmit={handleAddQuestion}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Question Text"
                    autoComplete="question"
                    autoFocus
                    id="question"
                    type="text"
                    //Two way binding
                    name="question"
                    value={inputValues.question}
                    onChange={handleChange}
                />
                <FormControl fullWidth>
                    <InputLabel id="categoryId">Category</InputLabel>
                    <Select
                        labelId="categoryId"
                        id="categoryId"
                        name="categoryId"
                        value={inputValues.categoryId}
                        onChange={handleChange}
                    >
                        <MenuItem value="">
                            <em>Please select a category</em>
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem
                                key={'categorySelect' + cat.id}
                                value={cat.id}
                            >
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel id="difficulty">Difficulty</InputLabel>
                    <Select
                        labelId="difficulty"
                        id="difficulty"
                        name="difficulty"
                        value={inputValues.difficulty}
                        onChange={handleChange}
                    >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Correct Answer"
                    autoComplete="correct_answer"
                    id="correct_answer"
                    type="text"
                    // Two way binding
                    name="correct_answer"
                    value={inputValues.correct_answer}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Incorrect Answer 1"
                    autoComplete="incorrect_answer1"
                    id="incorrect_answer1"
                    type="text"
                    name="incorrect_answer1"
                    value={inputValues.incorrect_answer1}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Incorrect Answer 2"
                    autoComplete="incorrect_answer2"
                    id="incorrect_answer2"
                    type="text"
                    name="incorrect_answer2"
                    value={inputValues.incorrect_answer2}
                    onChange={handleChange}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Incorrect Answer 3"
                    autoComplete="incorrect_answer3"
                    id="incorrect_answer3"
                    type="text"
                    name="incorrect_answer3"
                    value={inputValues.incorrect_answer3}
                    onChange={handleChange}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    Save
                </Button>
            </form>
        </>
    );
}
