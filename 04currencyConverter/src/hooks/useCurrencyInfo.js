// Custom Hooks

import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data, setData] = useState({})
    useEffect(() => {
        const code = (currency || "usd").toLowerCase()
        fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${code}.json`)
        .then((res) => res.json())
        .then((res) => setData(res?.[code] || {}))
        .catch((error) => {
            console.error("Currency fetch failed:", error)
            setData({})
        })
    }, [currency])
    return data
}

export default useCurrencyInfo;