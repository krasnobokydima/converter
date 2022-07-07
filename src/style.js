import styled from "styled-components";
import {IoIosSwap} from 'react-icons/io';

export const Container = styled.div`
  width: 100%;
  max-width: 500px;
  padding: 0 20px;
  margin: auto;
`

export const ButtonsContainer = styled.div`
  display: flex;

  gap: 20px;
`
export const Swapping = styled(IoIosSwap)`
	font-size: 2em;
  cursor: pointer;

  transition: transform 0.3s ease;

	&:hover {
		transform: scale(105%);
	}

  &:active {
		transform: scale(110%);
	}
`

export const Button = styled.button`
    position: relative;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    transition: .3s ease-out;

    color: #fff;
    background-color: #26a69a;
    text-align: center;
    letter-spacing: .5px;

    border: none;
    border-radius: 2px;
    height: 36px;
    line-height: 36px;
    padding: 0 16px;
    text-transform: uppercase;
    width: 100px;

    &:focus {
      background-color: #1d7d74;
    }

    &:hover {
      background-color: #2bbbad;
    }
`;