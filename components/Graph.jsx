
import PanZoom from "./PanZoom"
import Node from "./Node"
import Link from "./Link"
import { useCase } from "../hooks/useCase";
import { useEffect, useState } from "react";




const Graph = ( ) => {
  const { nodes, links } = useCase()
  const [ nodeValues, setNodeValues ] = useState([])

  useEffect(() => {
    if (nodes?.length) {
      const initialized = nodes.map(node => ({
        ...node,
        x: Math.random()*200,
        y: Math.random()*300,
      }))
      setNodeValues(initialized)
    }

    nodeValues.forEach(node => console.log(node.x, node.y))


  }, [ nodes ])

  if (!nodes?.length || !links?.length) return null



  return (
    <PanZoom>

      {links.map((link) => {
        const source = nodeValues.find( node => node.$id === link.sourceNodeId);
        const target = nodeValues.find( node => node.$id === link.targetNodeId);
        if (!source || !target) return null
        return <Link key={link.$id} source={source} target={target} />;
      })}

      {nodeValues.map((node) => (
        <Node key={node.$id} node={node} />
      ))}

    </PanZoom>
  );
};

export default Graph