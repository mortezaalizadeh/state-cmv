import React from "react";
import { Switch} from "react-router";
import ProtectedRoute from "./protectedRoute";
import NeedsAnalysis from '../pages/needsAnalysis.page';
import ProductRecommendation from '../pages/productRecommendation';
import BusinessDetails from '../pages/businessDetails';
import OtherCover from '../pages/otherCover';

const Routes = () => {
    return (
        <Switch>
            <ProtectedRoute exact path='/' component={NeedsAnalysis} />
            <ProtectedRoute exact path='/products' component={ProductRecommendation} />
            <ProtectedRoute exact path='/businessDetails' component={BusinessDetails} />
            <ProtectedRoute exact path='/otherCover' component={OtherCover} />

        </Switch>
    )
}

export default Routes