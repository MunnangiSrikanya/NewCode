/* eslint-disable */
import axios from 'axios';

export async function getMessages() {
  return await axios.get('https://mocki.io/v1/377c707e-64a2-40e6-be30-e79c8e950af6');
}
