import { Routes, Route } from "react-router";
import Header from "@/components/UI/Header";
import Classes from "@/components/Classes";
import MapLister from "@/components/Maps/MapLister";
import TeamBuilder from "@/components/TeamBuilder/TeamBuilder";
import CallAPI from "@/components/stats/CallAPI";
import Rank from "@/components/Rank";

export default function App() {
	

	return (<>
		<Header />	
		<Routes>
			<Route path="/picker" element={<TeamBuilder />} />         
			<Route path="/classes-des-joueurs" element={<Classes />} />    
			<Route path="/maps" element={<MapLister />} />         
			<Route path="/stats" element={<CallAPI />} />            
			<Route path="/classement" element={<Rank />} />         
		</Routes>
	</>)
}
