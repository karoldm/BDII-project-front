import React, { useState } from "react";
import { Link } from "react-router-dom";
import PagesPieChart from "../../../charts/types/donut";

import { FormContainer, InputLocalization } from "./styles";

import Header from "../../../components/header";
import MiniCard from "../../../components/mini-card";
import ServiceDescription from "../../../components/service-description";
import Input from "../../../components/input";
import DescriptionInput from "../../../components/description-input";
import InputPhotos from "../../../components/images-input";
import Button from "../../../components/styled-components/form-button";
import GrayLine from "../../../components/styled-components/gray-line";
import { ChartContainer } from "../../../charts/types/donut/chart";
import Footer from "../../../components/footer";

import Typography from "@mui/material/Typography";
import {
	ContainerBase,
	ContentContainer,
	TopContentContainer,
	DescriptionText,
	MidContentContainer,
} from "../../../components/styled-components/PageStyles";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { StyledHr } from "../../../components/styled-components/StyledHr";

const AnimaisPerdidosNovo = () => {
	// posteriormente passar o número de solicitados e de resolvidos por parâmetro //
	const totalSolicitados = 84;
	const totalResolvidos = 78;
	const [isFavorite, setIsFavorite] = useState(false);
	const handleFavorite = () => {
		setIsFavorite(!isFavorite);
		console.log("você favoritou este serviço");
	};

	return (
		<ContainerBase>
			<Header />
			<ContentContainer>
				<TopContentContainer>
					<MiniCard
						source="/assets/img/home_animais_domesticos.png"
						titulo="Animais Domésticos"
						linkItems={[
							{
								id: 1,
								name: "Animais Abandonados",
								link: "/animais_abandonados",
							},
							{
								id: 2,
								name: "Animais Perdidos",
								link: "/animais_perdidos_opcoes",
							},
							{
								id: 3,
								name: "Maus tratos à Animais",
								link: "/maus_tratos",
							},
							{
								id: 4,
								name: "Animais Sinantrópicos",
								link: "/animais-sinantropicos",
							},
							{
								id: 5,
								name: "Adoção de Animais",
								link: "/adocao_animais",
							},
						]}
					/>
					<div style={{ marginTop: "14px" }}>
						<div style={{ textAlign: "center" }}>
							<Typography variant="h4">
								Animais Perdidos
							</Typography>
						</div>
						<DescriptionText>
							Utilize este serviço para cadastrar um novo animal
							perdido na lista. Para checar a lista completa,
							clique
							<Link
								to="/animais_perdidos_lista"
								style={{ textDecoration: "none" }}
							>
								{" "}
								AQUI
							</Link>
							.
						</DescriptionText>
					</div>
					{isFavorite ? (
						<span>
							<AiFillStar
								style={{
									cursor: "pointer",
									margin: ".8rem",
									stroke: "black",
									strokeWidth: "5",
								}}
								color={"yellow"}
								size={25}
								onClick={() => handleFavorite()}
							/>
						</span>
					) : (
						<AiOutlineStar
							style={{
								cursor: "pointer",
								margin: ".8rem",
								stroke: "black",
								strokeWidth: "5",
							}}
							size={25}
							onClick={() => handleFavorite()}
						/>
					)}
					<StyledHr />
				</TopContentContainer>
				<MidContentContainer>
					<FormContainer>
						<Input
							title="Última vez que o seu animal foi visto:"
							placeholder="data e hora, se possível lembrar."
						/>
						<Input
							title="O último local em que seu animal foi visto:"
							placeholder="pontos de referência, endereço, o que for possível..."
						/>
						<p> OU </p>
						<Link
							to="/localizacao"
							target="_blank"
							rel="noopener noreferrer"
						>
							<InputLocalization style={{ marginBottom: "4vh" }}>
								{" "}
								Usar Localização Atual{" "}
							</InputLocalization>
						</Link>
						<DescriptionInput
							title="Descrição do animal:"
							placeholder="conte-nos em detalhes a raça, aparência, nome e tudo o que puder facilitar a identificação do seu animal."
						/>
						<InputPhotos />
						<Button text="Enviar" />
					</FormContainer>
				</MidContentContainer>
			</ContentContainer>
			<GrayLine />
			<ChartContainer>
				<h3>
					{" "}
					Buscas por animais solicitadas e buscas bem-sucedidas:{" "}
				</h3>
				<PagesPieChart
					solved={totalResolvidos}
					unsolved={totalSolicitados}
				/>
			</ChartContainer>
			<Footer />
		</ContainerBase>
	);
};
export default AnimaisPerdidosNovo;
