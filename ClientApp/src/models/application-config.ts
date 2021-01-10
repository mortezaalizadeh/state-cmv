
export interface IApiUrl{
    apiHost: string;
    apiVersion: string;
}
export interface IBusinessTypeApi extends IApiUrl {
    businessTypePath:string;
    occupationIntentPath:string;
}

export interface IVehicle extends IApiUrl {
    vehiclePath:string;
}

export interface ILocation extends IApiUrl {
    locationPath:string;
}

export interface ITaskRead extends IApiUrl {
    getTaskPath:string;
}

export interface IQuoteWrite extends IApiUrl {
    createQuotePath:string;
    createPartyPath:string;
    updatePartyPath:string;
    emailQuotePath:string;
    requestCoverPath:string;
    declarationanswers:string;
    callbackRequest:string;
    acceptQuoteRequest:string;
    updatePaymentPreferencesRequest:string;
    updatePaymentInstructions:string;

}
export interface IIARead extends IApiUrl {
    getInsuranceApplicationPath:string;
}

export interface IIAWrite extends IApiUrl{
    createInsuranceApplicationPath:string;
    addQuestionInstance:string;
    removeQuestionInstance:string;
    addProductInstancePath:string;
    removeProductInstancePath:string;
    updateAnswersPath:string;
}


export interface IQuoteFinalisationUrls {
    financialStrength: string;
    qfeDisclosure: string;
    privacyPolicy: string;
    termsOfUse: string;
}

interface IIApiUrls {
    iaWrite:IIAWrite
    iaRead:IIARead
    taskRead:ITaskRead
    quoteWrite:IQuoteWrite
    locationReference:ILocation
    vehicleReference:IVehicle
    businessTypeReference:IBusinessTypeApi
}

interface IWebAppUrl {
    websiteHost: string;
}
interface IPaymentWebAppUrl extends IWebAppUrl {
    paymentPath:string;
}

interface IWebAppUrls {
    paymentWebsite:IPaymentWebAppUrl;
}

export interface IApplicationConfig {
    slotVersion: string;
    apiUrls: IIApiUrls;
    appInsightsPublicKey?: string;
    headerUrl: string;
    footerUrl: string;
    quoteFinalisationUrls: IQuoteFinalisationUrls;
    brand: string;
    title: string;
    webAppUrls: IWebAppUrls;
    currentNzDate: string;
}

