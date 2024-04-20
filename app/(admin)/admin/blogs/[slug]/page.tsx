'use client'
import BlogForm from "@/components/BlogForm";
import { useEffect, useReducer } from "react";
import { useParams } from 'next/navigation'

interface paramProps {
    slug: string
}

interface blogDetailPageProps {
    param: paramProps
}

export default function Blogs() {
    const param = useParams()
    const [response, setResponse] = useReducer((prev: any, next: any) => {
        return { ...prev, ...next }
    }, {
        loading: true
    })
    const params = useParams<{ slug: string }>()

    const fetchBlogs = async () => {
        const res = fetch(`/api/blogs?id=${params?.slug}`, { method: 'GET' });
        const response = await (await res).json()
        setResponse({
            data: response.data,
            loading: false
        })

    }

    useEffect(() => {
        fetchBlogs()
    }, [])


    if (response?.loading) {
        return (
            <>Loading.....</>
        )
    }

    return (<>
        <BlogForm id={(param?.slug).toString()} value={response?.data} />
    </>)
}