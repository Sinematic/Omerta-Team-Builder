import { Routes, Route } from "react-router"
import MapLister from "@/features/maps/MapLister"
import TeamBuilder from "@/features/teamBuilder/TeamBuilder"
import PlayerHistory from "@/features/stats/PlayerHistory"
import NotFound from "@/components/UI/NotFound"
import Profile from "@/features/profile/Profile"
import ClassesOfPlayers from "@/features/classesOfPlayers/ClassesOfPlayers"
import RankPage from "@/features/stats/RankPage"
import HeaderPage from "@/components/UI/HeaderPage"
import LadderPage from "./features/ladder/LadderPage"
import { handleTheme } from "./utils/theme"
handleTheme()


export default function App() {
	
	return (
	<>
		<HeaderPage />	
		<Routes>
			<Route path="/draft" element={<TeamBuilder />} />         
			<Route path="/classes-des-joueurs" element={<ClassesOfPlayers />} />    
			<Route path="/maps" element={<MapLister />} />
			<Route path="/stats/:pseudo" element={<PlayerHistory />} />        
			<Route path="/classement" element={<RankPage />} />
			<Route path="/" element={<Profile />} />
			<Route path="/*" element={<NotFound message="Page non trouvée!" />} />
			<Route path="/generate-ladder" element={<LadderPage />} />
		</Routes>
	</>
	)
}