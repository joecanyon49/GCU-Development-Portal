'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, Plus, Trash2, Mail } from 'lucide-react';

export default function EmailBuilder() {
    const [formData, setFormData] = useState({
        recipientName: '',
        subjectName: '',
        meetingName: '',
        dateTime: '',
        purpose: '',
        outcomes: '',
        questions: '',
        emphasize: '',
        avoid: ''
    });

    const [attendees, setAttendees] = useState([{ name: '', role: '' }]);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAttendeeChange = (index: number, field: 'name' | 'role', value: string) => {
        const newAttendees = [...attendees];
        newAttendees[index][field] = value;
        setAttendees(newAttendees);
    };

    const addAttendee = () => {
        setAttendees([...attendees, { name: '', role: '' }]);
    };

    const removeAttendee = (index: number) => {
        setAttendees(attendees.filter((_, i) => i !== index));
    };

    const generateEmail = () => {
        const attendeesList = attendees
            .filter(a => a.name && a.role)
            .map(a => `• ${a.name}: ${a.role}`)
            .join('\n');

        return `Hi ${formData.recipientName || '[Recipient Name]'},

In preparation for our meeting with ${formData.subjectName || '[Company/Individual]'} coming up soon, I prepared an overview for our discussion. Hope this is helpful in outlining the anticipated conversation and the roles we can play in it:

Development Meeting Brief: ${formData.meetingName || '[Meeting Name]'}

Meeting Date & Time:
${formData.dateTime || '[Date & Time]'}

Meeting Purpose:
${formData.purpose || '[Purpose]'}

Desired Outcomes:
The meeting is a success if we walk away with...
${formData.outcomes || '[Outcomes]'}

Attendees & Their Roles in the Meeting:
State very clearly what we need each person to do in the meeting for it to be a success.
${attendeesList || '• [Name]: [Role]'}

Key Questions to Ask:
${formData.questions || '[Questions]'}

Areas to Emphasize:
${formData.emphasize || '[Areas to Emphasize]'}

Topics to Avoid:
${formData.avoid || '[Topics to Avoid]'}`;
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generateEmail());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen pb-20">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link href="/tools" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white">Meeting Brief Builder</h1>
                    <p className="text-gray-400">Generate a structured pre-meeting email.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="space-y-6">
                    <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">Meeting Details</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Recipient Name</label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    value={formData.recipientName}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                    placeholder="e.g. Noah"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1">Subject (Company/Person)</label>
                                <input
                                    type="text"
                                    name="subjectName"
                                    value={formData.subjectName}
                                    onChange={handleInputChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                    placeholder="e.g. Grand Canyon Education"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Meeting Name</label>
                            <input
                                type="text"
                                name="meetingName"
                                value={formData.meetingName}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                placeholder="e.g. Initial Partnership Discussion"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Date & Time</label>
                            <input
                                type="text"
                                name="dateTime"
                                value={formData.dateTime}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                placeholder="e.g. Monday, Oct 24th @ 2pm"
                            />
                        </div>
                    </div>

                    <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">Strategy</h2>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Meeting Purpose</label>
                            <textarea
                                name="purpose"
                                value={formData.purpose}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple h-24"
                                placeholder="Detailed overview of why the meeting was scheduled."
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Desired Outcomes</label>
                            <textarea
                                name="outcomes"
                                value={formData.outcomes}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple h-24"
                                placeholder="The meeting is a success if we walk away with..."
                            />
                        </div>
                    </div>

                    <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">Attendees</h2>
                            <button onClick={addAttendee} className="text-sm text-gcu-purple-light hover:text-white flex items-center gap-1">
                                <Plus size={16} /> Add Person
                            </button>
                        </div>

                        {attendees.map((attendee, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={attendee.name}
                                    onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                    placeholder="Name"
                                />
                                <input
                                    type="text"
                                    value={attendee.role}
                                    onChange={(e) => handleAttendeeChange(index, 'role', e.target.value)}
                                    className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple"
                                    placeholder="Role"
                                />
                                {attendees.length > 1 && (
                                    <button onClick={() => removeAttendee(index)} className="p-2 text-red-400 hover:text-red-300">
                                        <Trash2 size={18} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="bg-card border border-card-border rounded-2xl p-6 space-y-4">
                        <h2 className="text-xl font-bold text-white mb-4">Talking Points</h2>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Key Questions to Ask</label>
                            <textarea
                                name="questions"
                                value={formData.questions}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple h-24"
                                placeholder="What information do we need from them?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Areas to Emphasize</label>
                            <textarea
                                name="emphasize"
                                value={formData.emphasize}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple h-24"
                                placeholder="What aspects should we highlight?"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-400 mb-1">Topics to Avoid</label>
                            <textarea
                                name="avoid"
                                value={formData.avoid}
                                onChange={handleInputChange}
                                className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gcu-purple h-24"
                                placeholder="Things we should not bring up."
                            />
                        </div>
                    </div>
                </div>

                {/* Preview Section */}
                <div className="lg:sticky lg:top-8 h-fit">
                    <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-2xl">
                        <div className="bg-black/40 p-4 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-gray-400">
                                <Mail size={18} />
                                <span className="text-sm font-medium">Email Preview</span>
                            </div>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gcu-purple hover:bg-gcu-purple-light text-white text-sm font-medium transition-colors"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? 'Copied!' : 'Copy Text'}
                            </button>
                        </div>
                        <div className="p-6 bg-[#1a1a1a]">
                            <pre className="whitespace-pre-wrap font-sans text-gray-300 text-sm leading-relaxed">
                                {generateEmail()}
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
