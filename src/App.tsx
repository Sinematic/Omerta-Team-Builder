import { Routes, Route } from "react-router"
import Header from "@/components/UI/Header"
import Classes from "@/components/Classes"
import MapLister from "@/components/Maps/MapLister"
import TeamBuilder from "@/components/TeamBuilder/TeamBuilder"
import PlayerHistory from "@/components/Stats/PlayerHistory"
import Rank from "@/components/Stats/Rank"
import NotFound from "@/components/UI/NotFound"
import Profile from "./components/Profile/Profile"

export default function App() {
	
	return (
	<>
		<Header />	
		<Routes>
			<Route path="/picker" element={<TeamBuilder />} />         
			<Route path="/classes-des-joueurs" element={<Classes />} />    
			<Route path="/maps" element={<MapLister />} />
			<Route path="/stats/:pseudo" element={<PlayerHistory />} />            
			<Route path="/classement" element={<Rank title="Classement" range="B2:G25" />} />
			<Route path="/" element={<Profile />} />
			<Route path="/*" element={<NotFound message="Page non trouvée!" />} />
		</Routes>
	</>
	)
}