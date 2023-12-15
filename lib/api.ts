import { User } from "./types";


export async function fetchUsers() {
    const r = await fetch('http://localhost:3001/users');
    return await r.json();
}


const putRequestOptions={
    method: 'PUT',
    headers:{ 'Content-Type': 'application/json'}
}
export async function putUsers(u:User) {
    
    const opts={...putRequestOptions, body: JSON.stringify(u) }
    const r = await fetch('http://localhost:3001/users/'+u.id, opts);
    return await r.json();
}
export async function postUsers(u:User) {
    
    const opts={...putRequestOptions,method: 'POST', body: JSON.stringify(u) }
    const r = await fetch('http://localhost:3001/users', opts);
    return await r.json();
}
