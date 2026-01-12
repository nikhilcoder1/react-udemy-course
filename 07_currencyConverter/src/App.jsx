import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

/*
=====================================================
📌 Currency Converter – Project Flow (React)
=====================================================

1️⃣ App Initialization
   - App component initializes state variables using useState:
     • amount            → input amount entered by user
     • from               → source currency (default: USD)
     • to                 → target currency (default: INR)
     • convertedAmount    → final converted value

2️⃣ Custom Hook: useCurrencyInfo
   - App calls useCurrencyInfo(from)
   - The hook fetches live exchange rates from:
       https://open.er-api.com/v6/latest/USD
   - API returns all currency rates relative to USD
   - Only the `rates` object is stored and returned

3️⃣ Currency Options Setup
   - Object.keys(currencyInfo) is used
   - This dynamically populates currency dropdowns
   - Ensures dropdowns update automatically if API data changes

4️⃣ InputBox Component (Reusable UI)
   - Used twice:
     • "From" input → editable amount + currency
     • "To" input   → disabled amount + selectable currency
   - Props control:
     • amount
     • selected currency
     • dropdown options
     • change handlers

5️⃣ Conversion Logic (Core Formula)
   - Since API base currency is USD:
     
     Conversion Formula:
       (amount / rateOfFromCurrency) * rateOfToCurrency

   - This normalizes the amount from source currency
     and converts it into the target currency accurately

6️⃣ Convert Action
   - Triggered on form submit
   - Calculates convertedAmount using normalized formula
   - Updates UI instantly

7️⃣ Swap Functionality
   - Swaps source and target currencies
   - Swaps amount and convertedAmount
   - Maintains correct state synchronization

8️⃣ UI Rendering
   - Background image applied using inline styles
   - Tailwind CSS used for layout and responsiveness
   - Controlled inputs ensure real-time state updates

9️⃣ Result Display
   - Converted value displayed in "To" InputBox
   - Conversion button dynamically shows selected currencies

=====================================================
✔ Project Outcome:
   A clean, reusable, API-driven currency converter
   built using React Hooks and modern best practices.
=====================================================
*/


function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const convert = () => {
    if (!currencyInfo[from] || !currencyInfo[to]) return;

    const result =
      (amount / currencyInfo[from]) * currencyInfo[to];

    setConvertedAmount(result.toFixed(2));
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg')",
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-200 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            {/* FROM */}
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>

            {/* SWAP */}
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            {/* TO */}
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from} to {to}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;