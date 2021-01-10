import React, {Fragment, useContext, useEffect} from 'react'
import { Helmet } from 'react-helmet'
import { version } from '../package.json'
import * as constants from './config/globals'

import {
    getCssUrl,
    getAssetsPath,
    ChromaContext,
    Image,
    Text,
    Footer,
    Main,
} from './components/chromaComponents'
import Routes from "./routing/routes";
import PageHeader from './components/pageHeader/pageHeader'

const App = () => {
    const value: any = useContext(ChromaContext)
    const { brand, setBrand  } = value
    
    useEffect(() => {
        setBrand('ami');
    }, [])
    
    return (
        <Fragment>
            <Helmet>
                <link href={getCssUrl(brand)} rel="stylesheet" />
                <meta name="description" content={`product v${version}`} />
            </Helmet>
            <PageHeader/>
            <Main>
                <Routes />
            </Main>
            <Footer>
                <Image height="40" src={`${getAssetsPath()}/svgs/backed-by-iag/dark.svg`} alt="Backed by IAG" />
                <Text fontSize={14}>
                    © {constants.ORG_NAME} {new Date().getFullYear()} - ABN 11 000 016 722
                </Text>
            </Footer>
        </Fragment>
    )
}

export default App

