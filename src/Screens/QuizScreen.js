import React, {useState} from "react";
import {Button, CircularProgress, Divider, Typography} from "@material-ui/core";
import {makeStyles} from '@material-ui/core/styles';
import rsesQuestions from '../assets/questions/rses';
import anxiety from "../assets/questions/anxiety";
import loneliness from "../assets/questions/loneliness";
import {Link, useLocation} from 'react-router-dom';
import "react-step-progress-bar/styles.css";
import {ProgressBar, Step} from "react-step-progress-bar";


const useStyles = makeStyles({
    container: {
        height: window.innerHeight,
        width: window.innerWidth,
    },
    titleText: {
        paddingTop: 35,
        fontWeight: 'normal',
        fontSize: 45
    },
    questionContainer: {
        border: '1px solid grey',
        borderRadius: 5,
        boxShadow: '2px 2px 4px grey',
        width: '70%',
        margin: 'auto',
        marginTop: 35,
        padding: 6,
        paddingLeft: 20,
    },
    questionText: {
        fontSize: 22,
    },
    optionContainer: {
        border: '1px solid #ccc',
        borderRadius: 5,
        boxShadow: '2px 2px 4px #ccc',
        padding: 8,
        paddingLeft: 32,
        marginTop: 18,
        margin: 'auto',
        width: '60%',
        cursor: 'pointer',
    },
    unselectedOptionContainer: {
        '&:hover': {
            boxShadow: '2px 2px 4px #999, inset 0 0 20px #fff',
        }
    },
    selectedOptionContainer: {
        backgroundColor: 'green',
        '&:hover': {
            boxShadow: '',
        }
    },
    optionText: {
        fontSize: 18,
    },
    buttonsContainer: {
        display: 'flex',
        margin: 'auto',
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '70%'
    }

});

const QuizScreen = () => {
    const location = useLocation();
    const {quesBankNumber, avatar} = location.state;
    const quesBank = quesBankNumber === "1" ? rsesQuestions : (quesBankNumber === "2" ? anxiety : loneliness);
    const [quesNum, setQuesNum] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    let n = quesBank.length;
    let temp = new Array(n);
    const [quesAnsweredCount, setQuesAnsweredCount] = useState(0);
    for (let i = 0; i < n; i++)
        temp[i] = null;

    const [storage, setStorage] = useState(temp);

    const OptionContainer = ({answer, isSelected}) => {
        const classes = useStyles();
        return (
            <div
                className={isSelected ? `${classes.optionContainer} ${classes.selectedOptionContainer}` : `${classes.unselectedOptionContainer} ${classes.optionContainer}`}
                onClick={() => {
                    if (!storage[quesNum]) {
                        setQuesAnsweredCount(quesAnsweredCount + 1);
                    }
                    setStorage([
                            ...storage.slice(0, quesNum),
                            answer.type,
                            ...storage.slice(quesNum + 1)
                        ]
                    );
                    if (quesNum !== n - 1) {
                        setIsLoading(true);
                        setTimeout(() => {
                            setIsLoading(false);
                            setQuesNum(quesNum + 1);
                        }, 500);
                    }
                }}>
                <Typography className={classes.optionText}>
                    {answer.content}
                </Typography>
            </div>
        )
    }

    const SingleQuestion = () => {
        const classes = useStyles();
        return (
            <>
                <div className={classes.questionContainer}>
                    <Typography className={classes.questionText}>
                        {quesBank[quesNum].question}
                    </Typography>
                </div>
                <div style={{width: '100%', margin: 'auto'}}>
                    {quesBank[quesNum].answers.map((answer) => {
                        return (
                            <OptionContainer answer={answer} isSelected={storage[quesNum] === answer.type}/>
                        )
                    })}
                </div>
                <div className={classes.buttonsContainer}>
                    <Button variant="contained" onClick={() => setQuesNum(quesNum - 1)}
                            disabled={quesNum === 0}
                            className={classes.backButton}>Back</Button>

                    <Button variant="contained" color="primary" disabled={quesAnsweredCount !== n}>
                        <Link
                            style={{textDecoration: 'none'}}
                            to={{
                                pathname: "/analytics",
                                state: {
                                    storage: storage,
                                    avatar: avatar
                                }
                            }}
                        >
                            Submit
                        </Link>
                    </Button>

                </div>
            </>
        )
    }


    const classes = useStyles();
    return (
        <div className={classes.container}>
            {isLoading && <CircularProgress style={{position: 'absolute', top: '50%', left: '50%'}}/>}
            <Typography align={"center"} className={classes.titleText}>
                {quesBankNumber === "1" ? "The Rosenberg Self Esteem Scale" :
                 (quesBankNumber === "2" ? "The Hamilton Anxiety Rating Scale" :
                  "The UCLA Loneliness Scale (Version 3)")}
            </Typography>
            <Divider/>
            <SingleQuestion/>

            <div style={{width: '75%', margin: 'auto', marginTop: 45}}>
                <ProgressBar
                    percent={(quesAnsweredCount * 100) / n}
                    filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
                >
                    {quesBank.map((key) => {
                        return (
                            <Step transition="scale">
                                {({accomplished}) => (
                                    <img
                                        style={{filter: `grayscale(${accomplished ? 0 : 80}%)`, borderRadius: 30}}
                                        width="30"
                                        src={avatar}
                                    />
                                )}
                            </Step>
                        )
                    })}
                    <Step transition="scale">
                        {({accomplished}) => (
                            <img
                                style={{filter: `grayscale(${accomplished ? 0 : 80}%)`, borderRadius: 30}}
                                width="30"
                                src={avatar}
                            />
                        )}
                    </Step>

                </ProgressBar>
            </div>

        </div>
    )
}

export default QuizScreen;