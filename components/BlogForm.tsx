"use client";
// @ts-ignore
import { Editor, editorProps } from "novel"
import { Button } from "./ui/button";
import { CheckIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCallback, useReducer, useState } from "react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

type Variants = "blog" | "project";
type Inputs = {
    title: string;
    content: string;
    description: string;
    tags: string[];
    cover_url: string;
};
interface BlogFormProps {
    id?: string;
    variant?: Variants;
    value?: Inputs;
}

export default function BlogForm({
    id,
    value,
    variant = "blog",


}: BlogFormProps) {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>()
    const [blogForm, setBlogForm] = useReducer((prev: any, next: any) => {
        return { ...prev, ...next }
    }, {
        title: value?.title || '',
        content: value?.content || '',
        description: value?.description || '',
        tags: value?.tags || []
    })

    const updateContent = useCallback((data: editorProps) => {
        setBlogForm({ content: data.getJSON() })
    }, [])


    const onSubmit = async () => {
        setLoading(true)
        let req;
        if (id) {
            req = await fetch(`/api/blogs?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogForm)
            })

        } else {
            req = await fetch("/api/blogs", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(blogForm)

            })
        }
        const res = await req.json()
        if (res?.data?.id) {
            router.push("/admin/blogs");
        }
    }

    const animatedComponents = makeAnimated();
    const tags = [
        {
            label: 'HTML',
            value: 'HTML',
            name: 'HTML'
        },
        {
            label: 'CSS',
            value: 'CSS',
            name: 'CSS'
        },
        {
            label: 'JAVASCRIPT',
            value: 'JAVASCRIPT',
            name: 'JAVASCRIPT'
        },
        {
            label: 'JAVA',
            value: 'JAVA',
            name: 'JAVA'
        },
        {
            label: 'TYPESCRIPT',
            value: 'TYPESCRIPT',
            name: 'TYPESCRIPT'
        },
    ]

    return (
        <>
            <div>
                <Label htmlFor="title">Blog Title</Label>
                <Input type="text" value={blogForm?.title} placeholder="Title"
                    onChange={(e) => { setBlogForm({ title: e.target.value }) }}
                />
            </div>
            <div>
                <Label htmlFor="description">Description</Label>
                <Input type="text" value={blogForm?.description} placeholder="Description"
                    onChange={(e) => { setBlogForm({ description: e.target.value }) }}
                />
            </div>
            <div className="mt-3 " draggable="false">
                <Label htmlFor="">Content</Label>
                <Editor editorProps={{}}
                    onDebouncedUpdate={updateContent}
                    defaultValue={blogForm?.content}
                    className="border rounded pb-5"
                    disableLocalStorage
                />
            </div>
            <div className="mt-3 " draggable="false">
                <Label htmlFor="">Tags</Label>
                <Select
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    defaultValue={value?.tags.map(tag => ({ label: tag, value: tag, name: tag })) || []}
                    isMulti
                    options={tags.map(tag => ({ label: tag.label, value: tag.value, name: tag.name }))}
                    onChange={(selectedTags) => {
                        const tags = selectedTags.map(tag => tag.value); // Extract values from the array of selected objects
                        setBlogForm({ tags: tags }); // Update tags in the state
                    }}
                    classNamePrefix={"select"}
                    name="tags"
                />
            </div>
            <div className="mt-4 flex float-right gap-3">
                <Button variant={'secondary'} className="border">  Cancel</Button>
                <Button onClick={onSubmit} className=" bg-slate-900 text-white hover:text-sky-400 flex items-center gap-2">
                    {
                        loading ?
                            <ReloadIcon className="animate-spin" /> :
                            <><CheckIcon /> Save</>
                    }
                </Button>
            </div>
        </>
    )
}

