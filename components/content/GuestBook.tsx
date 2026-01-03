import React, { useState, useEffect } from 'react';
import { Send, StickyNote, User, Database, Cloud, Loader2, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Note {
    name: string;
    message: string;
    date: string;
    category?: string;
}

const LOCAL_STORAGE_KEY = 'prathos_guestbook_notes';
const FORMSPREE_ID = "xwpngayz";

const Guestbook: React.FC = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);
    const [isSyncing, setIsSyncing] = useState(false);

    // Load local history
    useEffect(() => {
        const savedNotes = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                setNotes([]);
            }
        }
    }, []);

    const categorizeFeedback = async (text: string) => {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-flash-preview',
                contents: `Analyze this portfolio feedback: "${text}". Categorize it into one word: BUG, FEATURE, COMPLIMENT, or OTHER. Respond ONLY with the category word.`,
            });
            return response.text?.trim() || 'OTHER';
        } catch (e) {
            return 'OTHER';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim() || isSyncing) return;

        setIsSyncing(true);

        // 1. AI Categorization
        const category = await categorizeFeedback(message);

        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        const newNote: Note = {
            name: name.trim(),
            message: message.trim(),
            date: formattedDate,
            category
        };

        try {
            // 2. Remote Storage (Formspree)
            // This sends the data to the owner's email/dashboard
            await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: newNote.name,
                    message: newNote.message,
                    category: newNote.category,
                    date: newNote.date,
                    _subject: `New Portfolio Feedback: ${category}`
                })
            });

            // 3. Update local state
            const updatedNotes = [newNote, ...notes];
            setNotes(updatedNotes);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedNotes));

            setName('');
            setMessage('');

            window.dispatchEvent(new CustomEvent('show-toast', {
                detail: { message: 'Feedback relayed to Prathamesh!', type: 'success' }
            }));
        } catch (err) {
            window.dispatchEvent(new CustomEvent('show-toast', {
                detail: { message: 'Relay failed, saved locally only.', type: 'error' }
            }));
        } finally {
            setIsSyncing(false);
        }
    };

    return (
        <div className="h-full flex flex-col bg-[#FFFCF0]">
            <div className="p-4 border-b-2 border-black/10 shrink-0">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-heading font-black text-lg mb-1 flex items-center gap-2">
                            <StickyNote size={20} /> Suggestion Box
                        </h3>
                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                            Relayed directly to my Dashboard
                        </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center gap-1.5 bg-black text-[#CCFF00] px-2 py-1 rounded-md shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <Cloud size={10} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Cloud Sync</span>
                        </div>
                        {isSyncing && (
                            <div className="flex items-center gap-1 text-[9px] font-bold text-blue-500 animate-pulse">
                                <Loader2 size={10} className="animate-spin" /> RELAYING...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white border-[3px] border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3 relative overflow-hidden">
                    {isSyncing && <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-20 flex items-center justify-center font-heading font-black text-sm">ENCRYPTING & SENDING...</div>}

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Anonymous"
                            className="w-full bg-gray-50 border-2 border-black rounded-lg px-3 py-2 font-bold text-sm outline-none focus:bg-white transition-colors"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Suggestion / Review</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell me what to build next..."
                            className="w-full bg-gray-50 border-2 border-black rounded-lg px-3 py-2 font-bold text-sm outline-none focus:bg-white transition-colors min-h-[80px] resize-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSyncing}
                        className="w-full bg-black text-white font-heading font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#CCFF00] hover:text-black border-2 border-black transition-all active:translate-y-1 active:shadow-none disabled:opacity-50"
                    >
                        {isSyncing ? 'Processing...' : 'Send Note'} <Send size={16} />
                    </button>
                </form>

                {/* Feed */}
                <div className="flex flex-col gap-3 mt-2 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-[2px] flex-1 bg-black/5"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">History</span>
                        <div className="h-[2px] flex-1 bg-black/5"></div>
                    </div>

                    {notes.map((note, i) => (
                        <div key={`${note.date}-${i}`} className="bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-heading font-black text-sm flex items-center gap-1.5">
                                    <User size={12} className="text-gray-400" /> {note.name}
                                    {note.category && (
                                        <span className="text-[8px] px-1.5 py-0.5 rounded bg-gray-100 border border-black/5 flex items-center gap-1">
                                            <Sparkles size={8} className="text-yellow-500" /> {note.category}
                                        </span>
                                    )}
                                </span>
                                <span className="text-[9px] font-bold text-gray-400 uppercase">{note.date}</span>
                            </div>
                            <p className="text-sm font-medium text-gray-700 leading-snug">{note.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Guestbook;