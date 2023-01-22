import React, { useState, useEffect } from "react";
import Header from "../../../components/header";
import MiniCard from "../../../components/mini-card";
import Footer from "../../../components/footer";
import Favorites from "../../../components/favorites";
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
import { ContainerInputs, ContainerGestorList, ListCardContainer, ContainerColumnCard } from './styles';
import Button from "../../../components/styled-components/form-button";
import {api} from '../../../services/api';

const Gestores = (props) => {
	const [gestores, setGestores] = useState([]);
	const [gestoresView, setGestoresView] = useState([]);
	const [funcoes, setFuncoes] = useState({});
	const [funcoesFilter, setFuncoesFilter] = useState([]);
	const [partidos, setPartidos] = useState({});
	const [isFavorite, setIsFavorite] = useState(false);

	const getGestores = async () => {
		try {
			const response = await api.get('/gestor');
			setGestores(response.data);
			setGestoresView(response.data);
		} catch(error){
			console.log(error);
		}
	} 

	const getFuncoes = async () => {
		try {
			const response = await api.get('/funcao');
			const data = response.data;
			let funcaoMap = {};
			let funcoesFilterArray = [];
			data.forEach(d => {
				funcaoMap[d.id] = d.titulo;
				funcoesFilterArray.push(d.titulo);
			});
			setFuncoesFilter(funcoesFilterArray);
			setFuncoes(funcaoMap);
		} catch(error){
			console.log(error);
		}
	}

	const getPartidos = async () => {
		try {
			const response = await api.get('/partido');
			const data = response.data;
			let partidoMap = {};
			data.forEach(d => {
				partidoMap[d.id] = `${d.nome} - ${d.sigla}`;
			});
			setPartidos(partidoMap);
		} catch(error){
			console.log(error);
		}
	}

	useEffect(() => {
		getGestores();
		getFuncoes();
		getPartidos();

		props.data.find(
			(favoriteX) => favoriteX.id === 46 && setIsFavorite(true)
		);
	}, []);

	const handleFavorite = () => {
		if (!isFavorite) {
			props.handleAddFavorite({
				id: 46,
				name: "Conheça os Gestores",
				img: "/assets/img/home_administracao_publica.png",
				link: "/conheca_os_gestores",
			}); //se favoritou o servico
		} else {
			props.handleSubFavorite({
				id: 46,
				name: "Conheça os Gestores",
				img: "/assets/img/home_administracao_publica.png",
				link: "/conheca_os_gestores",
			}); //se desfavoritou o servico
		}
		setIsFavorite(!isFavorite);
	};

	const handleFilter = (funcaoFilter) => {
		setGestoresView(gestores);
		const gestoresFiltered = gestores.filter((gestor) => funcoes[gestor.id_funcao] === funcaoFilter);
		setGestoresView(gestoresFiltered);
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
								Conheça os Gestores
							</Typography>
						</div>
						<DescriptionText>
							Conheça os atuais gestores que trabalham diariamente
							servindo às necessidades da sua cidade!
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
						<b>Filtrar gestor por cargo</b>
						<select name="cargoList" onChange={(e) => handleFilter(e.target.value)} >
							{funcoesFilter.map((f) => {
								return <option value={f}>{f} </option>
							})}
						</select>
						<Button type='button' text='Todos' onClick={() => setGestoresView(gestores)} />
					</ContainerInputs>
					<ContainerGestorList>
						{
							gestoresView.map((gestor) => (
								<ListCardContainer key={gestor.numero}>
									<img
										src='/assets/img/profilepic.png'
										alt={gestor.nome_completo}
									/>
									<ContainerColumnCard>
										<h2> {gestor.nome_completo} </h2>
										<h3> {funcoes[gestor.id_funcao]} </h3>
										<h3> {partidos[gestor.id_partido]} </h3>
										<div>
											<h4>Data de Posse: {gestor.data_posse.split("T")[0]} </h4>
											<h4>Data de Nascimento: {gestor.data_nascimento.split("T")[0]} </h4>
										</div>
									</ContainerColumnCard>
								</ListCardContainer>
							))
						}
					</ContainerGestorList>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};
export default Gestores;
