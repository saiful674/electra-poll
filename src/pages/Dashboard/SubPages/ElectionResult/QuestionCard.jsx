import React from 'react';
import ResultChart from './ResultChart';

const QuestionCard = ({questionData , index}) => {
    
    return (
        <div className='p-5 bg-white shadow mt-5'>
            <h3 className='text-xl font-bold'>{index + 1}. Question: {questionData.questionTitle}</h3>
            <div>
            <ResultChart questionData={questionData}></ResultChart>
            </div>
        </div>
    );
};

export default QuestionCard;