"use client"
import { fetchUsers, postUsers, putUsers } from '@/lib/api'
import { User } from '@/lib/types'
import { useState } from 'react'
import {  UserForm, UserTable } from './components/master-detail'
import { useMutation, useQuery } from '@tanstack/react-query'



export default function Page() {
    const [seluser, setSeluser] = useState<User | null>(null) 

    const query = useQuery( {queryKey: ['users'], queryFn: fetchUsers} )

    const mutation = useMutation({
        mutationFn: putUsers,
        onSuccess : () =>{
             query.refetch()
        } 
    })

    console.log("user Page render", seluser);

    function submit(u:User) {
        //post
       if (u.id == null) {
            postUsers(u)
            query.refetch()
       }
       //put
       if (u.id != null) {
            mutation.mutate(u)
       }
    }
  return (
    <main className="flex min-h-screen flex-col  space-y-6  p-24">
        <h1>User</h1>
        <button onClick={()=> setSeluser({} as User)}>Create New</button>

        { query.isLoading && <p>loading...</p> }

        { query.isFetched &&
        <>
            <UserTable data={query.data} selFn={setSeluser} />
            {seluser ? <UserForm initialUser={seluser} onSubmit={submit}/>: <></>}
        </>
        }
        
         

    </main>
  )
}






