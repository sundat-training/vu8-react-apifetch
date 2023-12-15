"use client"
import { Debug } from '@/components/debug'
import { fetchUsers, putUsers } from '@/lib/api'
import { User,Address } from '@/lib/types'
import { MouseEvent, useEffect, useState } from 'react'
import { UserForm, UserForm2, UserTable } from './components/master-detail'



export default function Page() {
    const [users,setUsers]= useState<User[] >( [] )
    const [loading,setLoading] = useState(true)
    const [seluser, setSeluser] = useState<User | null>(null) 

    useEffect(() => {
        setLoading(true)
        fetchUsers()
            .then(usrs =>setUsers(usrs))
            .finally(() => setLoading(false))
    },[])

    console.log("user Page render");

    function submit(u:User) {
        putUsers(u)
            .then(console.log )
            .then(() =>{
                
                setLoading(true)
                fetchUsers()
                    .then(usrs =>setUsers(usrs))
                    .finally(() => setLoading(false))
            }
            )
    }
  return (
    <main className="flex min-h-screen flex-col  space-y-6  p-24">
        <h1>User</h1>

        {/* {Debug(users)} */}
        {loading? <p>loading...</p> : 
        // react fragment
        <>
            <UserTable data={users} selFn={setSeluser} />
            {seluser ? <UserForm2 initialUser={seluser} onSubmit={submit}/>: <></>}
        </>
        
        }  

    </main>
  )
}






