import React, { useState } from 'react';
import { Send, StickyNote, Star, User } from 'lucide-react';

interface Note {
    name: string;
    message: string;
    date: string;
}

const Guestbook: React.FC = () => {
    const [name, setName] = useState('');
    const [message, setMessage] = useState('');
    const [notes, setNotes] = useState<Note[]>([

    ]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !message.trim()) return;

        const newNote = {
            name,
            message,
            date: 'Just now'
        };

        setNotes([newNote, ...notes]);
        setName('');
        setMessage('');

        window.dispatchEvent(new CustomEvent('show-toast', {
            detail: { message: 'Thanks for the feedback!', type: 'success' }
        }));
    };

    return (
        <div className="h-full flex flex-col bg-[#FFFCF0]">
            <div className="p-4 border-b-2 border-black/10 shrink-0">
                <h3 className="font-heading font-black text-lg mb-1 flex items-center gap-2">
                    <StickyNote size={20} /> Suggestion Box
                </h3>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Help me improve this space!
                </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 flex flex-col gap-4">
                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white border-[3px] border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Your Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Vecna"
                            className="w-full bg-gray-50 border-2 border-black rounded-lg px-3 py-2 font-bold text-sm outline-none focus:bg-white transition-colors"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Suggestion / Review</label>
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="I think you should add..."
                            className="w-full bg-gray-50 border-2 border-black rounded-lg px-3 py-2 font-bold text-sm outline-none focus:bg-white transition-colors min-h-[80px] resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-black text-white font-heading font-black py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-[#FFD60A] hover:text-black border-2 border-black transition-all active:translate-y-1 active:shadow-none"
                    >
                        Send Note <Send size={16} />
                    </button>
                </form>

                {/* Feed */}
                <div className="flex flex-col gap-3 mt-2 pb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="h-[2px] flex-1 bg-black/5"></div>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Recent Notes</span>
                        <div className="h-[2px] flex-1 bg-black/5"></div>
                    </div>

                    {notes.map((note, i) => (
                        <div key={i} className="bg-white border-2 border-black rounded-xl p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-heading font-black text-sm flex items-center gap-1.5">
                                    <User size={12} className="text-gray-400" /> {note.name}
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