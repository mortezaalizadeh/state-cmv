import * as IInsuranceApplicationStore from './insurance-application.store';
import * as IBusinessTypeStore from './business-type.store'
import * as IApplicationConfigStore from "./application-config.store";

// The top-level state object
export interface IApplicationState {
    configuration: IApplicationConfigStore.IApplicationConfigState | undefined;
    businessType: IBusinessTypeStore.IBusinessTypesState | undefined;
    insuranceApplication: IInsuranceApplicationStore.IInsuranceApplicationState | undefined;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    businessType: IBusinessTypeStore.reducer,
    insuranceApplication: IInsuranceApplicationStore.reducer,
    configuration: IApplicationConfigStore.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
