
export const getNodeLabelFromId = (nodeId, nodes) => {

    const node = nodes.find(node => node.$id === nodeId)
    
    return node ? node.label : "Unknown Node"
}

export const filterRelevantLinks = (nodeId, links) => {
    const filteredLinks = links.filter(link => link.sourceNodeId == nodeId || link.targetNodeId == nodeId)

    return filteredLinks
}


export const makeNodeOptions = nodes => {

    const nodeOptions = nodes.map(node => {
        return {
            label: node.label,
            value: node.$id,
        }
    })

    return nodeOptions
}


export const toTitleCase = str => {

    if (typeof str !== 'string' || str.length === 0) return ""

    return str.charAt(0).toUpperCase() + str.slice(1)
}


