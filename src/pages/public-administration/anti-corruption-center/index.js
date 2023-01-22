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

import { api } from '../../../services/api';

const months = {
	0: '01',
	1: '02',
	2: '03',
	3: '04',
	4: '05',
	5: '06',
	6: '07',
	7: '08',
	8: '09',
	9: '10',
	10: '11',
	11: '12',
}


const AntiCorruptionCenter = (props) => {
	const [isFavorite, setIsFavorite] = useState(false);
	const [gestor, setGestor] = useState(null);
	const [userCPF, setUserCPF] = useState("");
	const [gestores, setGestores] = useState([]);
	const [descricao, setDescricao] = useState("");
	const [nomeGestor, setNomeGestor] = useState("");

	const getGestores = async () => {
		try {
			const responsePartidos = await api.get('/partido');
			const dataPartidos = responsePartidos.data;
			let partidosMap = {};
			dataPartidos.forEach(d => {
				partidosMap[d.id] = `${d.nome} - ${d.sigla}`;
			});

			const responseGestores = await api.get('/gestor');
			const dataGestores = responseGestores.data;
			let GestoresArray = [];
			dataGestores.map(d => {
					const p = {nome_partido: partidosMap[d.id_partido], ...d};
					GestoresArray.push(p);
			});
			setGestores(GestoresArray);	

		} catch(error){
			console.log(error);
		}
	}

	useEffect(() => {
		getGestores();

		props.data.find(
			(favoriteX) => favoriteX.id === 45 && setIsFavorite(true)
		);
	}, []);

	const handleGestor = (nome) => {
		setNomeGestor(nome);
		const gestoresFiltered = gestores.filter(g => g.nome_completo === nome);
		if (gestoresFiltered.length > 0) {
			setGestor(gestoresFiltered[0]);
		}
		else {
			setGestor(null);
		}
	}

	const handleDenuncia = async () => {

		if(!gestor || userCPF.trim() === '' || descricao.trim() === ''){
			alert("Preencha todos os dados!");
		}
		else {
			const responseCidadao = await api.get('/cidadao');
			const dataCidadao = responseCidadao.data;
			let validCidadao = false;

			dataCidadao.forEach(c => {if(c.cpf === userCPF) validCidadao = true; return;});

			if(validCidadao) {

				const date = new Date();
				const response = await api.post('/denuncia', {
					data_denuncia: `${date.getFullYear()}-${months[date.getMonth()]}-${date.getDate()}`, 
					texto_denuncia: descricao,
					cpf_cidadao: userCPF,
					numero_gestor: gestor.numero
				});
				if(response.status === 201)
					alert("Denúncia efetuada com sucesso!");
					setDescricao("");
					setGestor(null);
					setUserCPF("");
					setNomeGestor("");
			}
			else{
				alert("CPF inválido!");
				return;
			}
		}
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
								label="Seu CPF"
								variant="outlined"
								value = {userCPF}
								onChange={(e) => setUserCPF(e.target.value)}
							/>
						</Stack>
						<br />
						<Stack spacing={2} direction="row">
							<TextField
								fullWidth
								id="outlined-basic"
								label="Nome do gestor"
								variant="outlined"
								value={nomeGestor}
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
										value={gestor.nome_completo}
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
										value={gestor.nome_partido}
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
									value={descricao}
									helperText={''}
									onChange={(e) => { setDescricao(e.target.value)}}
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
