import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

/*
========================================================
CRYPTO-SECURE PASSWORD GENERATOR – COMPLETE PROJECT FLOW
========================================================

1. APPLICATION INITIALIZATION
   - Import React hooks:
     • useState     → manage component state
     • useCallback  → memoize functions for performance
     • useEffect    → handle side effects
     • useRef       → access DOM elements
   - Component renders for the first time with default state values.

2. STATE MANAGEMENT
   - length           → password length (controlled by range input)
   - numberAllowed    → boolean flag to include numeric characters
   - charAllowed      → boolean flag to include special characters
   - password         → stores the generated password string

3. CHARACTER SET CONSTRUCTION
   - Start with base character set:
     • uppercase letters (A–Z)
     • lowercase letters (a–z)
   - Conditionally append:
     • digits (0–9) if numberAllowed is true
     • special characters if charAllowed is true
   - Final character set is dynamic and depends on user selections.

4. CRYPTO-SECURE PASSWORD GENERATION
   - Create a typed array (Uint32Array) of size `length`.
   - Use Web Crypto API:
     • crypto.getRandomValues()
     • Generates cryptographically secure, unpredictable random numbers.
   - Map each random number to a valid character index using modulo (%).
   - Build the password by appending characters one by one.
   - Store the final password in React state.

5. FUNCTION OPTIMIZATION
   - Password generation logic is wrapped in useCallback
     to prevent unnecessary function re-creation.
   - Dependency array includes:
     • length
     • numberAllowed
     • charAllowed

6. SIDE EFFECT HANDLING (AUTO-REGENERATION)
   - useEffect monitors:
     • length
     • numberAllowed
     • charAllowed
   - Whenever any dependency changes:
     • generatePassword() is triggered
     • password stays in sync with user preferences.

7. COPY TO CLIPBOARD FEATURE
   - useRef holds reference to the password input element.
   - Clipboard API copies password to system clipboard.
   - Input field is programmatically selected for better UX.

8. USER INTERFACE FLOW
   - Read-only input displays the generated password.
   - Range slider updates password length.
   - Checkboxes toggle numbers and special characters.
   - Copy button copies the password instantly.

9. RE-RENDER & UPDATE CYCLE
   - State change → component re-renders.
   - useEffect → regenerates password if needed.
   - UI reflects updated password automatically.

========================================================
END OF PROJECT FLOW
========================================================
*/

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) characters += "0123456789";
    if (charAllowed) characters += "!@#$%^&*()_+";

    // Step 1: Create a typed array for secure randomness
    const randomValues = new Uint32Array(length);

    // Step 2: Fill array with cryptographically secure random numbers
    window.crypto.getRandomValues(randomValues);

    // Step 3: Map random values to characters
    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const index = randomValues[i] % characters.length;
      generatedPassword += characters[index];
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
        />
        <button
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 text-white px-3"
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