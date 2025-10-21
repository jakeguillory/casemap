import { useGraph } from "../hooks/useGraph"
import PanZoom from "./PanZoom"
import Node from "./Node"
import Link from "./Link"




const Graph = () => {
  const { nodes, links } = useGraph()

  return (
    <PanZoom>
      {links.map((link) => {
        const source = nodes.find((n) => n.id === link.source);
        const target = nodes.find((n) => n.id === link.target);
        return <Link key={link.id} source={source} target={target} />;
      })}
      {nodes.map((node) => (
        <Node key={node.id} node={node} />
      ))}
    </PanZoom>
  );
};

export default Graph