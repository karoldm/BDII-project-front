import styled from "styled-components";

export const Form = styled.form`
	height: 78vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-bottom: 4vh;
	padding-top: 3vh;
`;

export const ContainerInputs = styled.div`
	display: flex;
	width: 57%;
	align-items: center;
	justify-content: space-between;

	select{
		width: 70%;
		height: 55%;
		border-radius: 8px;
		margin-right: 10px;
		outline: 0.25vh solid lightgray;
		border: none;
	}

	button {
		width: 10%;
	}
`;

export const GestorListCard = styled.div`
	display: flex;
	width: 24%;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem 1rem;
	border-radius: 8px;
	margin: 1rem;
	gap: 1rem;
	border: 0.25vh solid lightgray;
	color: #1b262c;

	p {
		padding: 0;
		margin: 0;
	}

	div{
		display: flex;
		width: 100%;
		gap: 2rem;
	}

	img {
		width: 5rem;
	}
`;

export const ContainerGestorList = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: space-around;
	flex-wrap: wrap;
`;

export const BoxModal = styled.div`
	display: flex;
	flex-direction: column;
	background-color: white;
	align-items: center;
	justify-content: center;
	width: 25%;
	height: auto;
	position: relative;
	top: 25%;
	left: 35%;
	border-radius: 8px;
	padding: 1rem;

	input {
		width: 165%;
	}
`;