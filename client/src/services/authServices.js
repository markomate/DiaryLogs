import diarylogsAPI from "../config/api";

export async function signUp(data){
  const response = await diarylogsAPI.post('/auth/signup', data)
  return response.data
}

export async function signIn(data){
  const response = await diarylogsAPI.post('/auth/signin', data)
  // console.log(response.data)
  return response.data
}