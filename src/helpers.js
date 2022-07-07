export function preparingData(data) {
	const preparedCode = data.reduce((acc, el) => {
		if (!acc.includes(el.base_ccy)) {
			acc.push(el.base_ccy);
		}

		if (!acc.includes(el.ccy)) {
			acc.push(el.ccy);
		}

		return acc;
	}, []);

	const preparedIndex = preparedCode.reduce((acc, el) => {
		const elInfo = data.find((element) => element.ccy === el);

		acc[el] = {
			buy: elInfo?.buy || 1,
			sale: elInfo?.sale || 1,
		};

		return acc;
	}, []);

	return {
		codes: preparedCode,
		indexes: preparedIndex,
		date: new Date().toJSON().slice(0, 10).split("-").reverse().join("."),
	};
}

export function roundedNumber(number) {
	return Math.round(number * 100000) / 100000;
}