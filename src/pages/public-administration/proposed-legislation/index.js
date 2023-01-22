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

import {api} from '../../../services/api';


const ProposedLegislation = (props) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [propostas, setPropostas] = useState([]);
	const [propostasView, setPropostasView] = useState([]);

	const getPropostas = async () => {
		let propostasArray = [];

		try {

			const responseGestores = await api.get('/gestor');
			const dataGestores = responseGestores.data;
			let gestoresMap = {};
			dataGestores.forEach(d => {
				gestoresMap[d.numero] = d.nome_completo;
			});

			const responsePropostas = await api.get('/propostas');
			const dataPropostas = responsePropostas.data;
			dataPropostas.map(d => {
					const p = {nome_gestor: gestoresMap[d.numero_gestor], ...d};
					propostasArray.push(p);
			});
			setPropostas(propostasArray);	
			setPropostasView(propostasArray);
		} catch(error){
			console.log(error);
		}
	} 

	useEffect(() => {
		getPropostas();
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
		setPropostasView(propostas);
		const propostasFiltered = propostas.filter((proposta) => proposta.nome_gestor.includes(gestorFilter));
		setPropostasView(propostasFiltered);
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
						<Button type='button' text='Todos' onClick={() => setPropostas(propostas)} />
					</ContainerInputs>
					<ContainerPropostaList>
						{
							propostasView.map((proposta) => (
								<ProposedCard
									key={proposta.id}
									source='/assets/img/home_conheca_os_gestores.png'
									nome={proposta.titulo}
									sobrenome={proposta.nome_gestor}
									descricao={proposta.descricao}
									data={proposta.data_aprovacao.split("T")[0]}
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
