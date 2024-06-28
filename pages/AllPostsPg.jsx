import React, {useState, useEffect} from 'react'
import { ContainerComp, PostCardComp } from '../components'
import appwriteConfigService from "../appwrite/appwriteConfig";

function AllPostsPg() {
    const [posts, setPosts] = useState([])
    useEffect(() => {}, [])
    appwriteConfigService.getAllPost([]).then((posts) => {
        if (posts) {
            setPosts(posts.documents)
        }
    })
  return (
    <div className='w-full py-8'>
        <ContainerComp>
            <div className='flex flex-wrap'>
                {posts.map((post) => (
                    <div key={post.$id} className='p-2 w-1/4'>
                        <PostCardComp {...post} />
                    </div>
                ))}
            </div>
            </ContainerComp>
    </div>
  )
}

export default AllPostsPg