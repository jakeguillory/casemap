import { node } from "prop-types"



/*-------------------Need to test and use the following function for Links in ToggleList.jsx ------*/
export const getNodeLabelFromId = (id, nodes) => {

    const node = nodes.find(node => node.$id === id)
    
    return node.label
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

