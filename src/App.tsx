import { Routes, Route } from "react-router"
import Header from "@/components/UI/Header"
import MapLister from "@/features/maps/MapLister"
import TeamBuilder from "@/features/teamBuilder/TeamBuilder"
import PlayerHistory from "@/features/stats/PlayerHistory"
import Rank from "@/features/stats/Rank"
import NotFound from "@/components/UI/NotFound"
import Profile from "@/features/profile/Profile"
import ClassesOfPlayers from "./features/classesOfPlayers/ClassesOfPlayers"
import { handleTheme } from "./utils/theme"

handleTheme()


export default function App() {
	
	return (
	<>
		<Header />	
		<Routes>
			<Route path="/picker" element={<TeamBuilder />} />         
			<Route path="/classes-des-joueurs" element={<ClassesOfPlayers />} />    
			<Route path="/maps" element={<MapLister />} />
			<Route path="/stats/:pseudo" element={<PlayerHistory />} />            
			<Route path="/classement" element={<Rank title="Classement" range="B2:G25" />} />
			<Route path="/" element={<Profile />} />
			<Route path="/*" element={<NotFound message="Page non trouvée!" />} />
		</Routes>
	</>
	)
}