import { RouterProvider } from 'react-router'
import { router } from '@app/routes'
import { uiLogger } from '@shared/libs/logger'
import { withProviders } from '@app/providers'

const PreApp = () => {
  uiLogger.debug('Render:', PreApp.name)

  return <RouterProvider router={router} />
}

const App = withProviders(PreApp)

export default App
