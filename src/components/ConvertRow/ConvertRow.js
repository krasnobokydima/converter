import React from "react";

import { Container, Input, Select, Option } from "./style";

const ConvertRow = ({
	currencyOptions: codes,
	selectCurrencyOption: select,
	handleCurrencyOption: onChange,
	amount,
	changeAmount,
}) => {
	return (
		<Container>
			<Input
				type="number"
				id="fromNumber"
				placeholder={select}
				onChange={changeAmount}
				value={amount ? amount : ""}
			/>

			<Select value={select} onChange={onChange} className="browser-default">
				{codes.map((option) => (
					<Option value={option} key={option}>
						{option}
					</Option>
				))}
			</Select>
		</Container>
	);
};

export default ConvertRow;
