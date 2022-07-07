import { useEffect, useState } from "react";

import { Container, ButtonsContainer, Swapping, Button } from "./style";
import ConvertRow from "./components/ConvertRow";
import Header from "./components/Header";

import { preparingData, roundedNumber } from "./helpers";
import axios from "axios";

const URL_CASH =
	"https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

function App() {
	const [currencyData, setCurrencyData] = useState([]);
	const [currencyExchange, setCurrencyExchange] = useState({});
	const [buyingOrSale, setBuyingOrSale] = useState(true);

	const [status, setStatus] = useState();

	useEffect(() => {
		const getDataFromServer = async () => {
			const { data, status } = await axios.get(URL_CASH);
			const { indexes, codes, date } = preparingData(data);

			setCurrencyData({ indexes, codes, date, dataFromServer: data });
			setCurrencyExchange({
				fromCurrency: codes[0], //usd
				toCurrency: codes[1], //uah

				fromCurrencyAmount: 1,
				toCurrencyAmount: roundedNumber(
					indexes[codes[0]].buy / indexes[codes[1]].buy
				),
			});

			setStatus(status);
		};

		getDataFromServer();
	}, []);

	const getCurrentIndex = ({
		value = buyingOrSale,
		from = currencyExchange.fromCurrency,
		to = currencyExchange.toCurrency,
	} = {}) => {
		const { indexes } = currencyData;

		const buyOrSale = value ? "buy" : "sale";

		const indexFrom = indexes[from][buyOrSale];
		const indexTo = indexes[to][buyOrSale];

		return { indexFrom, indexTo };
	};

	const handleBuyOrSale = () => {
		const { indexFrom, indexTo } = getCurrentIndex({ value: !buyingOrSale });

		setCurrencyExchange((prev) => ({
			...prev,
			toCurrencyAmount: roundedNumber(
				prev.fromCurrencyAmount * (indexFrom / indexTo)
			),
		}));

		setBuyingOrSale(!buyingOrSale);
	};

	const swapTheRulesOfExchange = () => {
		setCurrencyExchange((prev) => ({
			...prev,
			fromCurrency: prev.toCurrency,
			toCurrency: prev.fromCurrency,
			fromCurrencyAmount: prev.toCurrencyAmount,
			toCurrencyAmount: prev.fromCurrencyAmount,
		}));
	};

	const handleFromCurrencyOption = ({ target }) => {
		if (target.value === currencyExchange.fromCurrency) return;
		if (target.value === currencyExchange.toCurrency)
			return swapTheRulesOfExchange();

		const { indexFrom, indexTo } = getCurrentIndex({ from: target.value });

		setCurrencyExchange((prev) => ({
			...prev,
			fromCurrency: target.value,
			toCurrencyAmount: roundedNumber(
				prev.fromCurrencyAmount * (indexFrom / indexTo)
			),
		}));
	};

	const handleToCurrencyOption = ({ target }) => {
		if (target.value === currencyExchange.toCurrency) return;

		if (target.value === currencyExchange.fromCurrency)
			return swapTheRulesOfExchange();

		const { indexFrom, indexTo } = getCurrentIndex({ to: target.value });

		setCurrencyExchange((prev) => ({
			...prev,
			toCurrency: target.value,
			toCurrencyAmount: roundedNumber(
				prev.fromCurrencyAmount * (indexFrom / indexTo)
			),
		}));
	};

	const handleFromCurrencyAmount = ({ target: {value} }) => {
		let fromCurrencyAmount = value < 0 ? - value : value;;

		const { indexFrom, indexTo } = getCurrentIndex();

		const toCurrencyAmount = roundedNumber(value * (indexFrom / indexTo));
		setCurrencyExchange((prev) => ({
			...prev,
			fromCurrencyAmount,
			toCurrencyAmount,
		}));
	};

	const handleToCurrencyAmount = ({ target: {value} }) => {
		let toCurrencyAmount = value < 0 ? - value : value;

		const { indexFrom, indexTo } = getCurrentIndex();

		const fromCurrencyAmount =
			Math.round(value * (indexTo / indexFrom) * 1000) / 1000;
		setCurrencyExchange((prev) => ({
			...prev,
			toCurrencyAmount,
			fromCurrencyAmount,
		}));
	};

	return (
		<Container>
			{status === 200 ? (
				<>
					<Header
						currency={currencyData.dataFromServer}
					/>
					<ConvertRow
						currencyOptions={currencyData.codes}
						selectCurrencyOption={currencyExchange.fromCurrency}
						handleCurrencyOption={handleFromCurrencyOption}
						amount={currencyExchange.fromCurrencyAmount}
						changeAmount={handleFromCurrencyAmount}
					/>
					<ConvertRow
						currencyOptions={currencyData.codes}
						selectCurrencyOption={currencyExchange.toCurrency}
						handleCurrencyOption={handleToCurrencyOption}
						amount={currencyExchange.toCurrencyAmount}
						changeAmount={handleToCurrencyAmount}
					/>
					<ButtonsContainer>
						<Swapping onClick={swapTheRulesOfExchange}/>
						<Button onClick={handleBuyOrSale}>{buyingOrSale ? "BUY" : "SALE"}</Button>
					</ButtonsContainer>
				</>
			) : status < 399 ? (
				<h1>loading...</h1>
			) : (<h1>Oops..</h1>)}
		</Container>
	);
}

export default App;

