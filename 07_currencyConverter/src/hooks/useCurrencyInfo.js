import { useEffect , useState } from "react";

function useCurrencyInfo(currency){
    const [data,setData] = useState({})

    useEffect(()=> {
        fetch(`https://open.er-api.com/v6/latest/USD`)
        .then((res)=>res.json())
        .then((res)=>{
            setData(res.rates)
        })
        .catch((error) => console.error("API Error:", error));
    },[currency])

    return data;
}

export default useCurrencyInfo;