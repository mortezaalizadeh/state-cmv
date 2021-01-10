// https://dev.to/mychal/protected-routes-with-react-function-components-dh

import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedRoute = ({ component, ...rest }: any) => {

    function userIsAuthorizedToViewComponent(props: any): boolean {
        // the UserAccessService in the backend now handles the user role mappings to UI access levels
        // keeping this here for now in case we need to extend on this in future
        // for now at least check that the user has some sort of access level/permission
        // note the below !user check handles 1st time the app loads or page refreshes

        return true
    }

    const routeComponent = (props: any) => {
        if (userIsAuthorizedToViewComponent(props)) {
            return React.createElement(component, props)
        } else {
            return <Redirect to={{ pathname: '/unauthorized' }} />
        }
    }

    return <Route {...rest} render={routeComponent} />
}

export default ProtectedRoute
