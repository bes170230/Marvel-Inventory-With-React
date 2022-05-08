let token = '858561e382b29ef97a540d40e4b7eb44d80429a227fc195f';

export const serverCalls = {
    get: async () => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvels`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        });

        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }
        return await response.json()
    },

    create: async (data: any = {}) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvels`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Failed to Create new Data on Server')
        }

        return await response.json()
    },

    update: async( id:string, data:any = {} ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvels/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
    },

    delete: async ( id:string ) => {
        const response = await fetch(`http://127.0.0.1:5000/api/marvels/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
        });
    }
}