import logo from './logo.svg'
import { PageContextProvider } from './usePageContext'
import './PageShell.css'
import { Link } from './Link'

import { Provider } from 'react-redux'
import { getStore } from './store'

export { PageShell }

const PageShell = function ({ children, pageContext }) {
  // NOTE(aurelien): actually initializing the store here is probably not a good idea as it has to be done in different
  // ways whether we are on client or on server. So probably this should be moved to +onRenderHtml.jsx and
  // +onRenderClient.jsx . See also:
  // * https://github.com/brillout/vike-with-redux/blob/main/renderer/%2BonRenderClient.jsx
  // * https://redux.js.org/usage/server-rendering
  const store = getStore({})
  return (
    <Provider store={store}>
      <PageContextProvider pageContext={pageContext}>
        <Layout>
          <Sidebar>
            <Logo />
            <Link className="navitem" href="/">
              Home
            </Link>
            <Link className="navitem" href="/about">
              About
            </Link>
          </Sidebar>
          <Content>{children}</Content>
        </Layout>
      </PageContextProvider>
    </Provider>
  )
}

const Layout = function ({ children }) {
  return (
    <div
      style={{
        display: 'flex',
        maxWidth: 900,
        margin: 'auto'
      }}
    >
      {children}
    </div>
  )
}

const Sidebar = function ({ children }) {
  return (
    <div
      style={{
        padding: 20,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        lineHeight: '1.8em'
      }}
    >
      {children}
    </div>
  )
}

const Content = function ({ children }) {
  return (
    <div
      id="page-content"
      style={{
        padding: 20,
        paddingBottom: 50,
        borderLeft: '2px solid #eee',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  )
}

function Logo() {
  return (
    <div
      style={{
        marginTop: 20,
        marginBottom: 10
      }}
    >
      <a href="/">
        <img src={logo} height={64} width={64} alt="logo" />
      </a>
    </div>
  )
}
