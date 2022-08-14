import diarylogsAPI from "../config/api";

export async function getLogs(){
  const response = await diarylogsAPI.get('/logs')
  return response.data
}

export async function createLog(data){
  const response = await diarylogsAPI.post('/logs', data)
  return response.data
}