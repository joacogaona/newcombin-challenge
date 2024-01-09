import axios from "axios";
import { Member } from "../types/members";

async function fetchMembers(token:string) {
    const res = await axios.get(
      `http://localhost:8081/api/members`,{
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      }
    );
    return res.data as Member[];
  }

  async function createMember(member:Member,token:string) {
    return  axios.post('http://localhost:8081/api/members',member,{
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    } )
  }



  export {fetchMembers,createMember}