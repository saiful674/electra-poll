import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../shared/LoadingSpinner';
import QuestionCard from './QuestionCard';
import ResultOverview from './ResultOverview';

const ElectionResult = () => {
    const [electionData, setElectionData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/election/${id}`)
            .then(res => {
                setElectionData(res.data)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [id])

    console.log(electionData)
    if(isLoading){
        return LoadingSpinner
    }
    return (
        <div>
            <h1 className='text-4xl text-center font-bold'>Election Result</h1>
            <h2 className='text-2xl font-bold my-5'>Election Title: <span className=' text-green-400'>{electionData.title}</span></h2>
            <ResultOverview electionData={electionData} />
            {
                electionData.questions.map((question,index)=> <QuestionCard key={question.id} questionData={question} index={index}></QuestionCard>)
            }
            
        </div>

    );
};

export default ElectionResult;