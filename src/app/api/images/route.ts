import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
    const imagesDirectory = path.join(process.cwd(), 'public/assets/proposal');

    try {
        const filenames = fs.readdirSync(imagesDirectory);

        const images = filenames.filter(file => {
            return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(file);
        }).map(file => ({
            name: file,
            path: `/assets/proposal/${file}`
        }));

        return NextResponse.json({ images });
    } catch (error) {
        console.error("Error reading image directory:", error);
        return NextResponse.json({ error: "Failed to list images" }, { status: 500 });
    }
}
