import { seedDB } from "@/lib/seed";

export default function SeedDatabase() {
    return (
        <h1>{false && seedDB()}</h1>
    )
}