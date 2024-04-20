'use client'
import { Button } from "@/components/ui/button";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import Link from "next/link"
import { useEffect, useReducer, useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export default function BlogsPage() {
    const { toast } = useToast()
    const [loading, setLoading] = useState<boolean>(false);

    let loadingContent;
    const [response, setResponse] = useReducer((prev: any, next: any) => {
        return { ...prev, ...next }
    }, {
        data: [],
        loading: false
    })
    const fetchBlogs = async () => {
        const res = fetch("/api/blogs", { method: 'GET' });
        const response = await (await res).json()
        setResponse({
            data: response.data,
            loading: false
        })
    }

    useEffect(() => {
        fetchBlogs()
        setResponse({
            data: response.data,
            loading: true
        })
    }, [])

    if (response.loading == true) {
        loadingContent = (
            <div className="grid  gap-4 animate-pulse ">
                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
                <div className="h-4 bg-slate-200 rounded col-span-2"></div>
            </div>
        )
    }

    const deleteBlog = async (id: any) => {
        setLoading(true)
        const res = await fetch("/api/blogs", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ id })
        })
        const response = await res.json();
        if (response?.status === 204) {
            toast({
                description: "Your message has been sent.",
            });
            await fetchBlogs();
            setLoading(false)
        }
    }

    return <>
        <div className="flex mb-7">
            <h1 className="text-3xl font-bold">Blogs</h1>
        </div>
        {
            response.loading ? (
                <> {loadingContent}</>
            ) :
                (
                    <>
                        {
                            response.data.length ?
                                <>
                                    {response.data.map((d: { title: string, id: string, description: any }) => (
                                        <div key={d.id} className="my-4 flex justify-between group border-b">
                                            <Link className="mb-4 text-blue-500 font-semibold" href={`/admin/blogs/${d.id}`}>
                                                <p className="text-xl">{d.title}</p>
                                                <p className="text-sm text-gray-500 font-medium">{d?.description ? d?.description : ""}</p>

                                            </Link>
                                            <div >
                                                <Dialog>
                                                    <DialogTrigger>
                                                        <Button variant={"secondary"} className=" opacity-90 bg-[#e1e0e0c2] hover:bg-[#dc2626] hover:text-white fotn-bold mr-32"><TrashIcon /></Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="sm:max-w-[425px] bg-white">
                                                        <DialogHeader>
                                                            <DialogTitle>Delete Confirmation</DialogTitle>
                                                            <DialogDescription>
                                                                Make sure you want to delete <b>{d.title}</b>?.
                                                            </DialogDescription>
                                                        </DialogHeader>

                                                        {/* <DialogFooter> */}
                                                        <div className="flex justify-between">
                                                            <div></div>
                                                            <button disabled={loading} onClick={() => deleteBlog(d.id)} className="bg-[#dc2626] text-white py-1 px-4 rounded-md">
                                                                {
                                                                    loading ? (<ReloadIcon className="animate-spin" />) : 'Delete'
                                                                }
                                                            </button>
                                                        </div>
                                                        {/* </DialogFooter> */}
                                                    </DialogContent>
                                                </Dialog>
                                            </div>

                                        </div>
                                    ))}

                                </> :
                                <>
                                    <h1>No data found</h1>
                                </>

                        }
                    </>
                )
        }

    </>
}