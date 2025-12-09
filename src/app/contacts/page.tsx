'use client';

import { useState } from 'react';
import { Search, Mail, ArrowLeft, Copy, Check } from 'lucide-react';
import Link from 'next/link';

interface Contact {
    name: string;
    email: string;
}

const contacts: Contact[] = [
    { name: 'Andrew Huizen', email: 'Andrew.Huizen1@gcu.edu' },
    { name: 'Brady Newton', email: 'brady.newton@gcu.edu' },
    { name: 'Bradley Robertson', email: 'Bradley.Robertson@gcu.edu' },
    { name: 'Brooke Sinnott', email: 'Brooke.Sinnott1@gcu.edu' },
    { name: 'Creighton Bernard', email: 'Creighton.Bernard@gcu.edu' },
    { name: 'Dominic Bejar', email: 'Dominic.Bejar@gcu.edu' },
    { name: 'Elijah Migchelbrink', email: 'Eli.Migchelbrink@gcu.edu' },
    { name: 'Ella Stuewer', email: 'Ella.Stuewer@gcu.edu' },
    { name: 'Ethan Nyffeler', email: 'ethan.nyffeler@gcu.edu' },
    { name: 'Hailey Rodgers', email: 'Hailey.Rodgers@gcu.edu' },
    { name: 'Harley Hawk', email: 'Harley.Hawk@gcu.edu' },
    { name: 'Haylie Rehberger', email: 'Haylie.Rehberger@gcu.edu' },
    { name: 'Jack Edlin', email: 'Jack.Edlin@gcu.edu' },
    { name: 'Jack Gilday', email: 'Jack.Gilday@gcu.edu' },
    { name: 'Jacob Gamez', email: 'jacob.gamez1@gcu.edu' },
    { name: 'Jacob Wasylenko', email: 'Jacob.Wasylenko@gcu.edu' },
    { name: 'Jaron Castellanos', email: 'Jaron.Castellanos@gcu.edu' },
    { name: 'Jesse Traut', email: 'Jesse.Traut@gcu.edu' },
    { name: 'Joe Canyon', email: 'joe.canyon49@gmail.com' },
    { name: 'Kaitlyn Batteen', email: 'Kaitlyn.Batteen@gcu.edu' },
    { name: 'Konnor Bennett', email: 'Konnor.Bennett@gcu.edu' },
    { name: 'Matthew Kerin', email: 'Matthew.Kerin@gcu.edu' },
    { name: 'Maysen Chelin', email: 'Maysen.Chelin@gcu.edu' },
    { name: 'Michael Zamora', email: 'Michael.Zamora@gcu.edu' },
    { name: 'Montan Copenhaver', email: 'Montan.Copenhaver@gcu.edu' },
    { name: 'Noah Wolfe', email: 'Noah.Wolfe3@gcu.edu' },
    { name: 'Raissa Harrell', email: 'Raissa.Harrell@gcu.edu' },
    { name: 'Riley Kollbaum', email: 'Riley.Kollbaum@gcu.edu' },
    { name: 'Rylen Given', email: 'Rylen.Given@gcu.edu' },
    { name: 'Shaneille Ramos', email: 'shaneille.ramos@gcu.edu' },
    { name: 'Steven Owens', email: 'Steven.Owens1@gcu.edu' },
    { name: 'Tyler Berger', email: 'Tyler.Berger@gcu.edu' },
    { name: 'Zayier Yusuyin', email: 'Zayier.Yusuyin@gcu.edu' },
].sort((a, b) => a.name.localeCompare(b.name));

export default function ContactsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

    const filteredContacts = contacts.filter((contact) =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const copyToClipboard = (email: string) => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(email);
        setTimeout(() => setCopiedEmail(null), 2000);
    };

    return (
        <div className="space-y-8 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-white">Contacts</h1>
                        <p className="text-gray-400">Directory of team members and contacts.</p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-96">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search names or emails..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-card border border-card-border rounded-xl py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-gcu-purple/50 focus:ring-1 focus:ring-gcu-purple/50 transition-all"
                    />
                </div>
            </div>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredContacts.length > 0 ? (
                    filteredContacts.map((contact) => (
                        <div
                            key={contact.email}
                            className="bg-card border border-card-border rounded-xl p-5 hover:border-gcu-purple/30 transition-all duration-200 group relative"
                        >
                            <div className="flex items-start justify-between mb-2">
                                <div className="p-2 bg-gcu-purple/10 rounded-lg text-gcu-purple-light group-hover:scale-105 transition-transform">
                                    <div className="font-bold text-sm w-5 h-5 flex items-center justify-center">
                                        {contact.name.charAt(0)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(contact.email)}
                                    className="text-gray-500 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/5"
                                    title="Copy Email"
                                >
                                    {copiedEmail === contact.email ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
                                </button>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-1">{contact.name}</h3>
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-sm text-gray-400 hover:text-gcu-purple-light transition-colors flex items-center gap-1.5 truncate"
                            >
                                <Mail size={12} />
                                {contact.email}
                            </a>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        <p className="text-lg mb-2">No contacts found</p>
                        <p className="text-sm">Try adjusting your search terms</p>
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-500 text-center mt-8">
                {filteredContacts.length} {filteredContacts.length === 1 ? 'contact' : 'contacts'} found
            </div>
        </div>
    );
}
