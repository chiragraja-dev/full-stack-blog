import { createClient } from "@/utils/supabase/server";
import { Description } from "@radix-ui/react-toast";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    let response;
    const cookieStore = cookies();
    const supabase = createClient();
    const { searchParams } = new URL(request?.url)
    const id = searchParams.get('id')
    if (id) {
        response = await supabase.from("blogs").select().eq('id', id).single();
    }
    else {
        response = await supabase.from("blogs").select().limit(20);
    }
    return Response.json(response)
}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient();
    const data = await request.json()
    const res = await supabase.from("blogs").insert(data).select().single();
    return Response.json(res)
}

export async function PATCH(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient();
    const data = await request.json()
    const { searchParams } = new URL(request?.url)
    const id = searchParams.get('id')
    const res = await supabase.from("blogs").update(data).eq("id", id).select().single();
    return Response.json(res)
}
export async function DELETE(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient();
    const data = await request.json();
    const response = await supabase.from("blogs").delete().eq('id', data.id)
    return Response.json(response)
}