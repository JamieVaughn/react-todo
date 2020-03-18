import React, { useState } from 'react'
import { useEffect } from 'react'

 function useFetch(props) {
     console.log(props)
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const fetchData = async () => {
        try {
            const resp = await fetch(props.url);
            if(!resp.ok) throw new Error('Failed to fetch')
            const json = await resp.json();
            setData(json);
            setLoading(false)

        } catch (error) {
            setError(error)
            setLoading(false)
            console.log(error)
        }
        // fetch(props.url)
        //     .then(resp => resp.json())
        //     .then(d => {setData(d))
        //     .catch(err => console.log(err))
    }
    useEffect(() => {
        fetchData()
        console.log('state',data)
    }, [props.url])

    return { data, loading, error }
}


function DogPic() {
    const res = useFetch({url:"https://dog.ceo/api/breeds/image/random"});
    if (res.loading) {
      return <div>Loading...</div>
    } else if(res.error){
        return <div>There was a problem with the fetch</div>
    }
    const status = res.data.status
    const imageUrl = res.data.message
    return (
      <div className="App">
        <div>
          <h3>{status}</h3>
          <div>
            <img src={imageUrl} alt="avatar" />
          </div>
        </div>
      </div>
    );
  }

  export {useFetch, DogPic}