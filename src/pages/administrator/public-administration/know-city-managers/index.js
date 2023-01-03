import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import { Form, ContainerInputs, GestorListCard, ContainerGestorList, BoxModal } from "./styles";
import AdminHeader from "../../../../components/header/admin";
import MiniCard from "../../../../components/mini-card";
import Footer from "../../../../components/footer";
import Input from "../../../../components/input";
import InputPhotos from "../../../../components/images-input";
import Button from "../../../../components/styled-components/form-button";
import AdminServiceDescription from "../../../../components/styled-components/admin-service-description";
import {
	ContainerBase,
	ContentContainer,
	TopContentContainer,
	MidContentContainer,
	DescriptionText,
} from "../../../../components/styled-components/PageStyles";
import Typography from "@mui/material/Typography";
import { Delete, Edit, NewReleases } from "@mui/icons-material";
import { Modal } from "@mui/material";

const partidos = [
	{ name: 'Partido 01', sigla: '01' },
	{ name: 'Partido 01', sigla: '01' },
	{ name: 'Partido 01', sigla: '01' },
	{ name: 'Partido 01', sigla: '01' }
];
const cargos = [
	{ titulo: 'cargo 01' },
	{ titulo: 'cargo 01' },
	{ titulo: 'cargo 01' },
	{ titulo: 'cargo 01' }
];
const gestores = [
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
];

const AdminGestores = () => {
	const [problems, setProblems] = useState([]);
	const [name, setName] = useState("");
	const [cargo, setCargo] = useState("");
	const [dataPosse, setDataPosse] = useState("");
	const [dataNascimento, setDataNascimento] = useState("");
	const [partido, setPartido] = useState("");

	const [modalCargo, setModalCargo] = useState("");
	const [modalPartido, setModalPartido] = useState("");
	const [modalDeleteGestor, setModalDeleteGestor] = useState("");

	const [newCargoTempo, setNewCargoTempo] = useState("");
	const [newCargoTitulo, setNewCargoTitulo] = useState("");

	const [newPartidoNome, setNewPartidoNome] = useState("");
	const [newPartidoSigla, setNewPartidoSigla] = useState("");

	const [modalDeletePartido, setModalDeletePartido] = useState("");
	const [deletePartidoNome, setDeletePartidoNome] = useState("");

	const [modalDeleteCargo, setModalDeleteCargo] = useState("");
	const [deleteCargoNome, setDeleteCargoNome] = useState("");

	useEffect(() => {

	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('disparado')
	}

	const handleEditGestor = (gestor) => {
		window.scrollTo(0, 0);
		setName(gestor.name);
		setCargo(gestor.cargo);
		setPartido(gestor.partido);
		setDataNascimento(gestor.dataNascimento);
		setDataPosse(gestor.dataPosse);
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
								Conheça os Gestores
							</Typography>
						</div>
						<DescriptionText>
							Cadastre aqui todas as informações do Gestor para
							que fique disponível à população!
						</DescriptionText>
					</div>
					<div></div>
				</TopContentContainer>
				<MidContentContainer>
					<Modal
						open={modalCargo}
						onClose={() => setModalCargo(false)}
					>
						<BoxModal>
							<b>Novo Cargo</b><br />
							<Input
								onChange={(e) => setNewCargoTitulo(e.target.value)}
								title="Título"
							/>
							<Input
								onChange={(e) => setNewCargoTempo(e.target.value)}
								title="Tempo de Mandato"
							/>
							<Button text='Cadastrar' onClick />
						</BoxModal>
					</Modal>
					<Modal
						open={modalPartido}
						onClose={() => setModalPartido(false)}
					>
						<BoxModal>
							<b>Novo Partido</b><br />
							<Input
								onChange={(e) => setNewPartidoNome(e.target.value)}
								title="Nome"
							/>
							<Input
								onChange={(e) => setNewPartidoSigla(e.target.value)}
								title="Sigla"
							/>
							<Button text='Cadastrar' onClick />
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeletePartido}
						onClose={() => setModalDeletePartido(false)}
					>
						<BoxModal>
							<b>Qual o nome do partido que gostaria de deletar?</b><br />
							<Input
								onChange={(e) => setDeletePartidoNome(e.target.value)}
								title="Nome"
							/>
							<Button text='Deletar' onClick />
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeleteCargo}
						onClose={() => setModalDeleteCargo(false)}
					>
						<BoxModal>
							<b>Qual o nome do Cargo que gostaria de deletar?</b><br />
							<Input
								onChange={(e) => setDeletePartidoNome(e.target.value)}
								title="Nome"
							/>
							<Button text='Deletar' onClick />
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeleteGestor}
						onClose={() => setModalDeleteGestor(false)}
					>
						<BoxModal>
							<b>Tem certeza que gostaria de deletar esse gestor? (Todas as suas propostas também serão deletadas!)</b><br />
							<Button text='Deletar' onClick />
							<Button text='Cancelar' onClick={() => setModalDeleteGestor(false)} />
						</BoxModal>
					</Modal>

					<Form onSubmit={handleSubmit}>
						<Input
							value={name}
							onChange={(e) => setName(e.target.value)}
							title="Nome do Gestor:"
						/>
						<label>Cargo: </label>
						<ContainerInputs>
							<select name="cargoList">
								{cargos.map((cargo) => {
									return <option value={cargo.titulo}>{cargo.titulo} </option>
								})}
							</select>
							<Button type='button' text={'+'} onClick={() => setModalCargo(true)} />
							<Button type='button' text={<Delete />} onClick={() => setModalDeleteCargo(true)} />
						</ContainerInputs>
						<label>Partido: </label>
						<ContainerInputs>
							<select name="partidoList" >
								{partidos.map((partido) => {
									return <option value={partido.name}>{partido.name} - {partido.sigla}</option>
								})}
							</select>
							<Button type='button' text={'+'} onClick={() => setModalPartido(true)} />
							<Button type='button' text={<Delete />} onClick={() => setModalDeletePartido(true)} />
						</ContainerInputs>
						<Input
							value={cargo}
							onChange={(e) => setCargo(e.target.value)}
							title="Cargo:"
						/>
						<Input
							value={dataPosse}
							type="date"
							onChange={(e) => setDataPosse(e.target.value)}
							title="Data de posse:"
						/>
						<Input
							type="date"
							value={dataNascimento}
							onChange={(e) => setDataNascimento(e.target.value)}
							title="Data de nascimento:"
						/>
						<br />
						<InputPhotos />
						<br />
						<Button text="Enviar" onClick />
					</Form>
					<br /><br /><br />
					<AdminServiceDescription description="Aqui está a lista de todos os gestores cadastrados até o momento." />
					<ContainerGestorList>
						{
							gestores.map((gestor, index) => (
								<GestorListCard key={index}>
									<img src={gestor.photo} />
									<span><b>Nome Completo: </b>{gestor.name}</span>
									<p><b>Cargo: </b>{gestor.cargo}</p>
									<p><b>Partido: </b>{gestor.partido}</p>
									<p><b>Data de Posse:</b> {gestor.dataPosse}</p>
									<p><b>Data de Nascimento: </b>{gestor.dataNascimento}</p>
									<div>
										<Button text={<Delete />} onClick={() => setModalDeleteGestor(true)} />
										<Button text={<Edit />} onClick={() => handleEditGestor(gestor)} />
									</div>
								</GestorListCard>
							))
						}
					</ContainerGestorList>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
};
export default AdminGestores;
