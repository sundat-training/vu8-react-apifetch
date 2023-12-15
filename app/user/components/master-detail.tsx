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

export function UserForm({user}: {user: User | null}){
    console.log("render ", user);
    
    return (
        <form 
        className="max-w-md "
        >
            <FormItem value={user?.firstName} attr="firstName" label="FirstName" />
            <FormItem value={user?.lastName} attr="lastName" label="LastName" />
        </form>
    )
}

interface UserForm2Props {
    initialUser:User;
    onSubmit: (updatedUser: User) => void;
  }
  
 export const UserForm2 = ({ initialUser, onSubmit }:UserForm2Props) => {
    const [user, setUser] = useState(initialUser);
    const [isDirty, setIsDirty] = useState(false);
  
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

