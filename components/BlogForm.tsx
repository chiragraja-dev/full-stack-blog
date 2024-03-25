"use client";
// @ts-ignore
import { Editor, editorProps } from "novel"
import { Button } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";
import { redirect } from "next/navigation";



export default function BlogForm() {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogContent, setBlogContent] = useState('')

    const updateContent = useCallback((data: editorProps) => {
        setBlogContent(data.getJSON())
    }, [])

    const onSubmit = async () => {
        const req = await fetch("/api/blogs", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: blogContent,
                content: blogContent
            })
        })
        const res = req.json()
        // if (await res) {
        //     redirect("/admin/blogs")
        // }
    }
    return (
        <>
            <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input type="email" value={blogTitle} placeholder="Email" onChange={(e) => { setBlogTitle(e.target.value) }} />
            </div>
            <div className="mt-3 " draggable="false">
                <Label htmlFor="">Content</Label>
                <Editor
                    editorProps={{

                    }}
                    onDebouncedUpdate={updateContent}
                    defaultValue={blogContent}
                    className="border rounded pb-5"
                    disableLocalStorage
                />
            </div>
            <div className="mt-4 flex float-right gap-3">
                <Button variant={'secondary'} className="border">  Cancel</Button>
                <Button onClick={onSubmit} className=" bg-slate-900 text-white hover:text-sky-400 flex items-center gap-2"> <CheckIcon /> Save</Button>
            </div>
        </>
    )
}
// "use client";
// // @ts-ignore
// // import { Editor, editorProps } from "novel";

