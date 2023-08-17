import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    title: '',
    autoDate: '',
    startDate: '',
    endDate: '',
    questions: [{
        id: `xyz${Math.floor(10000 + Math.random() * 90000)}`,
        voterChoose: 'candidate',
        vacancy: 1,
        options: ['option/candidate 1'],
        choosedOptions: 1
    }]
}

const formDataSlice = createSlice({
    name: 'form-data',
    initialState,
    reducers: {
        addFirstPage(state, action) {
            const pl = action.payload
            state.title = pl.title;
            state.autoDate = pl.autoDate;
            state.startDate = pl.startDate;
            state.endDate = pl.endDate;
            state.voteType = pl.voteType;
            state.ballotAccess = pl.ballotAccess;
            state.adminResultAccess = pl.adminResultAccess;
            state.voterResultAccess = pl.voterResultAccess
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
            state.questions.find(q => q.id === action.payload.id).choosedOptions = action.payload.choosedOptions
        }
    }
})

export const { addFirstPage,
    addQuestion,
    addOption,
    deleteOption,
    addQuestionTitle,
    addChoosedOptions,
    addVacancy,
    addVoterChoose } = formDataSlice.actions

export const formDataReducer = formDataSlice.reducer