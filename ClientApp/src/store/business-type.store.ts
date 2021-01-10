import { Action, Reducer } from 'redux'
import { IAppThunkAction as AppThunkAction } from './'
import { IBusinessType } from '../models/businessType'
import { BusinessTypesService } from '../services/business-types.service'
import { HttpService } from '../services/http.service'

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface IBusinessTypesState {
  businessTypes: IBusinessType[];
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface IGetBusinessTypesAction {
  type: 'GET_BUSINESS_TYPES';
}

interface IGetBusinessTypesSuccessAction {
  type: 'GET_BUSINESS_TYPES_SUCCESS';
  businessTypes: IBusinessType[];
}

interface IGetBusinessTypesFailureAction {
  type: 'GET_BUSINESS_TYPES_FAILURE';
  error: Error;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = IGetBusinessTypesAction | IGetBusinessTypesSuccessAction | IGetBusinessTypesFailureAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
  getBusinessTypes: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
    // Only load data if it's something we don't already have (and are not already loading)
    const appState = getState()
    if (appState && appState.businessType?.businessTypes.length === 0) {

      if (!appState.configuration?.configuration?.apiUrls.businessTypeReference) {
        throw new Error('Failed to load configuration for BT.Read.')
      }

      const service = new BusinessTypesService(appState.configuration.configuration.apiUrls.businessTypeReference, new HttpService())

      service.getBusinessTypes(appState.configuration.authToken)
        .then((response) => {
          dispatch({ type: 'GET_BUSINESS_TYPES_SUCCESS', businessTypes: response.data as IBusinessType[] })
        })

      dispatch({ type: 'GET_BUSINESS_TYPES' })
    }
  }
}

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: IBusinessTypesState = { businessTypes: [] }

export const reducer: Reducer<IBusinessTypesState> = (state: IBusinessTypesState | undefined, incomingAction: Action): IBusinessTypesState => {
  if (state === undefined) {
    return unloadedState
  }

  const action = incomingAction as KnownAction
  switch (action.type) {
    case 'GET_BUSINESS_TYPES':
      break
    case 'GET_BUSINESS_TYPES_SUCCESS':
      // Only accept the incoming data if it matches the most recent request. This ensures we correctly
      // handle out-of-order responses.
      return {
        businessTypes: action.businessTypes
      }
      break
  }

  return state
}
