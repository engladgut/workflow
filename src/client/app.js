import React, { useState, useEffect } from 'react';
import { Graph } from 'react-d3-graph';

import {
  fetchData, createNode, modifyNode, createLink
} from './api';
import { Wrap } from './elements';
import Node from './node';
import config from './config';
import Form from './form';

export default function App() {
  const [data, setData] = useState({ nodes: [], links: [] });
  const [label, setLabel] = useState('');
  const [source, setSource] = useState('');
  const [target, setTarget] = useState('');
  const [icon, setIcon] = useState('datasource');
  const [selectedNode, setSelectedNode] = useState(null);

  useEffect(() => {
    fetchData({ setData, setSource, setTarget });
  }, []);

  useEffect(() => {
    if (data.nodes.length) {
      setSource(data.nodes[0].id);

      if (data.nodes.length > 1) {
        setTarget(data.nodes[1].id);
      }
    }
  }, [JSON.stringify(data.nodes.map((n) => n.id))]);

  function onClickCreateNode(e) {
    createNode({
      e,
      icon,
      label,
      setLabel,
      setData
    });
  }

  function onClickCreateLink(e) {
    createLink({
      e,
      source,
      setSource,
      target,
      setTarget,
      setData
    });
  }

  function onClickModifyNode(newNode) {
    modifyNode({ node: newNode, setData, setLabel });
    setSelectedNode(null);
  }

  return (
    <>
      <Wrap>
        {!data.nodes.length ? (
          <span>데이터가 없음.</span>
        ) : (
          <Graph
            id="graph" // id is mandatory, if no id is defined rd3g will throw an error
            {...{
              data: {
                ...data,
                nodes: data.nodes.map((n) => ({ ...n, x: parseInt(n.x, 10), y: parseInt(n.y, 10) }))
              },
              config: config((node) => (
                <Node
                  {...{
                    node,
                    setSelectedNode,
                    modifyNode(newNode) {
                      modifyNode({ node: newNode, setData, setLabel });
                    }
                  }}
                />
              )),
            }}
          />
        )}
      </Wrap>
      <Form
        {...{
          icon,
          setIcon,
          label,
          setLabel,
          onClickCreateNode,
          source,
          setSource,
          data,
          target,
          setTarget,
          onClickCreateLink,
          selectedNode,
          onClickModifyNode
        }}
      />
    </>
  );
}
