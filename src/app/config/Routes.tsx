import * as React from 'react'
import RatesList from '../rates/rates-list/RatesList'
import {HashRouter, Route } from 'react-router-dom'

const Routes: React.SFC<any> = () => {
    return (
        <HashRouter>
            <Route path='/' component={RatesList} />
        </HashRouter>
    )
}

export default Routes