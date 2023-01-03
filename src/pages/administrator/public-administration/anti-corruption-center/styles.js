import styled from "styled-components";

export const DenunciaCardList = styled.div`
display: flex;
	width: 40%;
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
	
`;

export const ContainerDenunciaList = styled.div`
    display: flex;
	width: 100%;
	align-items: flex-start;
	justify-content: space-around;
	flex-wrap: wrap;
`;

