import HeaderPage from '@/components/UI/HeaderPage'
import { Outlet } from "react-router-dom"

export function LayoutWithHeader() {
	return (
		<>
		<HeaderPage />
		<Outlet />
		</>
	)
}

export function LayoutNoHeader() {
  	return <Outlet />
}
