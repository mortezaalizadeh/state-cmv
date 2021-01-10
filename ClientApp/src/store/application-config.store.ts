import { Action, Reducer } from 'redux'
import { IApplicationConfig } from '../models/application-config'
import { IAppThunkAction as AppThunkAction } from './index'
import { ConfigurationService } from '../services/configuration.service'
import { HttpService } from '../services/http.service'
import { ITokenResponse } from '../models/tokenResponse'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IApplicationConfigState {
  configuration?: IApplicationConfig;
  authToken?: string;
  error?: Error;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface IGetApplicationConfigAction {
  type: 'GET_APPLICATION_CONFIG';
}

interface IGetApplicationConfigSuccessAction {
  type: 'GET_APPLICATION_CONFIG_SUCCESS';
  configuration: IApplicationConfig;
}

interface IGetApplicationConfigFailureAction {
  type: 'GET_APPLICATION_CONFIG_FAILURE';
  error: Error;
}

interface IGetTokenSuccessAction {
  type: 'GET_TOKEN_SUCCESS';
  authToken: string;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction =
  IGetApplicationConfigAction
  | IGetApplicationConfigSuccessAction
  | IGetApplicationConfigFailureAction
  | IGetTokenSuccessAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  getApplicationConfig: (callback?: () => void): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState()
    if (appState && !appState.configuration?.configuration) {
      const service = new ConfigurationService(new HttpService());
      service.getToken().then(tokenResponse =>{ 
        const token = tokenResponse.data as ITokenResponse;
        dispatch({ type: 'GET_TOKEN_SUCCESS', authToken: token.accessToken })
        
        service.getConfiguration()
          .then(configurationResponse => {
            dispatch({ type: 'GET_APPLICATION_CONFIG_SUCCESS', configuration: configurationResponse.data as IApplicationConfig })
            if (callback) {
              callback()
            }
          }).catch(reason => {
          dispatch({ type: 'GET_APPLICATION_CONFIG_FAILURE', error: reason })
        })
      })
      dispatch({ type: 'GET_APPLICATION_CONFIG' })
    }
  }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: IApplicationConfigState =
  {
    configuration: undefined
  }

export const reducer: Reducer<IApplicationConfigState> = (state: IApplicationConfigState | undefined, incomingAction: Action): IApplicationConfigState => {
  if (state === undefined) {
    return unloadedState
  }
  const action = incomingAction as KnownAction
  switch (action.type) {
    case 'GET_APPLICATION_CONFIG_SUCCESS':
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly
      // handle out-of-order responses.
      return {
        ...state,
        configuration: action.configuration
      }
    case 'GET_APPLICATION_CONFIG_FAILURE':
      return {
        error: action.error
      }
    case 'GET_TOKEN_SUCCESS':
      return {
        ...state,
        authToken :action.authToken
      }
  }

  return state
}
