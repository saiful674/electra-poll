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
    }],
    notice: {
        emailNotice: true,
        useName: true
    },
    emailSubject: 'Vote Now:',
    emailInfo: '',
    voterEmails: []
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
            state.voterResultAccess = pl.voterResultAccess;
            state.adminEmail = pl.adminEmail;
            state.organization = pl.organization
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
            const { index, email } = action.payload;

            if (state.voterEmails[index]) {
                state.voterEmails[index].email = email;
            } else {
                state.voterEmails.push({ id: state.voterEmails.length + 1, email });
            }
        },
        addVoterRow(state) {
            state.voterEmails.push({ id: state.voterEmails.length + 1, email: '' });
        },
        removeVoterEmail(state, action) {
            const idToRemove = action.payload;
            state.voterEmails = state.voterEmails.filter(email => email.id !== idToRemove);
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
    addVoterChoose,
    setEmailNotice,
    setUseName,
    setEmailSubject,
    setEmailInfo,
    updateVoterEmail,
    addVoterRow,
    removeVoterEmail
} = formDataSlice.actions

export const formDataReducer = formDataSlice.reducer