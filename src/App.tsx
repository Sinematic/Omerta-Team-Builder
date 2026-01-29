import { Routes, Route } from "react-router"
import MapLister from "@/features/maps/MapLister"
import TeamBuilder from "@/features/teamBuilder/TeamBuilder"
import PlayerHistory from "@/features/stats/PlayerHistory"
import NotFound from "@/components/UI/NotFound"
import Profile from "@/features/profile/Profile"
import ClassesOfPlayers from "@/features/classesOfPlayers/ClassesOfPlayers"
import RankPage from "@/features/stats/RankPage"
import LadderPage from "./features/ladder/LadderPage"
import { handleTheme } from "./utils/theme"
import { LayoutNoHeader, LayoutWithHeader } from "./features/layout/Layouts"
handleTheme()


export default function App() {
	
	return (
	<>
		<Routes>
			<Route element={<LayoutWithHeader />}>
				<Route path="/draft" element={<TeamBuilder />} />         
				<Route path="/classes-des-joueurs" element={<ClassesOfPlayers />} />    
				<Route path="/maps" element={<MapLister />} />
				<Route path="/stats/:pseudo" element={<PlayerHistory />} />        
				<Route path="/classement" element={<RankPage />} />
				<Route path="/" element={<Profile />} />
				<Route path="/*" element={<NotFound message="Page non trouvée!" />} />
			</Route>
			
			<Route element={<LayoutNoHeader />}>
				<Route path="/generate-ladder" element={<LadderPage />} />
			</Route>

		</Routes>
		
	</>)
}