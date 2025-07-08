import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";

export function PublicLayout() {
    return (
        <>
            <Header />
            <main><Outlet /></main>
        </>
    )
}