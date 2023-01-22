import MiniCard from "../../../../components/mini-card";
import {
	ContainerBase,
	ContentContainer,
	TopContentContainer,
	MidContentContainer,
	DescriptionText,
} from "../../../../components/styled-components/PageStyles";
import AdminHeader from "../../../../components/header/admin";
import Footer from "../../../../components/footer";
import Typography from "@mui/material/Typography";
import { ContainerDenunciaList, DenunciaCardList, ContainerInputs } from './styles';

import {api} from '../../../../services/api';
import { useEffect } from "react";
import { useState } from "react";
import Input from "../../../../components/input";
import  Button  from "../../../../components/styled-components/form-button";

const AdminAntiCorruptionCenter = () => {
	const [denuncias, setDenuncias] = useState([]);
	const [denunciasView, setDenunciasView] = useState([]);

	const getDenuncias = async () => {
		try{
			const responseGestores = await api.get('/gestor');
			const dataGestores = responseGestores.data;
			let gestoresMap = {};
			dataGestores.forEach(d => {
				gestoresMap[d.numero] = d.nome_completo;
			});

			const responseDenuncia = await api.get('/denuncia');
			const dataDenuncia = responseDenuncia.data;
			let denunciaArray = [];
			dataDenuncia.forEach(d => {
					const p = {nome_gestor: gestoresMap[d.numero_gestor], ...d};
					denunciaArray.push(p);
			});
			setDenuncias(denunciaArray);	
			setDenunciasView(denunciaArray);
		}
		catch(error){
			console.log(error);
		}
	}

	useEffect(() => {getDenuncias();}, []);

	const handleFilter = (gestorFilter) => {
		setDenunciasView(denuncias);
		const denunciasFiltered = denuncias.filter((denuncia) => denuncia.nome_gestor.includes(gestorFilter));
		setDenunciasView(denunciasFiltered);
	}

	return (
		<ContainerBase>
			<AdminHeader />
			<ContentContainer>
				<TopContentContainer>
					<MiniCard
						source="/assets/img/home_administracao_publica.png"
						titulo="Administração Pública"
						linkItems={[
							{
								id: 1,
								name: "Central Anticorrupção",
								link: "/admin/central-anticorrupcao",
							},
							{
								id: 2,
								name: "Conheça os Gestores",
								link: "/admin/conheca_os_gestores",
							},
							{
								id: 3,
								name: "Consultar propostas de leis",
								link: "/admin/consultar-propostas-de-leis",
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
							Consulte aqui a lista de denúncias contra atos de
							corrupção e improbidade administrativa.
						</DescriptionText>
					</div>
					<div></div>
					<ContainerInputs>
						<b>Filtrar denuncias por gestor</b>
						<Input title="" onChange={(e) => handleFilter(e.target.value)} />
						<Button type='button' text='Todos' onClick={() => setDenunciasView(denuncias)} />
					</ContainerInputs>
					<ContainerDenunciaList>
						{
							denunciasView.map((denuncia, index) => (
								<DenunciaCardList key={index}>
									<span><b>Contra: </b>{denuncia.nome_gestor}</span>
									<p><b>Realizada por: </b>{denuncia.cpf_cidadao}</p>
									<p><b>Data: </b>{`${denuncia.data_denuncia.split("T")[0]} - ${denuncia.data_denuncia.split("T")[1].split(".")[0]}`}</p>
									<p><b>descricao: </b>{denuncia.texto_denuncia}</p>
								</DenunciaCardList>
							))
						}
					</ContainerDenunciaList>
				</TopContentContainer>
				<MidContentContainer></MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};

export default AdminAntiCorruptionCenter;
