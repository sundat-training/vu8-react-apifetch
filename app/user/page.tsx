"use client"
import { Debug } from '@/components/debug'
import { fetchUsers } from '@/lib/api'
import { User } from '@/lib/types'
import { MouseEvent, useEffect, useState } from 'react'
import { UserForm, UserTable } from './components/master-detail'


    

export default function Page() {
    const [users,setUsers]= useState<User[] >( [] )
    const [loading,setLoading] = useState(true)
    const [seluser, setSeluser] = useState<User | null>(null) 

    useEffect(() => {
        setLoading(true)
        fetchUsers()
            .then(usrs =>setUsers(usrs.users))
            .finally(() => setLoading(false))
    },[])

    console.log("user Page render");

  return (
    <main className="flex min-h-screen flex-col  space-y-6  p-24">
        <h1>User</h1>

        {/* {Debug(users)} */}
        {loading? <p>loading...</p> : 
        // react fragment
        <>
            <UserTable data={users} selFn={setSeluser} />
            {seluser ? <UserForm user={seluser}/>: <></>}
        </>
        
        }  

    </main>
  )
}




