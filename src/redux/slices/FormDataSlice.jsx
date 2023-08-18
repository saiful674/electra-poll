import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

}

const formDataSlice = createSlice({
    name: 'form-data',
    initialState,
    reducers: {
        setInitalState(state, action) {
            Object.assign(state, action.payload);
        },
        addFirstPage(state, action) {
            const pl = action.payload
            state.title = pl.title;
            state.autoDate = Math.floor(pl.autoDate);
            state.startDate = pl.startDate;
            state.endDate = pl.endDate;
            state.voteType = pl.voteType;
            state.ballotAccess = pl.ballotAccess;
            state.adminResultAccess = pl.adminResultAccess;
            state.voterResultAccess = pl.voterResultAccess;
            state.adminEmail = pl.adminEmail;
            state.organization = pl.organization;
            state.email = pl.email;
        },
        addQuestion(state) {
            state.questions.push({
                id: `xyz${Math.floor(10000 + Math.random() * 90000)}`,
                voterChoose: 'candidate',
                vacancy: 1,
                options: ['option/candidate 1'],
                choosedOptions: 1
            })
        },
        addOption(state, action) {
            const question = state.questions.find(q => q.id === action.payload.id)
            state.questions.find(q => q.id === action.payload.id).options.push(`option/candidate ${question.options.length + 1}`)
        },
        deleteOption(state, action) {
            state.questions.find(q => q.id === action.payload.id).options = state.questions.find(q => q.id === action.payload.id).options.filter(op => op !== action.payload.option)
        },
        addQuestionTitle(state, action) {
            state.questions.find(q => q.id === action.payload.id).questionTitle = action.payload.questionTitle
        },
        addVacancy(state, action) {
            state.questions.find(q => q.id === action.payload.id).vacancy = action.payload.vacancy
        },
        addVoterChoose(state, action) {
            state.questions.find(q => q.id === action.payload.id).voterChoose = action.payload.voterChoose
        },
        addChoosedOptions(state, action) {
            if (action.payload.choosedOptions <= state.questions.find(q => q.id === action.payload.id).options.length && action.payload.choosedOptions > 0) {
                state.questions.find(q => q.id === action.payload.id).choosedOptions = action.payload.choosedOptions
            }
            else if (action.payload.choosedOptions >= state.questions.find(q => q.id === action.payload.id).options.length) {
                state.questions.find(q => q.id === action.payload.id).choosedOptions = state.questions.find(q => q.id === action.payload.id).options.length
            }
        },
        setEmailNotice(state) {
            state.notice.emailNotice = !(state.notice.emailNotice)
        },
        setUseName(state) {
            state.notice.useName = !(state.notice.useName)
        },
        setEmailSubject(state, action) {
            state.emailSubject = action.payload
        },
        setEmailInfo(state, action) {
            state.emailInfo = action.payload
        },
        updateVoterEmail(state, action) {
            state.voterEmails.find(email => email.id === action.payload.id).email = action.payload.email;
        },
        addVoterRow(state) {
            state.voterEmails.push({ id: `${state.organization}//${Math.floor(100000000 + Math.random() * 900000000)}`, email: '' });
        },
        removeVoterEmail(state, action) {
            const idToRemove = action.payload;
            state.voterEmails = state.voterEmails.filter(email => email.id !== idToRemove);
        },
        setEmailValid(state) {
            state.emailsValid = !state.emailsValid
        },
        next(state) {
            state.page++
        },
        previous(state) {
            state.page--
        }
    }
})

export const {
    setInitalState,
    addFirstPage,
    addQuestion,
    addOption,
    deleteOption,
    addQuestionTitle,
    addChoosedOptions,
    addVacancy,
    addVoterChoose,
    setEmailNotice,
    setUseName,
    setEmailSubject,
    setEmailInfo,
    updateVoterEmail,
    addVoterRow,
    removeVoterEmail,
    setEmailValid,
    next,
    previous
} = formDataSlice.actions

export const formDataReducer = formDataSlice.reducer