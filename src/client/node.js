import React, { useEffect, useRef } from 'react';

import {
  DataSource,
  StudyModule,
  PreprocessingModule,
  InferenceModule,
  Result,
  WrapNode
} from './elements';

function getImage(type) {
  if (type === 'preprocessing') {
    return <PreprocessingModule />;
  }
  if (type === 'study') {
    return <StudyModule />;
  }
  if (type === 'inference') {
    return <InferenceModule />;
  }

  if (type === 'result') {
    return <Result />;
  }

  return <DataSource />;
}

export default function Node({ node, setSelectedNode, modifyNode }) {
  const isDragging = useRef(false);
  const currentX = useRef(null);
  const currentY = useRef(null);
  const ref = useRef(null);


  function onClick(e) {
    e.preventDefault();

    setSelectedNode({ type: 'node', data: node });
  }

  function onMouseDown(e) {
    e.preventDefault();

    isDragging.current = true;
  }

  function onMouseMove(e) {
    e.preventDefault();

    if (!isDragging.current) {
      return;
    }

    const g = ref.current.closest('g');

    currentX.current = g.getAttribute('cx');
    currentY.current = g.getAttribute('cy');
  }

  async function postModifiedNode() {
    if (currentX.current !== null && currentY.current !== null) {
      const { id, label, icon } = node;
      const x = currentX.current && currentX.current < 1000 ? parseInt(currentX.current, 10) : 100;
      const y = currentY.current && currentY.current < 1000 ? parseInt(currentY.current, 10) : 100;

      await modifyNode({
        id, label, icon, x, y
      });

      isDragging.current = false;
    }
  }

  useEffect(() => {
    postModifiedNode();
  }, [currentX.current, currentY.current]);

  useEffect(() => {
    ref.current.addEventListener('click', onClick);
    ref.current.addEventListener('mousedown', onMouseDown);
    ref.current.addEventListener('mousemove', onMouseMove);

    return () => {
      ref.current.removeEventListener('click', onClick);
      ref.current.removeEventListener('mousedown', onMouseDown);
      ref.current.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const image = getImage(node.icon);

  return (
    <WrapNode
      // onClick={() => setSelectedNode({ type: 'node', data: node })}
      {...{
        ref
      }}
    >
      {image}
      {/* <NodeLabel>{node.label || node.id}</NodeLabel> */}
    </WrapNode>
  );
}
