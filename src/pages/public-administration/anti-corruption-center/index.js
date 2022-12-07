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
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import Typography from "@mui/material/Typography";
import { StyledHr } from "../../../components/styled-components/StyledHr";
import Footer from "../../../components/footer";
import Favorites from "../../../components/favorites";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import GrayLine from "../../../components/styled-components/gray-line";

import { Container } from "./styles.js";

const gestorTeste = {
	'cpf': '111.111.111.11',
	'nome': 'guilherme ribeiro carrara',
	'partido': 'UNESP',
}

const AntiCorruptionCenter = (props) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [gestor, setGestor] = useState(null);


	useEffect(() => {
		props.data.find(
			(favoriteX) => favoriteX.id === 45 && setIsFavorite(true)
		);
	}, []);

	const handleGestor = (nome) => {
		//buscar gestor no banco pelo nome
		if (nome === gestorTeste.nome) {
			setGestor(gestorTeste);
		}
		else {
			setGestor(null);
		}
	}

	const handleDenuncia = () => {
		//registrar denuncia no banco 
		alert("Denúncia efetuada com sucesso!");
	}

	const handleFavorite = () => {
		if (!isFavorite) {
			props.handleAddFavorite({
				id: 45,
				name: "Central Anticorrupção",
				img: "/assets/img/home_administracao_publica.png",
				link: "/central-anticorrupcao",
			}); //se favoritou o servico
		} else {
			props.handleSubFavorite({
				id: 45,
				name: "Central Anticorrupção",
				img: "/assets/img/home_administracao_publica.png",
				link: "/central-anticorrupcao",
			}); //se desfavoritou o servico
		}
		setIsFavorite(!isFavorite);
	};
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
								Central Anticorrupção
							</Typography>
						</div>
						<DescriptionText>
							Neste serviço você poderá realizar a denúncia de
							possível atividade corrupta ou de improbidade
							administrativa para que os órgãos responsáveis
							investiguem e avaliem.
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
					<Container>
						<br />
						<Stack spacing={2} direction="row">
							<TextField
								fullWidth
								id="outlined-basic"
								label="Nome do gestor"
								variant="outlined"
								onChange={(e) => handleGestor(e.target.value)}
							/>
						</Stack>
						{gestor &&
							<div>
								<GrayLine />
								<Stack spacing={2} direction="row">
									<TextField
										fullWidth
										id="outlined-basic"
										helperText="Nome do gestor"
										variant="outlined"
										value={gestorTeste.nome}
										disabled
									/>
								</Stack>
								<br />
								<Stack spacing={2} direction="row">
									<TextField
										fullWidth
										id="outlined-basic"
										helperText="Partido do gestor"
										variant="outlined"
										value={gestorTeste.partido}
										disabled
									/>
								</Stack>
							</div>
						}
						<GrayLine />
						<div className="inputs">
							<Stack spacing={2} direction="row">
								<TextField
									fullWidth
									id="outlined-basic"
									label="Descrição da denúncia"
									variant="outlined"
									multiline
									rows={5}
									value={''}
									helperText={''}
									onChange={() => { }}
								/>
							</Stack>
						</div>
						<br />
						<div className="inputs">
							<Button fullWidth variant="contained" onClick={handleDenuncia}>
								Enviar
							</Button>
						</div>
					</Container>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};

export default AntiCorruptionCenter;
