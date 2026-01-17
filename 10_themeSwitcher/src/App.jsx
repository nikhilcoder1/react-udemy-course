
import { useEffect, useState } from 'react'
import './App.css'
import { ThemeProvider } from './contexts/theme'
import ThemeBtn from './components/ThemeBtn'
import Card from './components/Card'

/*
=====================================================
THEME TOGGLE PROJECT – COMPLETE FLOW (Context API)
=====================================================

1. App.jsx (Source of Truth)
--------------------------------
- App.jsx maintains the global theme state using useState.
- `themeMode` can be either "light" or "dark".
- Two functions (`lightTheme` and `darkTheme`) are created to update the theme
  instead of exposing setState directly to child components.

2. ThemeContext (Global State Sharing)
--------------------------------
- ThemeContext is created using createContext.
- ThemeProvider is used to wrap the component tree so that
  all child components can access the theme state and functions.
- A custom hook `useTheme()` is used to consume the context
  for cleaner and reusable code.

3. Providing Context Values
--------------------------------
- App.jsx wraps the UI with <ThemeProvider />.
- The following values are passed via context:
    - themeMode       → current theme ("light" / "dark")
    - lightTheme()    → function to switch to light mode
    - darkTheme()     → function to switch to dark mode

4. Theme Button (State Modifier)
--------------------------------
- ThemeBtn component consumes the context using `useTheme()`.
- A checkbox toggle is used:
    - Checked   → Dark mode
    - Unchecked → Light mode
- On toggle, corresponding theme functions are called
  which update the state in App.jsx.

5. Theme Side Effect (DOM Sync)
--------------------------------
- A useEffect listens for changes in `themeMode`.
- Whenever the theme changes:
    - Existing "light" and "dark" classes are removed from <html>.
    - The new theme class is added to <html>.
- This is required because Tailwind CSS dark mode
  depends on the presence of the "dark" class on the html element.

6. UI Components (Theme Consumers)
--------------------------------
- Components like Card do NOT directly use Context.
- They rely on Tailwind's `dark:` utility classes.
- Once the html class changes, Tailwind automatically
  applies the correct styles across the UI.

7. Overall Data Flow
--------------------------------
ThemeBtn click
   → Context function called
      → App state updates
         → useEffect runs
            → html class updated
               → Tailwind dark styles activate
                  → UI updates everywhere

=====================================================
END OF FLOW
=====================================================
*/


function App() {
  const [themeMode, setThemeMode] = useState("light")

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  // actual change in theme

  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector('html').classList.add(themeMode)
  }, [themeMode])
  

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      <div className="flex flex-wrap min-h-screen items-center">
          <div className="w-full">
              <div className="w-full max-w-sm mx-auto flex justify-end mb-4">
                  <ThemeBtn />
              </div>

              <div className="w-full max-w-sm mx-auto">
                  <Card />
              </div>
          </div>
      </div>
    </ThemeProvider>
  )
}

export default App;