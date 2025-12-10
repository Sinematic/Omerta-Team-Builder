import { Routes, Route } from "react-router";
import Header from "./components/Header";
import Picker from "./components/Picker";
import Classes from "./components/Classes";

export default function App() {
	

  return (
		<>
			<Header />	
			<Routes>
				<Route path="/picker" element={<Picker />} />         
				<Route path="/classes-des-joueurs" element={<Classes />} />         
			</Routes>
		</>
	);
}
