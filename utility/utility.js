


/*-------------------Need to test and use the following function for Links in ToggleList.jsx ------*/
export const getNodeLabelFromId = (id, nodes) => {
    // The is will probably come from a link object i.e.:, link.sourceNodeId
    // the nodes array is already assumed to be filtered doen by selectedCase, (although it may not matter it could be a performance hindrance)
    return 
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