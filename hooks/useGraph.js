import { useContext } from "react"
import { GraphContext } from "../contexts/GraphContext"



export function useGraph() {
    const context = useContext(GraphContext)

    if (!context) {
        throw new Error("useCase must be used within a GraphProvider")
    }

    return context
}