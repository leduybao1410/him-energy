import { serverImagesRoute } from "@/constants/server-route/server-images-route";
import { setAuthorizationHeader } from "@/lib/api/apiFetch";
import { NextResponse } from "next/server";

type Params = Promise<{ id: string }>;

export async function DELETE(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;
        if (!id) {
            return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
        }
        const response = await fetch(serverImagesRoute.delete.url(id), {
            method: serverImagesRoute.delete.method,
            headers: setAuthorizationHeader(request)
        });
        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to delete image' },
                { status: response.status }
            );
        }
        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
