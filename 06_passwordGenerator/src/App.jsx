import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

/*
=====================================
PASSWORD GENERATOR – PROJECT FLOW
=====================================

1. INITIAL SETUP
   - Import required React hooks:
     useState     → manage UI state
     useCallback  → memoize functions
     useEffect    → handle side effects
     useRef       → access DOM elements
   - Initialize state for:
     • password length
     • number inclusion
     • special character inclusion
     • generated password

2. STATE MANAGEMENT
   - length           → controls password size via range input
   - numberAllowed    → toggles numeric characters
   - charAllowed      → toggles special characters
   - password         → stores generated password string

3. PASSWORD GENERATION LOGIC
   - Base character set starts with uppercase + lowercase letters
   - Conditionally append:
     • numbers if numberAllowed is true
     • special characters if charAllowed is true
   - Generate random password:
     • loop runs `length` times
     • random index selected from character set
     • character appended to password string
   - Update password state using setPassword()

4. FUNCTION OPTIMIZATION
   - generatePassword() is wrapped with useCallback
     to prevent unnecessary re-creation on every render
   - Dependencies include:
     length, numberAllowed, charAllowed

5. SIDE EFFECT HANDLING
   - useEffect triggers password generation whenever:
     • length changes
     • numberAllowed changes
     • charAllowed changes
   - Ensures password stays in sync with user preferences

6. COPY TO CLIPBOARD FEATURE
   - useRef stores reference to password input field
   - Clipboard API copies password text
   - Input field is programmatically selected for better UX

7. USER INTERFACE FLOW
   - Password displayed in read-only input field
   - Range slider controls password length
   - Checkboxes toggle numbers and special characters
   - "Copy" button copies generated password

8. RE-RENDER CYCLE
   - Any state change → re-render
   - useEffect → regenerates password
   - UI updates automatically with new password

=====================================
END OF FLOW
=====================================
*/


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let generatedPassword = "";

    if (numberAllowed) characters += "0123456789";
    if (charAllowed) characters += "!@#$%^&*()_+";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters.charAt(randomIndex);
    }

    setPassword(generatedPassword);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    if (!password) return;

    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
      <h1 className="text-white text-center my-3 text-xl font-semibold">
        Password Generator
      </h1>

      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          readOnly
          ref={passwordRef}
          className="outline-none w-full py-1 px-3 bg-gray-900 text-white"
          placeholder="Password"
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 hover:bg-blue-800 text-white px-3 py-0.5 shrink-0"
        >
          Copy
        </button>
      </div>

      <div className="flex flex-col gap-y-3 text-sm">
        <div className="flex items-center gap-x-2">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="cursor-pointer"
          />
          <label>Length: {length}</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>Include Numbers</label>
        </div>

        <div className="flex items-center gap-x-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Include Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;