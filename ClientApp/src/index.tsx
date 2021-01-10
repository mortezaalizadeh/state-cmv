import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import configureStore from './store/configureStore'
import App from './App'
import { ChromaProvider } from './components/chromaComponents'
import { BrowserRouter } from 'react-router-dom'

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string
const history = createBrowserHistory()

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(history)

ReactDOM.render(
  <ChromaProvider>
    <BrowserRouter basename={baseUrl}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChromaProvider>,
  document.getElementById('root')
)
