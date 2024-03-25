"use client";
// @ts-ignore
import { Editor, editorProps } from "novel"
import { Button } from "./ui/button";
import { CheckIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCallback, useState } from "react";


export default function BlogForm() {
    const [blogForm, setBlogForm] = useState({})
    const [blogContent, setBlogContent] = useState({})

    const updateContent = useCallback((data: editorProps) => {
        console.log(data.getJSON())
    }, [])
    return (
        <>
            <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input type="email" placeholder="Email" />
            </div>
            <div className="mt-3 " draggable="false">
                <Label htmlFor="">Content</Label>
                <Editor
                    editorProps={{

                    }}
                    onDebouncedUpdate={updateContent}
                    defaultValue={""}
                    className="border rounded pb-5"
                    disableLocalStorage
                />
            </div>
            <div className="mt-4 flex float-right gap-3">
                <Button variant={'secondary'} className="border">  Cancel</Button>
                <Button className=" bg-slate-900 text-white hover:text-sky-400 flex items-center gap-2"> <CheckIcon /> Save</Button>
            </div>
        </>
    )
}
// "use client";
// // @ts-ignore
// // import { Editor, editorProps } from "novel";

