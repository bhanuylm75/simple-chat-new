
import getLocalUser from "./getuserdata"
import axios from 'axios'


export default  async function getchatpatner(chatid){
  const a=getLocalUser()
  const b=JSON.parse(JSON.stringify(a))
  const [userId1, userId2] = chatid.split('--')
  console.log(b)
  const chatPartnerId = userId1 === b.id? userId2 : userId1
  const res= await axios.get(`https://api-chat.treepr.in/api/users/${chatPartnerId}`)
  //console.log(res)

  return res.data

 

}