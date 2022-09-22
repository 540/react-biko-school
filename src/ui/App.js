import './_styles/index'
import { Home } from './Home/Home'
import { ThemeProvider } from './_context/ThemeContext'

export const App = () => {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  )
}
