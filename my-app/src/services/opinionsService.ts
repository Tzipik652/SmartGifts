import axios from "axios";

export const getgetOpinionsByProductId = async (productId: string) => {
  const response = await axios.get(`http://localhost:3001/opinions?productId=${productId}`);
  return response.data;
};
export const addOpinion = async (opinion: any) => {
  return axios.post("http://localhost:3001/opinions", opinion);
};
export const deleteOpinion = async (opinionId: string) => {
  return axios.delete(`http://localhost:3001/opinions/${opinionId}`);
};