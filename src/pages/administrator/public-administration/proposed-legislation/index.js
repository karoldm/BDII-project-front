import { useState } from 'react';
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
import InputPhotos from "../../../../components/images-input";
import Input from "../../../../components/input";
import DescriptionInput from "../../../../components/description-input";
import { Form, ContainerPropostaList, PropostaCardList, BoxModal } from "./styles";
import { Modal } from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import AdminServiceDescription from '../../../../components/styled-components/admin-service-description';


const propostas = [
	{
		nameGestor: 'nome do gestor',
		titulo: 'titulo da proposta',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		dataAprovacao: '2023-01-01'
	},
	{
		nameGestor: 'nome do gestor',
		titulo: 'titulo da proposta',
		description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
		dataAprovacao: '2023-01-01'
	}
];

const AdminProposedLegislation = () => {
	const [nameGestor, setNameGestor] = useState("");
	const [titulo, setTitulo] = useState("");
	const [description, setDescription] = useState("");
	const [dataAprovacao, setDataAprovacao] = useState("");

	const [modalDeleteProposta, setModalDeleteProposta] = useState("");


	const handleEditProposta = (proposta) => {
		window.scrollTo(0, 0);
		setNameGestor(proposta.nameGestor);
		setTitulo(proposta.titulo);
		setDescription(proposta.description);
		setDataAprovacao(proposta.dataAprovacao);
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
							<b>Tem certeza que gostaria de deletar essa proposta?</b><br />
							<Button text='Deletar' onClick />
							<Button text='Cancelar' onClick={() => setModalDeleteProposta(false)} />
						</BoxModal>
					</Modal>
					<Form>
						<Input
							value={nameGestor}
							onChange={(e) => setNameGestor(e.target.value)}
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
							value={description}
							title="Descrição:"
							placeholder="Nos conte em detalhes sobre essa proposta de lei."
							onChange={(e) => setDescription(e.target.value)}
						/>
						<Button text="Enviar" onClick />
					</Form>
					<AdminServiceDescription description="Aqui está a lista de todos os gestores cadastrados até o momento." />
					<ContainerPropostaList>
						{
							propostas.map((proposta) => (
								<PropostaCardList>
									<span><b>Titulo: </b>{proposta.titulo}</span>
									<p><b>Nome do gestor: </b>{proposta.nameGestor}</p>
									<p><b>descricao: </b>{proposta.description}</p>
									<p><b>Data de Aprovação:</b> {proposta.dataAprovacao}</p>
									<div>
										<Button text={<Delete />} onClick={() => setModalDeleteProposta(true)} />
										<Button text={<Edit />} onClick={() => handleEditProposta(proposta)} />
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
