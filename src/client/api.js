import axios from 'axios';

export async function fetchData({ setData }) {
  try {
    const { data } = await axios.get('/api/data');

    console.log('data', data);
    setData(data);
  } catch (error) {
    console.log('errofr', error);
  }
}

export async function createNode({
  e, icon, label, setLabel, setData
}) {
  e.preventDefault();

  try {
    const resp = await axios.post('/api/node', { icon, label });

    console.log('data', resp.data);

    setData(resp.data.data);
    setLabel('');
  } catch (error) {
    console.log('error', error);
  }
}

export async function modifyNode({ node, setData, setLabel }) {
  try {
    const resp = await axios.put('/api/node', node);

    console.log('data', resp.data);

    setData(resp.data.data);
    setLabel('');
  } catch (error) {
    console.log('error', error);
  }
}

export async function createLink({
  e, source, target, setData
}) {
  e.preventDefault();

  const resp = await axios.post('/api/link', { source, target });

  console.log('data', resp.data);

  setData(resp.data.data);
}
