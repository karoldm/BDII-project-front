import React, { useContext, useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "../../components/styled-components/form-button";
import { Context } from "../../context/Auth/AuthContext";

import { api } from '../../services/api';

import {
	ContainerBase,
	Square,
	GrayLine,
	Form,
	LoginSignupSpan,
	TopContainer,
	MidContainer,
	ContainerInputs,
} from "./styles";
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Input from "../../components/input";

const Login = () => {
	const navigate = useNavigate();
	const [user, setUser] = useState("");
	const [toggle, setToggle] = useState(true);
	const [titleLoginColor, setTitleLoginColor] = useState("var(--secondary)");
	const [titleSignupColor, setTitleSignupColor] = useState("#000000");
	const { handleLogin } = useContext(Context);
	const [state, setState] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center',
	});

	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [nome, setNome] = useState("");
	const [rua, setRua] = useState("");
	const [bairro, setBairro] = useState("");
	const [cidade, setCidade] = useState("");
	const [uf, setUf] = useState("");
	const [numero, setNumero] = useState("");
	const [CPF, setCPF] = useState("");
	const [dataNascimento, setDataNascimento] = useState("");

	const handleClose = () => {
		setState({ ...state, open: false });
	};

	async function handleSubmitLogin(e) {
		e.preventDefault();
		const data = {
			email,
			password
		}

		// const status = await handleLogin(data);
		const status = 200
		console.log(status)
		if (status === 200) {
			if (password === "admin") {
				navigate('/admin');
			}
			else {
				navigate('/');
			}
		}
	}

	async function handleSubmitRegister(e) {
		e.preventDefault();

		if(CPF.trim() === '' | 
		nome.trim() === '' | 
		dataNascimento.trim() === '' | 
		rua.trim() === '' | 
		bairro.trim() === '' | 
		cidade.trim() === '' |
		uf.trim() === '' | 
		numero.trim() === '' | 
		email.trim() === '' | 
		password.trim() === '' ){
			console.log({
				cpf: CPF,
				nome_completo: nome,
				data_nascimento: dataNascimento.split("T")[0],
				rua: rua,
				bairro: bairro,
				cidade: cidade,
				uf: uf,
				nro: numero,
				email: email,
				senha: password
			})
			alert("Preencha todos os dados!");
			return;
		}
		else {
			try {
				const response = await api.post('/cidadao', {
					cpf: CPF,
					nome_completo: nome,
					data_nascimento: dataNascimento.split("T")[0],
					rua: rua,
					bairro: bairro,
					cidade: cidade,
					uf: uf,
					nro: +numero,
					email: email,
					senha: password
				});
				console.log(response);
				if(response.status === 201) {
					alert("Cidadão registrado com sucesso!");
					navigate(`/`);
				}
				else 
					alert("Erro ao registrar cidadão!");
			}
			catch (e) {
				console.log(e);
			}
		}
	}

	useEffect(() => {
		if (toggle) {
			setTitleLoginColor("#000000");
			setTitleSignupColor("var(--secondary)");
		} else {
			setTitleLoginColor("var(--secondary)");
			setTitleSignupColor("#000000");
		}
	});

	return (
		<>
			<ContainerBase>
				<Square>
					<TopContainer>
						<div
							style={{ cursor: "pointer" }}
							onClick={() =>
								toggle ? setToggle(!toggle) : <></>
							}
						>
							<LoginSignupSpan toggle={titleLoginColor}>
								{" "}
								Cadastrar{" "}
							</LoginSignupSpan>
						</div>
						<div
							style={{ cursor: "pointer" }}
							onClick={() =>
								toggle ? <></> : setToggle(!toggle)
							}
						>
							<LoginSignupSpan toggle={titleSignupColor}>
								{" "}
								Entrar{" "}
							</LoginSignupSpan>
						</div>
					</TopContainer>
					<GrayLine />
					<MidContainer>
						{toggle ? (
							<Form onSubmit={handleSubmitLogin}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="E-mail"
									variant="outlined"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="Senha"
									variant="outlined"
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
								<Button text="Entrar" />
							</Form>
						) : (
							<Form onSubmit={handleSubmitRegister}>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Nome"
									variant="outlined"
									value={nome}
									onChange={(event) => setNome(event.target.value)}
								/>
								<br />
								<ContainerInputs>
									<TextField
										fullWidth
										id="outlined-basic"
										label="CPF"
										variant="outlined"
										value={CPF}
										onChange={(event) => setCPF(event.target.value)}
									/>
									<br />
									<Input
										value={dataNascimento}
										type="date"
										onChange={(e) => setDataNascimento(e.target.value)}
									/>
								</ContainerInputs>
								<br />
								<ContainerInputs>
								<TextField
									fullWidth
									id="outlined-basic"
									label="Rua"
									variant="outlined"
									value={rua}
									onChange={(event) => setRua(event.target.value)}
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="Numero"
									variant="outlined"
									value={numero}
									onChange={(event) => setNumero(event.target.value)}
								/>
								<br />
								</ContainerInputs>
								<br />	
								<ContainerInputs>
								<TextField
									fullWidth
									id="outlined-basic"
									label="bairro"
									variant="outlined"
									value={bairro}
									onChange={(event) => setBairro(event.target.value)}
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="cidade"
									variant="outlined"
									value={cidade}
									onChange={(event) => setCidade(event.target.value)}
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="UF"
									variant="outlined"
									value={uf}
									onChange={(event) => setUf(event.target.value)}
								/>
								</ContainerInputs>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="E-mail"
									variant="outlined"
									value={email}
									onChange={(event) => setEmail(event.target.value)}
								/>
								<br />
								<TextField
									fullWidth
									id="outlined-basic"
									label="Senha"
									variant="outlined"
									type="password"
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
								<br />
								<Button text="Cadastrar" />
							</Form>
						)}
					</MidContainer>
				</Square>
			</ContainerBase>
			<Snackbar
				open={state.open}
				onClose={handleClose}
				message="Cadastro realizado com Sucesso! Vá em 'Entrar' e entre com sua conta!"
				key={state.vertical + state.horizontal}
			/>
		</>
	);
};
export default Login;
