import React, { useContext, useState, useEffect, useCallback } from "react";

import Typography from "@mui/material/Typography";
import {
	ContainerBase,
	ContentContainer,
	TopContentContainer,
	DescriptionText,
	MidContentContainer,
} from "../../../../components/styled-components/PageStyles";
import MiniCard from "../../../../components/mini-card";
import AdminHeader from "../../../../components/header/admin";
import Footer from "../../../../components/footer";
import TreesMap from "./map";
import useWebSocket from 'react-use-websocket';
import { Context } from "../../../../context/Auth/AuthContext";
import Graphic from "./graphic";

const AdminMonitoring = () => {
	const socketUrl = 'ws://localhost:3334';
	const [messageHistory, setMessageHistory] = useState([]);
	const [total, setTotal] = useState([]);
	const [temperatureAverage, setTemperatureAverage] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [humidityAverage, setHumidityAverage] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [precipitationAverage, setPrecipitationAverage] = useState([0, 0, 0, 0, 0, 0, 0]);
	const [windAverage, setWindAverage] = useState([0, 0, 0, 0, 0, 0, 0]);
	const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
	const { user } = useContext(Context);
	let data = [
		{
			title: "Sensor localizado na Manoel Goulart - Frente ao Parque do Povo",
			location: {
				lat: -22.117968,
				lng: -51.404495,
			}
		},
		{
			title: "Sensor localizado no Catedral da Cidade",
			location: {
				lat: -22.122900,
				lng: -51.388858,
			}
		}
	]
	const [locations, setLocations] = useState(data);

	useEffect(() => {
		if (lastMessage !== null) {
			let string = lastMessage.data;
			let sensor = string.split("localizado n")
			let sensor01 = sensor[1].substring(0, 1);
			let updateSensor = sensor01 === 'o' ? 1 : 0
			let getValues = string.split("temperature")
			data[updateSensor].temperature = getValues[1].substring(3, 7)
			data[updateSensor].humidity = getValues[1].substring(21, 25)
			data[updateSensor].precipitation = getValues[1].substring(43, 44)
			data[updateSensor].wind = getValues[1].substring(53, 56)
			console.log(data)
			setLocations(data);
			let array = string.split("===")
			let newTemperatureAverage = parseFloat(array[1])
			let newHumidityAverage = parseFloat(array[2])
			let newPrecipitationAverage = parseFloat(array[3])
			let newWindAverage = parseFloat(array[4])
			setMessageHistory((prev) => prev.concat(lastMessage));
			if (newTemperatureAverage !== undefined) {
				setTemperatureAverage(
					temperatureAverage.map((num, index) => {
						/* console.log("011 - ", temperatureAverage)
						console.log("013 - ", num)
						console.log(newTemperatureAverage) */
						return index + 1 < temperatureAverage.length ? temperatureAverage[index + 1] : (newTemperatureAverage.toFixed(1)).valueOf()
					})
				)
				setHumidityAverage(
					humidityAverage.map((num, index) => {
						return index + 1 < humidityAverage.length ? humidityAverage[index + 1] : (newHumidityAverage.toFixed(1)).valueOf()
					})
				)
				setPrecipitationAverage(
					precipitationAverage.map((num, index) => {
						return index + 1 < precipitationAverage.length ? precipitationAverage[index + 1] : (newPrecipitationAverage.toFixed(1)).valueOf()
					})
				)
				setWindAverage(
					windAverage.map((num, index) => {
						return index + 1 < windAverage.length ? windAverage[index + 1] : (newWindAverage.toFixed(1)).valueOf()
					})
				)
			}
		}
	}, [lastMessage, setMessageHistory]);

	useEffect(() => {
		/* const apiCall = {
			event: "panic:subscribe",
			data: { channel: "connection" },
		};

		sendMessage(JSON.stringify(apiCall)); */
		handleClickSendMessage()
		console.log("TESTANDO")
	}, []);

	const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

	return (
		<ContainerBase>
			<AdminHeader />
			<ContentContainer>
				<TopContentContainer>
					<MiniCard
						source="/assets/img/home_meio_ambiente.png"
						titulo="Meio Ambiente"
						linkItems={[
							{
								id: 1,
								name: "Adoção de Áreas Públicas",
								link: "/admin/adocao_areas_publicas",
							},
							{
								id: 2,
								name: "Monitoramento do Tempo",
								link: "/admin/monitoramento",
							},
							{
								id: 3,
								name: "Coleta de Lixo",
								link: "/admin/coleta-de-lixo",
							},
						]}
					/>
					<div style={{ marginTop: "14px" }}>
						<div style={{ textAlign: "center" }}>
							<Typography variant="h4">Monitoramento do Tempo</Typography>
						</div>
						<DescriptionText>
							Aqui você pode checar o monitoramento do tempo em tempo real.
						</DescriptionText>
					</div>
					<div></div>
				</TopContentContainer>
				<MidContentContainer>
				<TreesMap
						locations={locations}
						icon="/assets/img/humidity-sensor.png"
					/>
					<>	
						<br/>
						<Graphic 
							title = "Media das Temperaturas"
							data = {temperatureAverage}
							columnName = "Temperatura (°C)"
							min = {20}
							max = {26}
						/>
						<br/>
						<Graphic 
							title = "Media da Umidade"
							data = {humidityAverage}
							columnName = "Umidade (%)"
							min = {40}
							max = {45}
						/>
						<br/>
						<Graphic 
							title = "Media das Precipitações"
							data = {precipitationAverage}
							columnName = "Precipitação (mm)"
							min = {0}
							max = {10}
						/>
						<br/>
						<Graphic 
							title = "Media dos Ventos"
							data = {windAverage}
							columnName = "Velocidade do Vento (km/h)"
							min = {3}
							max = {8}
						/>
					</>
				</MidContentContainer>
			</ContentContainer>
			<Footer />
		</ContainerBase>
	);
}

export default AdminMonitoring;