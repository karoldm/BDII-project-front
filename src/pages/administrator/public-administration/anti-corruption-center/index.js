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
import { ContainerDenunciaList, DenunciaCardList } from './styles';

const denuncias = [
	{
		gestor: {
			name: 'nome do gestor',
		},
		cidadao: {
			name: 'nome do cidadao',
		},
		data: '2023-01-01',
		texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
	{
		gestor: {
			name: 'nome do gestor',
		},
		cidadao: {
			name: 'nome do cidadao',
		},
		data: '2023-01-01',
		texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
	{
		gestor: {
			name: 'nome do gestor',
		},
		cidadao: {
			name: 'nome do cidadao',
		},
		data: '2023-01-01',
		texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
	{
		gestor: {
			name: 'nome do gestor',
		},
		cidadao: {
			name: 'nome do cidadao',
		},
		data: '2023-01-01',
		texto: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
	},
];

const AdminAntiCorruptionCenter = () => {
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
					<ContainerDenunciaList>
						{
							denuncias.map((denuncia) => (
								<DenunciaCardList>
									<span><b>Contra: </b>{denuncia.gestor.name}</span>
									<p><b>Realizada por: </b>{denuncia.cidadao.name}</p>
									<p><b>Data: </b>{denuncia.data}</p>
									<p><b>descricao: </b>{denuncia.texto}</p>
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
