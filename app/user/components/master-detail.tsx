import { FormItem } from "@/components/forms"
import { User } from "@/lib/types"
import { useEffect, useState } from "react"

interface TUserRow{
    u:User,
    selFn: (u:User) => void
}

export const UserRow = ({u,selFn} : TUserRow) => (
    <tr 
    className='border-b'
    onClick={() => selFn(u)}
    >
        <td 
        className='whitespace-nowrap px-6 py-2'>
            {u?.id}</td>
        <td 
        className='whitespace-nowrap overflow-hidden text-ellipsis px-6 py-2'>
            {u?.firstName} </td>
        <td 
        className='whitespace-nowrap overflow-hidden text-ellipsis px-6 py-2'>
            {u?.lastName} </td>
    </tr>)

interface TUserTable {
    data: User[],
    selFn: (u:User) => void
}

export const UserTable = ({data, selFn} : TUserTable) =>{
    return(
        <div className='h-52 w-1/2 overflow-y-auto '>
            <table className='table-fixed  w-full text-left text-sm font-light bg-slate-100 overflow-y-visible'>
                <thead className='border-b'>
                    <tr>
                        <th className='w-12 px-6 py-4'>#</th>
                        <th className='px-6 py-4'>firstName</th>
                        <th className='px-6 py-4'>lastName</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(u => <UserRow key={u.id} u={u} selFn={selFn} />)}
                </tbody>
            </table>
        </div>
    )
}


interface UserFormProps {
    initialUser:User;
    onSubmit: (updatedUser: User) => void;
  }
  
 export const UserForm = ({ initialUser, onSubmit }:UserFormProps) => {
    const [user, setUser] = useState(initialUser);
    const [isDirty, setIsDirty] = useState(false);
    
    console.log("userform", initialUser, user )
    useEffect(() => {
      setUser(initialUser);
      setIsDirty(false);
    }, [initialUser]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
      setIsDirty(true);
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (isDirty) {
        onSubmit(user);
        setIsDirty(false);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>

        <FormItem value={user.firstName} attr="firstName" label="FirstName" onChange={handleChange}/>
        <FormItem value={user.lastName} attr="lastName" label="LastName" onChange={handleChange}/>
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  };

