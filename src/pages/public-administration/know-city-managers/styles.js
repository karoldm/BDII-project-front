import styled from "styled-components";

export const ContainerBase = styled.div`
	display: block;
	justify-content: space-around;
	height: 100vh;
	width: 100%;
`;

export const SubHeader = styled.div`
	display: flex;
	flex-direction: row;
	margin-top: -10.5vh;
	margin-bottom: 10.5vh;
	flex-wrap: wrap;
	padding-left: 2.5vw;

	h1 {
		margin-top: 4vh; 
		margin-left: 2.5vw; 
	}

	h4 { margin-top: 0vh; }
`;

export const ContainerColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-bottom: 10vh;
	flex-wrap: wrap;
`;

export const ContainerRow = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	margin-bottom: 10vh;
	flex-wrap: wrap;
`;

export const Square = styled.div`
	height: 140%;
	width: auto;
	margin-bottom: 5vh;
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	justify-content: center; 
`;

export const Details = styled.div`
	margin-top: 0;
	height: 63.5vw;
	width: 63.5vw;
	border: 0.25vh solid lightgray;
	border-radius: 10px;
	box-shadow: 5px 5px 10px gray;
	display: flex; 
	flex-direction: column; 
	align-items: center; 
	padding: 4vh;
	overflow-y: auto;

	::-webkit-scrollbar {
		width: 12px; 
	}
	::-webkit-scrollbar-track {
		background: lightgray;
		border-radius: 30px;
	}
	::-webkit-scrollbar-thumb {
		background: gray;
		border-radius: 30px;
	}
`;

export const ContainerInputs = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: space-around;
	margin-bottom: 2rem;

	select{
		width: 50%;
		height: 1.5rem;
		border-radius: 8px;
		margin-right: 10px;
		outline: 0.25vh solid lightgray;
		border: none;
	}

	button {
		width: 15%;
	}
`;

export const ContainerColumnCard = styled.div`
	display: flex;
	flex-direction: column;	
	overflow-y: auto;
	width: 100%;

	h2 { 
		margin-top: 7vh;
		color: #133d59;
		text-align: left; 
	}

	h3 {
		color: #133d59;
		text-align: left;
		margin-top: -1.9vh;
	}

	h4 {
		margin-bottom: 10vh;
		color: #1b262c;
		text-align: justify;
		font-size: 14px;
		font-weight: normal;
		margin-top: -1.5vh;
		margin-right: 2vw;
	}

	::-webkit-scrollbar {
		width: 12px; 
	}
	::-webkit-scrollbar-track {
		background: lightgray;
		border-radius: 30px;
	}
	::-webkit-scrollbar-thumb {
		background: gray;
		border-radius: 30px;
	}

	div {
		display: flex;
	}
`;

export const ListCardContainer = styled.div`
	display: flex;
	flex-direction: row;
	height: 35vh;
	width: 90%;
	border: 0.3vh solid lightgray;
	border-radius: 10px;
	margin-top: 1vh;
	margin-bottom: 4vh;
	padding-left: 2rem;

	img {
		align-self: center;
		height: 24vh;
		width: auto;
		opacity: 1;
		margin-right: 2vw;
	}
`;

export const ContainerGestorList = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: space-around;
	flex-wrap: wrap;
`;
