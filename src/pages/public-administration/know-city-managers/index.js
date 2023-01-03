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
import { ca } from "date-fns/locale";
import Button from "../../../components/styled-components/form-button";


const cargos = [
	{ titulo: 'cargo 01' },
	{ titulo: 'cargo 01' },
	{ titulo: 'cargo 02' },
	{ titulo: 'cargo 01' }
];

const gestoresTeste = [
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 02',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 02',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
	{
		name: 'nome do gestor',
		cargo: 'cargo 01',
		dataPosse: '2023-01-01',
		dataNascimento: '1990-01-01',
		partido: 'Partido 01 - 01',
		photo: '/assets/img/profilepic.png',
	},
];

const Gestores = (props) => {
	const [gestores, setGestores] = useState([]);
	const [isFavorite, setIsFavorite] = useState(false);

	useEffect(() => {
		setGestores(gestoresTeste);
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

	const handleFilter = (cargoFilter) => {
		setGestores(gestoresTeste)
		const gestoresFiltered = gestoresTeste.filter((gestor) => gestor.cargo === cargoFilter);
		setGestores(gestoresFiltered);
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
							{cargos.map((cargo) => {
								return <option value={cargo.titulo}>{cargo.titulo} </option>
							})}
						</select>
						<Button type='button' text='Todos' onClick={() => setGestores(gestoresTeste)} />
					</ContainerInputs>
					<ContainerGestorList>
						{
							gestores.map((gestor, index) => (
								<ListCardContainer key={index}>
									<img
										src={gestor.photo}
										alt={gestor.name}
									/>
									<ContainerColumnCard>
										<h2> {gestor.name} </h2>
										<h3> {gestor.cargo} </h3>
										<h3> {gestor.partido} </h3>
										<div>
											<h4>Data de Posse: {gestor.dataPosse} </h4>
											<h4>Data de Nascimento: {gestor.dataNascimento} </h4>
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
