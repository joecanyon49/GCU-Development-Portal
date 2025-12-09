'use server';

import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';
import { redirect } from 'next/navigation';

export async function login(prevState: { error: string } | undefined, formData: FormData) {
    const password = formData.get('password') as string;

    if (!password) {
        return { error: 'Password is required' };
    }

    try {
        // Read the passwords file
        const filePath = path.join(process.cwd(), 'sorted_passwords.txt');
        const fileContent = await fs.readFile(filePath, 'utf-8');

        // Parse the file line by line
        // Format: First Last: Password
        const lines = fileContent.split('\n');
        let foundUser = null;

        for (const line of lines) {
            if (!line.trim()) continue;

            const [namePart, passPart] = line.split(':').map(s => s.trim());

            if (passPart === password) {
                // Extract first name
                const firstName = namePart.split(' ')[0];
                foundUser = { name: firstName, fullName: namePart };
                break;
            }
        }

        if (foundUser) {
            // Set cookie
            const cookieStore = await cookies();
            cookieStore.set('auth_user', foundUser.name, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                path: '/',
            });

            redirect('/');
        } else {
            return { error: 'Invalid password' };
        }
    } catch (error) {
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        console.error('Login error:', error);
        return { error: 'An error occurred during login' };
    }
}

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete('auth_user');
    redirect('/login');
}
