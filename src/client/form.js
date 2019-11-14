import React, { useState, useEffect } from 'react';

import {
  DataSource,
  StudyModule,
  PreprocessingModule,
  InferenceModule,
  Result,
  Label,
  Form,
  Fieldset
} from './elements';

export default function WorkflowForm({
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
}) {
  const [newLabel, setNewLabel] = useState('');
  const [newIcon, setNewIcon] = useState('datasource');

  useEffect(() => {
    console.log('selectedNode', selectedNode);

    if (selectedNode) {
      if (selectedNode.data.label) {
        setNewLabel(selectedNode.data.label);
      }

      if (selectedNode.data.icon) {
        setNewIcon(selectedNode.data.icon);
      }
    }
  }, [selectedNode ? selectedNode.data.label : '', selectedNode ? selectedNode.data.icon : '']);

  return (
    <Form>
      <Fieldset>
        <Label>
          <input
            type="radio"
            name="type"
            value="datasource"
            checked={icon === 'datasource'}
            onChange={() => setIcon('datasource')}
          />
          <DataSource />
          <span>데이터 소스</span>
        </Label>
        <Label>
          <input
            type="radio"
            name="type"
            value="preprocessing"
            checked={icon === 'preprocessing'}
            onChange={() => setIcon('preprocessing')}
          />
          <PreprocessingModule />
          <span>전처리 모듈</span>
        </Label>
        <Label>
          <input
            type="radio"
            name="type"
            value="study"
            checked={icon === 'study'}
            onChange={() => setIcon('study')}
          />
          <StudyModule />
          <span>학습 모듈</span>
        </Label>
        <Label>
          <input
            type="radio"
            name="type"
            value="inference"
            checked={icon === 'inference'}
            onChange={() => setIcon('inference')}
          />
          <InferenceModule />
          <span>추론 모듈</span>
        </Label>
        <Label>
          <input
            type="radio"
            name="type"
            value="result"
            checked={icon === 'result'}
            onChange={() => setIcon('result')}
          />
          <Result />
          <span>결과</span>
        </Label>
        <Label>
          <span>레이블</span>
          <input
            type="text"
            name="label"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </Label>
        <button type="button" onClick={onClickCreateNode}>
            노드 생성
        </button>
      </Fieldset>
      <Fieldset>
        <Label>
          <span>source</span>
          <select
            name="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          >
            {data.nodes
              .filter((n) => n.id !== target)
              .map((n) => (
                <option key={`source-${n.id}`} value={n.id}>
                  {n.label}
                </option>
              ))}
          </select>
        </Label>
        <Label>
          <span>target</span>
          <select
            name="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
          >
            {data.nodes
              .filter((n) => n.id !== source)
              .map((n) => (
                <option key={`target-${n.id}`} value={n.id}>
                  {n.label}
                </option>
              ))}
          </select>
        </Label>
        <button type="button" onClick={onClickCreateLink}>
            링크 생성
        </button>
        {selectedNode && selectedNode.type === 'node'
          ? (
            <>
              <hr />
              <span>
                {`노드 ${selectedNode.data.label || selectedNode.data.id} 수정하기`}
              </span>
              <Label>
                <span>유형</span>
                <select
                  value={newIcon}
                  onChange={(e) => setNewIcon(e.target.value)}
                >
                  <option value="datasource">데이터소스</option>
                  <option value="preprocessing">전처리 모듈</option>
                  <option value="study">학습 모듈</option>
                  <option value="inference">추론 모듈</option>
                  <option value="result">결과</option>
                </select>
              </Label>
              <Label>
                <span>레이블</span>
                <input
                  type="text"
                  name="label"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                />
              </Label>
              <button
                type="button"
                onClick={() => {
                  const { id, x, y } = selectedNode.data;

                  onClickModifyNode({
                    id, x, y, label: newLabel, icon: newIcon
                  });
                }}
              >
                수정
              </button>
            </>
          )
          : null}
      </Fieldset>
    </Form>
  );
}
