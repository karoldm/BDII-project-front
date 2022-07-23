import React, { useState } from "react";
import { StyledDropdownMenu, StyledDropdownItem, IconButton } from "./styles";
import { Link } from "react-router-dom";
import { AiOutlineAreaChart } from "react-icons/ai";

const SlideDownMenu = () => {
	const [admin, setAdmin] = useState(true); //medida provisória para saber que quem está logado é ou não um admin, em caso de true é um admin

	const DropdownItem = (props) => {
		return (
			<>
				<StyledDropdownItem>
					<IconButton>{props.icon}</IconButton>
					{props.children}
				</StyledDropdownItem>
			</>
		);
	};
	return (
		<StyledDropdownMenu>
			<Link to="/login" style={{ textDecoration: "none" }}>
				<DropdownItem icon={<AiOutlineAreaChart />}>
					Login/Sair
				</DropdownItem>
			</Link>
			{admin && (
				<>
					<Link to="/admin" style={{ textDecoration: "none" }}>
						<DropdownItem icon={<AiOutlineAreaChart />}>
							Admin
						</DropdownItem>
					</Link>
				</>
			)}
		</StyledDropdownMenu>
	);
};

export default SlideDownMenu;
