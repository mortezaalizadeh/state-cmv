import { Action, Reducer } from 'redux'
import { IAppThunkAction as AppThunkAction } from './'
import { IInsuranceApplication } from '../models/insurance-application'
import { InsuranceApplicationService } from '../services/insurance-application.service'
import { HttpService } from '../services/http.service'
import { IUpdateAnswers } from '../models/answer'
import { IRemoveProductInstance } from '../models/product'

const ETAG_REGEX = /"/gi
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IInsuranceApplicationState {
  insuranceApplication?: IInsuranceApplication;
  answeredQuestions?: IUpdateAnswers[]
  etag?: string;
  error?: Error;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface ICreateInsuranceApplicationAction {
  type: 'CREATE_IA';
}

interface IUpdateAnswersOnInsuranceApplicationAction {
  type: 'UPDATE_ANSWERS_ON_INSURANCE_APPLICATION';
  updatedAnswers: IUpdateAnswers
}

interface IRemoveProductsOnInsuranceApplicationAction {
    type: 'REMOVE_PRODUCTINSTANCE_ON_INSURANCE_APPLICATION';
}

interface ICreateInsuranceApplicationSuccessAction {
  type: 'IA_RECEIVED';
  insuranceApplication: IInsuranceApplication;
  etag: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  ICreateInsuranceApplicationAction
    | ICreateInsuranceApplicationSuccessAction
    | IRemoveProductsOnInsuranceApplicationAction
  | IUpdateAnswersOnInsuranceApplicationAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  createInsuranceApplication: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState()
    if (appState && appState.insuranceApplication) {

      if (!appState.configuration?.configuration?.apiUrls.iaWrite) {
        throw new Error('Failed to load configuration for IA.Write.')
      }

      const service = new InsuranceApplicationService(appState.configuration.configuration.apiUrls.iaWrite, new HttpService())

      service.createInsuranceApplication(appState.configuration.authToken)
        .then((response) => {
          dispatch({
            type: 'IA_RECEIVED',
            insuranceApplication: response.data as IInsuranceApplication,
            etag: response.headers.etag.replace(ETAG_REGEX, '')
          })
        })

      dispatch({ type: 'CREATE_IA' })
    }
  },
  updateAnswers: (updatedAnswers: IUpdateAnswers, callback?: () => void): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState()
    if (appState && appState.insuranceApplication) {

      if (!appState.configuration?.configuration?.apiUrls.iaWrite) {
        throw new Error('Failed to load configuration for IA.Write.')
      }

      if (!appState.insuranceApplication.etag) {
        throw new Error('ETag cannot be empty.')
      }

      if (!appState.insuranceApplication.insuranceApplication?.id) {
        throw new Error('Insurance application ID cannot be empty.')
      }
      const service = new InsuranceApplicationService(appState.configuration.configuration.apiUrls.iaWrite, new HttpService())

      service.updateAnswers(updatedAnswers, appState.insuranceApplication.etag, appState.insuranceApplication.insuranceApplication.id, appState.configuration.authToken)
        .then((response) => {
          dispatch({
            type: 'IA_RECEIVED',
            insuranceApplication: response.data as IInsuranceApplication,
            etag: response.headers.etag.replace(ETAG_REGEX, '')
          })
          if (callback) {
            callback()
          }
        })

      dispatch({ type: 'UPDATE_ANSWERS_ON_INSURANCE_APPLICATION', updatedAnswers: updatedAnswers })
    }
    },
    removeProducts: (requestBody: IRemoveProductInstance, callback?: () => void): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState()
        if (appState && appState.insuranceApplication) {

            if (!appState.configuration?.configuration?.apiUrls.iaWrite) {
                throw new Error('Failed to load configuration for IA.Write.')
            }

            if (!appState.insuranceApplication.etag) {
                throw new Error('ETag cannot be empty.')
            }

            if (!appState.insuranceApplication.insuranceApplication?.id) {
                throw new Error('Insurance application ID cannot be empty.')
            }
            const service = new InsuranceApplicationService(appState.configuration.configuration.apiUrls.iaWrite, new HttpService())

            service.removeProductInstance(requestBody, appState.insuranceApplication.etag, appState.insuranceApplication.insuranceApplication.id, appState.configuration.authToken)
                .then((response) => {
                    dispatch({ type: 'IA_RECEIVED', insuranceApplication: response.data as IInsuranceApplication, etag: response.headers.etag.replace(ETAG_REGEX, '') })
                    if (callback) {
                        callback();
                    }
                })

            dispatch({ type: 'REMOVE_PRODUCTINSTANCE_ON_INSURANCE_APPLICATION' })
        }
    },
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: IInsuranceApplicationState =
  {
    insuranceApplication: undefined,
    etag: '',
  }

export const reducer: Reducer<IInsuranceApplicationState> = (state: IInsuranceApplicationState | undefined, incomingAction: Action): IInsuranceApplicationState => {
  if (state === undefined) {
    return unloadedState
  }

  const action = incomingAction as KnownAction
  switch (action.type) {
    case 'IA_RECEIVED':
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly
      // handle out-of-order responses.
      return {
        ...state,
        etag: action.etag,
        insuranceApplication: action.insuranceApplication
      }
    case 'UPDATE_ANSWERS_ON_INSURANCE_APPLICATION':
      let stageUpdatedAnswers = state.answeredQuestions?.find(x => x.stageOfProcess === action.updatedAnswers.stageOfProcess)
      let updatedAnswers = action.updatedAnswers
      if (stageUpdatedAnswers) {
        state.answeredQuestions?.splice(state.answeredQuestions.indexOf(stageUpdatedAnswers), 1)
        updatedAnswers.answers = action.updatedAnswers.answers.map(x => {
          let questionAnswered = stageUpdatedAnswers?.answers.find(q => q.questionInstanceId === x.questionInstanceId)
          if (questionAnswered) {
            questionAnswered.answer = x.answer
            return questionAnswered
          }
          return x
        })
      }
      if(!state.answeredQuestions){
        state.answeredQuestions = [];
      }
      state.answeredQuestions.push(updatedAnswers);
      return {
        ...state
      }
  }

  return state
}
