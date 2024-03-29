import React from "react";
import { Link } from "react-router-dom";
import {
	ContainerBase,
	Content,
	GrayLine,
	ChartContainer,
	ContainerColumn,
	ContainerRow,
} from "./styles";

import AdminHeader from "../../components/header/admin";
import { StyledHr } from "../../components/styled-components/StyledHr";
import DashboardButton from "./index-button";
import DashboardChart1 from "../../charts/chart1";
import DashboardChart2 from "../../charts/chart2";
import DashboardChart3 from "../../charts/chart3";
import DashboardChart4 from "../../charts/chart4";
import { MidContentContainer } from "../../components/styled-components/PageStyles";
import DengueDashboard from "./dashboard-maps/dengue";
import FairsDashboard from "./dashboard-maps/feiras";
import TreesDashboard from "./dashboard-maps/trees";
import LeishmanioseDashboard from "./dashboard-maps/leishmaniose";
import UsefulLocationsDashboard from "./dashboard-maps/useful_locations";
import Footer from "../../components/footer";

const Dashboard = () => {
	return (
		<ContainerBase>
			<AdminHeader />
			<Content>
				<ContainerColumn>
					<h1> Dashboard </h1>
					<StyledHr style={{ width: "95%", marginLeft: "-2vw" }} />
					<Link to = "/admin_details" style={{ textDecoration: "none", color: "#1b262c" }}>
						<DashboardChart1 />
					</Link>
					<DashboardButton
						description="Microsserviços"
						linkItems={[
							{
								id: 1,
								name: "-- Todos --",
								link: "/todas_solicitacoes",
							},
							{
								id: 2,
								name: "Conservação Urbana",
								link: "/admin/conservacao_urbana",
							},
							{
								id: 3,
								name: "Conservação Rural/Áreas Verdes",
								link: "/admin/conservacao_rural",
							},
							{
								id: 4,
								name: "Remoção de Detritos",
								link: "/admin/remocao_detritos",
							},
							{
								id: 5,
								name: "Vigilância Sanitária",
								link: "/admin/vigilancia_sanitaria",
							},
							{
								id: 6,
								name: "Controle de Pragas",
								link: "/admin/controle_pragas",
							},
							{
								id: 7,
								name: "Animais Domésticos",
								link: "/admin/animais_domesticos",
							},
							{
								id: 8,
								name: "Meio Ambiente",
								link: "/admin/meio_ambiente",
							},
							{
								id: 9,
								name: "Fauna e Flora",
								link: "/admin/fauna_flora",
							},
							{
								id: 10,
								name: "Assistência Social",
								link: "/admin/assistencia_social",
							},
							{
								id: 11,
								name: "Famílias Carentes",
								link: "/admin/familias_carentes",
							},
							{
								id: 12,
								name: "Serviços Sociais",
								link: "/admin/servicos_sociais",
							},
							{
								id: 13,
								name: "Segurança e Defesa Civil",
								link: "/admin/seguranca_defesa_civil",
							},
							{
								id: 14,
								name: "Botão do Pânico",
								link: "/admin/botao_panico",
							},
							{
								id: 15,
								name: "Administração Pública",
								link: "/admin/administracao_publica",
							},
							{
								id: 16,
								name: "Central de Notificação e Comunicação",
								link: "/admin/comunicacao",
							},
							{
								id: 17,
								name: "Sensoriamento Móvel Participativo",
								link: "/admin/sensoriamento_remoto",
							},
							{
								id: 18,
								name: "Assossiação Comercial",
								link: "/admin/associacao_comercial",
							},
						]}
					/>

					<GrayLine />
					<ChartContainer>
						<ContainerRow>
							<DashboardChart2 />
							<DashboardChart3 />
						</ContainerRow>
					</ChartContainer>
					<ChartContainer style={{ paddingTop: "2vh" }}>
						<DashboardChart4 />
					</ChartContainer>
				</ContainerColumn>
			</Content>
			<MidContentContainer>
				<GrayLine style={{ marginBottom: "-8.5vh" }} />
				<TreesDashboard />
				<GrayLine style={{ marginBottom: "-8.5vh" }} />
				<DengueDashboard />
				<GrayLine style={{ marginBottom: "-8.5vh" }} />
				<FairsDashboard />
				<GrayLine style={{ marginBottom: "-8.5vh" }} />
				<LeishmanioseDashboard />
				<GrayLine style={{ marginBottom: "-8.5vh" }} />
				<UsefulLocationsDashboard />
			</MidContentContainer>
			<GrayLine style={{ width: "100%" }} />
			<Footer />
		</ContainerBase>
	);
};

export default Dashboard;
