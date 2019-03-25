import * as React from 'react'
import { useRates } from '../useRates'
import './RatesList.sass'
import Rate from '../rate/Rate';

const RatesList = () => {
  let content
  const { isError, fetchedData } = useRates('http://localhost:8080/rates', {})
  const rates = fetchedData ? fetchedData.rates : []

  if (isError) {
    content = <div className="rates"><h1>Error</h1></div>
  } else {
    if (!rates) {
      content = (
        <div className="loading-msg-container">
          <div className="lds-default"><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /><div /></div>
          <h1>Loading...</h1>
        </div>
      )
    } else {
      content = (
        <div className="rates">
            {
              rates.map(rate => {
                return <Rate key={rate._id} pair={rate.pair} buy={rate.buy} sell={rate.sell} />
              })
            }
        </div>
      )
    }
  }

  return content
}

export default RatesList