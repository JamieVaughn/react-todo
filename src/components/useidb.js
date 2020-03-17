import {useState, useEffect} from 'react'

const dbp = new Promise((resolve, reject) => {
    const openreq = window.indexedDB.open('use-db', 1)
    openreq.onerror = () => reject(openreq.error)
    openreq.onsuccess = () => resolve(openreq.result)
    openreq.onupgradeneeded = () => openreq.result.createObjectStore('idb')
})

const call = async (type, method, ...args) => {
    const db = await dbp
    const transaction = db.transaction('idb', type)
    const store = transaction.objectStore('idb')
    return new Promise((resolve, reject) => {
        const req = store[method](...args)
        transaction.oncomplete = () => resolve(req)
        transaction.onabort = transaction.onerror = () => reject(transaction.error)
    })
}

const get = async key => (await call('readonly', 'get', key)).result
const set = (key, value) => value === undefined ? call('readwrite', 'delete', key) : call('readwrite', 'put', value, key)

export default function UseIdb(key, initialState) {
    const [item, setItem] = useState(initialState)
    
    useEffect(() => {
        get(key).then(value => value === undefined || setItem(value))
    }, [key])

    return [
        item,
        value => {
            setItem(value)
            return set(key, value)
        }
    ]
}