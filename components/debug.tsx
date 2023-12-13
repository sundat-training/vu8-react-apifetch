"use client";
export function Debug(data: any) {
    return <div className='w-5/6 max-h-80  overflow-y-auto'>

        <pre className=' '
        >{JSON.stringify(data, null, 2)}</pre>

    </div>;
}
