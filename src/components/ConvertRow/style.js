import styled from "styled-components";

export const Container = styled.div`
	display: flex;
  align-items: baseline;
	gap: 15px;

	margin-bottom: 8px;
`;

export const Input = styled.input`
	border: none;
	border-bottom: 1px solid #9e9e9e;
	outline: none;
	height: 50px;
	font-size: 16px;
	transition: box-shadow 0.3s, border 0.3s;
  flex-grow: 1;

  &:focus {
    border-color: #26a69a;
    box-shadow: 0 1px 0 0 #26a69a;
  }
`;

export const Select = styled.select`
	position: relative;
	cursor: pointer;
	border: none;
	border-bottom: 1px solid #9e9e9e;
	outline: none;
	height: 51px;
	font-size: 16px;

  flex-grow: 0;
`;

export const Option = styled.option`
	background-color: #fff;
	margin: 0;
	min-width: 100px;
	overflow-y: auto;
	opacity: 0;
	position: absolute;
	left: 0;
	top: 0;
	transform-origin: 0 0;
`;


