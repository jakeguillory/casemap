import React,{ createContext, useState } from "react";







export const GraphContext = createContext()

export function GraphProvider({children}) {
    const [nodes, setNodes] = useState([
        {id: "1", label: "Detective", x: 100, y: 200},
        {id: "2", label: "Suspect", x: 250, y: 350},
        {id: "3", label: "Crip Org", x: 200, y: 300},
        {id: "4", label: "Sinaloa Cartel", x: 50, y: 100},
        {id: "5", label: "Bugsy Siegel", x: 400, y: 500},
        {id: "6", label: "El Chapo", x: 325, y: 425},
        {id: "7", label: "Vladimir Putin", x: 125, y: 225},
        {id: "8", label: "Palantir", x: 225, y: 325},
    ])

    const [links, setLinks] = useState([
        { id: "1", source: "1", target: "2" },
        { id: "2", source: "1", target: "8" },
        { id: "3", source: "1", target: "3" },
        { id: "4", source: "2", target: "4" },
        { id: "5", source: "3", target: "8" },
        { id: "6", source: "4", target: "5" },
        { id: "7", source: "5", target: "6" },
        { id: "8", source: "6", target: "8" },
        { id: "9", source: "7", target: "8" },
        { id: "10", source: "7", target: "6" },
        { id: "11", source: "7", target: "2" },
        { id: "12", source: "8", target: "2" },
    ])

    const updateNodePosition = (id, x, y) => {
        setNodes((prev) =>
            prev.map((node) => (node.id === id ? { ...node, x, y } : node))
        )
    }

    return (
        <GraphContext.Provider value={{ nodes, links, setNodes, setLinks, updateNodePosition }}>
            {children}
        </GraphContext.Provider>
    )

}