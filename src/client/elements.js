import styled from 'styled-components';

import svgDataSource from './img/data-source.svg';
import svgStudyModule from './img/study-module.svg';
import svgPreprocessingModule from './img/preprocessing-module.svg';
import svgInferenceModule from './img/inference-module.svg';
import svgResult from './img/result.svg';

export const Wrap = styled.div`
  width: 500px;
  height: 500px;
  margin: 50px auto;
  border: 5px dashed pink;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Icon = styled.img`
  display: block;
  width: 42px;
  height: 42px;
  transform: scale(0.5);
`;

export const DataSource = styled(Icon).attrs({
  src: svgDataSource,
  alt: 'database'
})``;

export const StudyModule = styled(Icon).attrs({
  src: svgStudyModule,
  alt: 'study module'
})``;

export const PreprocessingModule = styled(Icon).attrs({
  src: svgPreprocessingModule,
  alt: 'preprocessing module'
})``;

export const InferenceModule = styled(Icon).attrs({
  src: svgInferenceModule,
  alt: 'inference module'
})``;

export const Result = styled(Icon).attrs({
  src: svgResult,
  alt: 'result'
})``;

export const WrapNode = styled.div.attrs({ draggable: 'true' })`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
`;

export const NodeLabel = styled.span`
  position: absolute;
  bottom: 0;
`;

export const Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 5px;
`;

export const Form = styled.form`
  padding: 20px;
  margin: 20px auto;
  border-radius: 20px;
  border: 5px dashed pink;
  display: flex;
  width: 400px;
`;

export const Fieldset = styled.fieldset`
  flex: 1;
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
`;
