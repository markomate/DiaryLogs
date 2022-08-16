import diarylogsAPI from "../config/api";

export async function getLogs() {
  const response = await diarylogsAPI.get("/logs");
  return response.data;
}

export async function createLog(data){
  const response = await diarylogsAPI.post('/logs', data)
  return response.data
}

export async function updateLog(id, data) {
  const response = await diarylogsAPI.put(`/logs/${id}`, data);
  return response.data;
}

export async function removeLog(id) {
  const response = await diarylogsAPI.delete(`/logs/${id}`);
  return response.data;
}
