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
import { Delete, Edit } from "@mui/icons-material";
import { Modal } from "@mui/material";


const AdminGestores = () => {
	const [problems, setProblems] = useState([]);

	const [nome, setNome] = useState("");
	const [funcao, setFuncao] = useState(1);
	const [dataPosse, setDataPosse] = useState("");
	const [dataNascimento, setDataNascimento] = useState("");
	const [partido, setPartido] = useState(1);

	const [modalCargo, setModalCargo] = useState("");
	const [modalPartido, setModalPartido] = useState("");
	const [modalDeleteGestor, setModalDeleteGestor] = useState("");

	const [newFuncaoTempo, setNewFuncaoTempo] = useState("");
	const [newFuncaoTitulo, setNewFuncaoTitulo] = useState("");

	const [newPartidoNome, setNewPartidoNome] = useState("");
	const [newPartidoSigla, setNewPartidoSigla] = useState("");

	const [modalDeletePartido, setModalDeletePartido] = useState("");
	const [deletePartidoId, setDeletePartidoId] = useState("");

	const [modalDeleteCargo, setModalDeleteCargo] = useState("");
	const [deleteCargoNome, setDeleteCargoNome] = useState("");

	const [gestores, setGestores] = useState([]);
	const [funcoes, setFuncoes] = useState([]);
	const [partidos, setPartidos] = useState([]);

	const [gestorToDelete, setGestorToDelete] = useState();
	const [editGestor, setEditGestor] = useState(false);
	const [numeroGestor, setNumeroGestor] = useState('');


	const handleNewFuncao = async () => {
		try {
			const response = await api.post('/funcao', {
				titulo: newFuncaoTitulo,
				mandato: +newFuncaoTempo
			});

			if(response.status === 201) 
				alert("Novo cargo cadastrado com sucesso!");
			else
				alert("Erro ao cadastrar novo cargo!");
		}
		catch(error){
			console.log(error);
		}
		finally {
			setModalCargo(false);
		}
	}

	const handleDeleteCargo = async () => {
		try {

			const response = await api.delete(`/funcao/${funcao}`);

			if(response.status === 200) {
				alert("Cargo deletado com sucesso!");
				document.location.reload();
			}
			else
				alert("Erro ao deletar cargo!");
		}
		catch(error){
			console.log(error);
		}
		finally {
			setModalDeleteCargo(false);
		}
	}

	const handleNewPartido = async () => {
		try {
			const response = await api.post('/partido', {
				nome: newPartidoNome,
				sigla: newPartidoSigla
			});

			if(response.status === 201) 
				alert("Novo partido cadastrado com sucesso!");
			else
				alert("Erro ao cadastrar novo partido!");
		}
		catch(error){
			console.log(error);
		}
		finally {
			setModalPartido(false);
		}
	}

	const handleDeletePartido = async () => {
		try {

			const response = await api.delete(`/partido/${partido}`);

			if(response.status === 200){
				alert("Partido deletado com sucesso!");
				document.location.reload();
			}
			else
				alert("Erro ao deletar partido!");
		}
		catch(error){
			console.log(error);
		}
		finally {
			setModalDeletePartido(false);
		}
	}

	const getGestores = async () => {
		try {
			const response = await api.get('/gestor');
			setGestores(response.data);
		} catch(error){
			console.log(error);
		}
	}

	const getFuncoes = async () => {
		try {
			const response = await api.get('/funcao');
			const data = response.data;
			let funcaoMap = {};

			data.forEach(d => {
				funcaoMap[d.id] = {titulo: d.titulo, mandato: d.mandato};
			});

			setFuncoes(funcaoMap);

		} catch(error){
			console.log(error);
		}
	}

	const getPartidos = async () => {
		try {
			const response = await api.get('/partido');
			const data = response.data;
			let partidosMap = {};
			data.forEach(d => {
				partidosMap[d.id] = `${d.nome} - ${d.sigla}`;
			});
			setPartidos(partidosMap);
		} catch(error){
			console.log(error);
		}
	}

	useEffect(() => {
		getGestores();
		getFuncoes();
		getPartidos();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		
		try {

			if(editGestor){
				const response = await api.put(`/gestor/${numeroGestor}`, {
					data_posse: dataPosse, 
					data_nascimento: dataNascimento,
					foto: "/assets/img/profilepic.png", 
					nome_completo: nome,
					id_funcao: +funcao,
					id_partido: +partido 
				});
				if(response.status === 200) {
					alert("Gestor editado com sucesso!");
					setNome("");
					setDataNascimento("");
					setDataPosse("");
					setPartido(1);
					setFuncao(1);
					window.location.reaload();
				}
				else 
					alert("Erro ao editar gestor!");
			}
			else {
				const response = await api.post('/gestor', {
					data_posse: dataPosse, 
					data_nascimento: dataNascimento,
					foto: "/assets/img/profilepic.png", 
					nome_completo: nome,
					id_funcao: +funcao,
					id_partido: +partido 
				});
				if(response.status === 201) {
					alert("Gestor Cadastrado com sucesso!");
					setNome("");
					setDataNascimento("");
					setDataPosse("");
					setPartido(1);
					setFuncao(1);
					window.location.reaload();
				}
				else 
					alert("Erro ao cadastrar gestor!");
			}
		}
		catch(error){
			console.log(error);
		}
	}

	const handleEditGestor = (gestor) => {
		window.scrollTo(0, 0);
		setNumeroGestor(gestor.numero);
		setNome(gestor.nome_completo);
		setFuncao(gestor.id_funcao);
		setPartido(gestor.id_partido);
		setDataNascimento(gestor.data_nascimento.split("T")[0]);
		setDataPosse(gestor.data_posse.split("T")[0]);
		setEditGestor(true);
	}

	const handleDeleteGestor = async () => {
		const response = await api.delete(`/gestor/${+gestorToDelete}`);
		if(response.status === 200) 
			alert("Gestor deletado com sucesso!");
		else 
			alert("Erro ao deletar gestor :c");

		setModalDeleteGestor(false);
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
								onChange={(e) => setNewFuncaoTitulo(e.target.value)}
								title="Título"
							/>
							<Input
								onChange={(e) => setNewFuncaoTempo(e.target.value)}
								title="Tempo de Mandato"
							/>
							<Button text='Cadastrar' onClick={handleNewFuncao} />
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
							<Button text='Cadastrar' onClick={handleNewPartido}/>
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeletePartido}
						onClose={() => setModalDeletePartido(false)}
					>
						<BoxModal>
							<b>Tem certeza que gostaria de deletar o partido {partidos[+partido]}?</b><br />
							<Button text='Deletar' onClick = {handleDeletePartido} />
							<Button text='Cancelar' onClick = {()=>setModalDeletePartido(false)} />
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeleteCargo}
						onClose={() => setModalDeleteCargo(false)}
					>
						<BoxModal>
							<b>Tem certeza que gostaria de deletar o cargo {funcoes[+funcao] ? funcoes[+funcao].titulo : 'test'}?</b><br />
							<Button text='Deletar' onClick = {handleDeleteCargo} />
							<Button text='Cancelar' onClick = {()=>setModalDeleteCargo(false)} />
						</BoxModal>
					</Modal>
					<Modal
						open={modalDeleteGestor}
						onClose={() => setModalDeleteGestor(false)}
					>
						<BoxModal>
							<b>Tem certeza que gostaria de deletar esse gestor? (Todas as suas propostas também serão deletadas!)</b><br />
							<Button text='Deletar' onClick={() => handleDeleteGestor()} />
							<Button text='Cancelar' onClick={() => {setGestorToDelete(""); setModalDeleteGestor(false);}} />
						</BoxModal>
					</Modal>

					<Form onSubmit={handleSubmit}>
						<Input
							value={nome}
							onChange={(e) => setNome(e.target.value)}
							title="Nome do Gestor:"
						/>
						<label>Cargo: </label>
						<ContainerInputs>
							<select name="funcaoList" defaultValue={1} onChange={(e)=>setFuncao(e.target.value)}>
								{Object.keys(funcoes).map((f) => {
									return <option value={f}>{funcoes[f].titulo} - {funcoes[f].mandato} anos</option>
								})}
							</select>
							<Button type='button' text={'+'} onClick={() => setModalCargo(true)} />
							<Button type='button' text={<Delete />} onClick={() => setModalDeleteCargo(true)} />
						</ContainerInputs>
						<label>Partido: </label>
						<ContainerInputs>
							<select name="partidoList" defaultValue={1} onChange={(e)=>setPartido(e.target.value)}> 
							{Object.keys(partidos).map((p) => {
									return <option value={p}>{partidos[p]} </option>
								})}
							</select>
							<Button type='button' text={'+'} onClick={() => setModalPartido(true)} />
							<Button type='button' text={<Delete />} onClick={() => setModalDeletePartido(true)} />
						</ContainerInputs>
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
						<Button text="Enviar" type='submit' />
					</Form>
					<br /><br /><br />
					<AdminServiceDescription description="Aqui está a lista de todos os gestores cadastrados até o momento." />
					<ContainerGestorList>
						{
							gestores.map((gestor) => (
								<GestorListCard key={gestor.numero} style={{background: gestor.ativo === 1 ? 'white' : '#ffc8c4'}}>
									<img src='/assets/img/profilepic.png' alt={gestor.nome_completo}/>
									<span><b>Nome Completo: </b>{gestor.nome_completo}</span>
									<p><b>Cargo: </b>{funcoes[gestor.id_funcao].titulo}</p>
									<p><b>Partido: </b>{partidos[gestor.id_partido]}</p>
									<p><b>Data de Posse:</b> {gestor.data_posse.split("T")[0]}</p>
									<p><b>Data de Nascimento: </b>{gestor.data_nascimento.split("T")[0]}</p>
									<div>
										<Button text={<Delete />} onClick={() => {
											setGestorToDelete(gestor.numero);
											setModalDeleteGestor(true);}} />
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
