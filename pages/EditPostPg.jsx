import React, {useEffect, useState} from 'react'
import {ContainerComp, PostFormComp} from '../components'
import appwriteConfigService from "../appwrite/appwriteConfig";
import { useNavigate,  useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteConfigService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <ContainerComp>
            <PostFormComp post={post} />
        </ContainerComp>
    </div>
  ) : null
}

export default EditPost