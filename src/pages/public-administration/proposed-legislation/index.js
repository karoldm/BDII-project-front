import { useState, useEffect } from "react";
import Header from "../../../components/header";
import {
	ContainerBase,
	ContentContainer,
	TopContentContainer,
	DescriptionText,
	MidContentContainer,
} from "../../../components/styled-components/PageStyles";
import MiniCard from "../../../components/mini-card";
import ProposedCard from "../../../components/card-proposed";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import { StyledHr } from "../../../components/styled-components/StyledHr";
import Footer from "../../../components/footer";
import Favorites from "../../../components/favorites";

import { ContainerPropostaList, ContainerInputs } from './styles';
import Button from "../../../components/styled-components/form-button";
import Input from "../../../components/input";


const propostasTeste = [
	{
		nameGestor: 'nome do gestor',
		titulo: 'titulo da proposta',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		dataAprovacao: '2023-01-01'
	},
	{
		nameGestor: 'nome do gestor 02',
		titulo: 'titulo da proposta',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		dataAprovacao: '2023-01-01'
	}
];

const ProposedLegislation = (props) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [propostas, setPropostas] = useState([]);

	useEffect(() => {
		setPropostas(propostasTeste)
		props.data.find(
			(favoriteX) => favoriteX.id === 47 && setIsFavorite(true)
		);
	}, []);

	const handleFavorite = () => {
		if (!isFavorite) {
			props.handleAddFavorite({
				id: 47,
				name: "Consultar propostas dos vereadores",
				img: "/assets/img/home_administracao_publica.png",
				link: "/consultar-propostas-de-leis",
			}); //se favoritou o servico
		} else {
			props.handleSubFavorite({
				id: 47,
				name: "Consultar propostas dos vereadores",
				img: "/assets/img/home_administracao_publica.png",
				link: "/consultar-propostas-de-leis",
			}); //se desfavoritou o servico
		}
		setIsFavorite(!isFavorite);
	};

	const handleFilter = (gestorFilter) => {
		setPropostas(propostasTeste);
		const propostasFiltered = propostasTeste.filter((proposta) => proposta.nameGestor.includes(gestorFilter));
		setPropostas(propostasFiltered);
	}

	return (
		<ContainerBase>
			<Header />
			<Favorites data={props.data} />
			<ContentContainer>
				<TopContentContainer>
					<MiniCard
						source="/assets/img/home_administracao_publica.png"
						titulo="Administração Pública"
						linkItems={[
							{
								id: 1,
								name: "Conheça os Gestores",
								link: "/conheca_os_gestores",
							},
							{
								id: 2,
								name: "Consultar as propostas dos vereadores",
								link: "/consultar-propostas-de-leis",
							},
							{
								id: 3,
								name: "Central Anticorrupção",
								link: "/central-anticorrupcao",
							},
						]}
					/>
					<div style={{ marginTop: "14px" }}>
						<div style={{ textAlign: "center" }}>
							<Typography variant="h4">
								Consultar propostas dos vereadores
							</Typography>
						</div>
						<DescriptionText>
							Neste serviço você pode acompanhar propostas de leis
							dos vereadores de sua cidade.
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
					<ContainerInputs>
						<b>Filtrar propostas por gestor</b>
						<Input title="" onChange={(e) => handleFilter(e.target.value)} />
						<Button type='button' text='Todos' onClick={() => setPropostas(propostasTeste)} />
					</ContainerInputs>
					<ContainerPropostaList>
						{
							propostas.map((proposta, index) => (
								<ProposedCard
									key={index}
									source='/assets/img/home_conheca_os_gestores.png'
									nome={proposta.titulo}
									sobrenome={proposta.nameGestor}
									descricao={proposta.description}
								/>
							))
						}
					</ContainerPropostaList>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};

export default ProposedLegislation;
