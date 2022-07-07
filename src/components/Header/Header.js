import React from "react";
import { Container, Table, Title, Thead, Tbody, Tr, Th, Td } from "./style";

const Header = ({ currency }) => (
	<Container>
		<Title>Exchange rate in Ukraine</Title>
		<Table>
			<Thead>
				<Tr>
					<Th>Currency code</Th>
					<Th>Buy</Th>
					<Th>Sale</Th>
				</Tr>
			</Thead>

			<Tbody>
				{currency.map((element) => (
					<Tr key={element.ccy}>
						<Td>{element.ccy}</Td>
						<Td>{element.buy}</Td>
						<Td>{element.sale}</Td>
					</Tr>
				))}
			</Tbody>
		</Table>
	</Container>
);

export default Header;
