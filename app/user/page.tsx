"use client"
import { table } from 'console'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface User{
    id: number,
    firstName:string,
    lastName:string
}

const UserRow = (u:User) => (
    <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.firstName}</td>
        <td>{u.lastName}</td>
    </tr>)

    
const UserTable = ({data} : {data:User[]}) =>{
    return(
        <table className='table-auto w-full'>
            <thead>
                <tr>
                    <th>id</th>
                    <th>firstName</th>
                    <th>lastName</th>
                </tr>
            </thead>
            <tbody>
                {data.map( UserRow)}
            </tbody>
        </table>
    )
}

export default function Page() {
    const [users,setUsers]= useState<User[]>([])
    const [loading,setLoading] = useState(true)
                    
    useEffect(() => {
        setLoading(true)
        const users= fetch('https://dummyjson.com/users')
                    .then(res => res.json())
                    .then(usrs =>setUsers(usrs.users))
                    .finally(() => setLoading(false))
    },[])

  return (
    <main className="flex min-h-screen flex-col items-center space-y-6  p-24">
      <h1>User</h1>

    <div className='w-5/6 max-h-80  overflow-y-auto'>

        <pre className=' '
        >{JSON.stringify(users,null,2)}</pre>
          
    </div>
    {loading? <p>loading...</p> : <UserTable data={users}/>}  

    </main>
  )
}
