import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {

}

export async function POST(request: Request) {
    const cookieStore = cookies();
    const supabase = createClient();
    const data = await request.json()
    const res = await supabase.from("blogs").insert({
        title: data.title,
        content: data.content
    }).select().single();
    return Response.json(res)
}

export async function PATCH(request: Request) {

}
export async function DELETE(request: Request) {

}