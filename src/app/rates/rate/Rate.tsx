import * as React from 'react'
import './Rate.sass'

interface IRateProps {
    pair: string,
    buy: number,
    sell: number
}

const Rate = (props: IRateProps) => {
    const currency = props.pair.split(' ')[0]
    const [isBuyPriceInc, setIsBuyPriceInc] = React.useState(true)
    const [prevBuyPrice, setPrevBuyPrice] = React.useState(0)
    
    React.useEffect(
        () => {
            if (props.buy > prevBuyPrice) {
                setIsBuyPriceInc(true)
            } else {
                setIsBuyPriceInc(false)
            }
            setPrevBuyPrice(props.buy)
        },
        [props.buy]
    )

    const convertStrToArr = (currencyStr: number) => {
        const currencyArr = currencyStr.toString().substring(0,7).split('')
        for (let i = 0; i <= 6; i++) {
            if (!currencyArr[i]) {
                currencyArr[i] = '0'
            }
        }
        return currencyArr
    }

    const sell = convertStrToArr(props.sell) 
    const buy = convertStrToArr(props.buy)
    
    const content = (
        <div className="rate">
            <div className="rate-container">
                <h1>{props.pair}</h1>
                <div className="rate-body" >
                    <div className="currency-container currency-sell">
                        <div>Sell {currency}</div>
                        <div className="currency-value">
                        {   
                            sell.map((s: any, i: number) => s !== '.' ? <div key={i}>{s ? s : '0'}</div> : <span key={i}>{s}</span>)
                        }
                        </div>
                    </div>
                    <div className={isBuyPriceInc ? 'arrow arrow-green' : 'arrow arrow-red'} />
                    <div className="currency-container currency-buy">
                        <div>Buy {currency}</div>
                        <div className="currency-value">
                        {   
                            buy.map((b: any, i: number) => b !== '.' ? <div key={i}>{b ? b : '0'}</div> : <span key={i}>{b}</span>)
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    return content
}

export default Rate