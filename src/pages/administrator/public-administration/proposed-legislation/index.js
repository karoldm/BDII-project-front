import { useEffect, useState } from 'react';
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
import Button from "../../../../components/styled-components/form-button";
import Input from "../../../../components/input";
import DescriptionInput from "../../../../components/description-input";
import { Form, ContainerPropostaList, PropostaCardList, BoxModal } from "./styles";
import { Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminServiceDescription from '../../../../components/styled-components/admin-service-description';

import {api} from '../../../../services/api';


const AdminProposedLegislation = () => {
	const [nomeGestor, setNomeGestor] = useState("");
	const [titulo, setTitulo] = useState("");
	const [descricao, setDescricao] = useState("");
	const [dataAprovacao, setDataAprovacao] = useState("");

	const [propostas, setPropostas] = useState([]);
	const [deleteProposta, setDeleteProposta] = useState('');

	const [modalDeleteProposta, setModalDeleteProposta] = useState("");

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
			dataPropostas.forEach(d => {
					const p = {nome_gestor: gestoresMap[d.numero_gestor], ...d};
					propostasArray.push(p);
			});
			setPropostas(propostasArray);
		} catch(error){
			console.log(error);
		}
	}

	useEffect(() => {getPropostas();}, []);

	const handleDeleteProposta = async () => {
		try{
			const response = await api.delete(`/propostas/${deleteProposta}`);

			if(response.status === 200) {
				alert("Proposta deletada com sucesso!");
				window.location.reload();
			}
			else 
				alert("Erro ao deletar proposta!");
		}
		catch(error){
			console.log(error);
		}
		finally {
			setModalDeleteProposta(false);
		}
	}

	const handleEditProposta = (proposta) => {
		window.scrollTo(0, 0);
		setNomeGestor(proposta.nameGestor);
		setTitulo(proposta.titulo);
		setDescricao(proposta.description);
		setDataAprovacao(proposta.dataAprovacao);
	}

	const handleNewProposta = async () => {
		try{
			const responseGestores = await api.get('/gestor');
			const dataGestores = responseGestores.data;
			const gestor = dataGestores.filter(g => g.nome_completo === nomeGestor);

			const response = await api.post(`/propostas`, {
				titulo: titulo, 
				descricao: descricao, 
				data_aprovacao: dataAprovacao.split("T")[0],
				numero_gestor: gestor[0].numero
			});

			if(response.status === 201) {
				alert("Proposta cadastrada com sucesso!");
				window.location.reload();
			}
			else 
				alert("Erro ao cadastrar proposta!");
		}
		catch(error){
			console.log(error);
		}
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
								Consultar propostas de leis
							</Typography>
						</div>
						<DescriptionText>
							Adicione aqui as propostas de leis, e seus detalhes,
							que serão votadas.
						</DescriptionText>
					</div>
					<div></div>
				</TopContentContainer>
				<MidContentContainer>
					<Modal
						open={modalDeleteProposta}
						onClose={() => setModalDeleteProposta(false)}
					>
						<BoxModal>
							<b>Tem certeza que gostaria de deletar essa proposta ?</b><br />
							<Button text='Deletar' onClick={handleDeleteProposta} />
							<Button text='Cancelar' onClick={() => setModalDeleteProposta(false)} />
						</BoxModal>
					</Modal>
					<Form>
						<Input
							value={nomeGestor}
							onChange={(e) => setNomeGestor(e.target.value)}
							title="Nome do Gestor Responsável:"
						/>
						<Input
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
							title="Título da proposta:"
						/>
						<Input
							value={dataAprovacao}
							type="date"
							onChange={(e) => setDataAprovacao(e.target.value)}
							title="Data de Aprovação:"
						/>
						<DescriptionInput
							value={descricao}
							title="Descrição:"
							placeholder="Nos conte em detalhes sobre essa proposta de lei."
							onChange={(e) => setDescricao(e.target.value)}
						/>
						<Button text="Enviar" onClick = {handleNewProposta}/>
					</Form>
					<AdminServiceDescription description="Aqui está a lista de todos os gestores cadastrados até o momento." />
					<ContainerPropostaList>
						{
							propostas.map((proposta) => (
								<PropostaCardList key={proposta.numero}>
									<span><b>Titulo: </b>{proposta.titulo}</span>
									<p><b>Nome do gestor: </b>{proposta.nome_gestor}</p>
									<p><b>descricao: </b>{proposta.descricao}</p>
									<p><b>Data de Aprovação:</b> {proposta.data_aprovacao.split("T")[0]}</p>
									<div>
										<Button text={<Delete />} onClick={() => {
											console.log(proposta.numero)
											setDeleteProposta(+proposta.numero); 
											setModalDeleteProposta(true);
											}} />
									</div>
								</PropostaCardList>
							))
						}
					</ContainerPropostaList>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};

export default AdminProposedLegislation;
