import { useState, useEffect } from 'react'

export const useRates = (url: string, dependencies: any) => {
    const [isError, setIsError] = useState(false)
    const emptyArr: Array<{_id: number, pair: string, buy: number, sell: number}> = []
    const [fetchedData, setFetchedData] = useState({ count: 0, rates: emptyArr })
    let fetchingInterval: any

    const loadData = () => {
        setIsError(false)
        console.log('Sent http request')
        fetch(url)
            .then(response => {
                if (!response) {
                    throw new Error('Failed to fetch.')
                }
                return response.json()
            })
            .then((data: {count: number, rates: Array<{_id: number, pair: string, buy: number, sell: number}>}) => {
                console.dir(data)
                setFetchedData(data)
            })
            .catch(err => {
                console.dir(err)
                setIsError(true)
            })
    }

    useEffect(
        () => {
            loadData()
            fetchingInterval = setInterval(loadData, 5000);
            return () => {
                clearInterval(fetchingInterval)
            }
        },
        dependencies
    )

    return { isError, fetchedData }
}