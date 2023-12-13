

export async function fetchUsers() {
    const r = await fetch('https://dummyjson.com/users');
    return await r.json();
}
