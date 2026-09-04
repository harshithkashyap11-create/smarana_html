// SMARANA Personal Memory Capsule, Voice Memory Diary & Autobiography

function MemoryCapsule() {
    const store = window.smarnaStore;
    const [activeTab, setActiveTab] = React.useState('PHOTOS'); // 'PHOTOS', 'DIARY', 'STORY', 'TOGETHER'
    const [memories, setMemories] = React.useState(store.memories);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const [newTitle, setNewTitle] = React.useState('');
    const [newDesc, setNewDesc] = React.useState('');
    const [newCategory, setNewCategory] = React.useState('Family');

    // Diary recording simulation
    const [isRecording, setIsRecording] = React.useState(false);
    const [recordedText, setRecordedText] = React.useState('');

    React.useEffect(() => {
        const unsub = store.subscribe(() => {
            setMemories([...store.memories]);
        });
        return unsub;
    }, []);

    const handleStartRecording = () => {
        setIsRecording(true);
        window.smarnaAudio.listen(
            (transcript) => {
                setIsRecording(false);
                setRecordedText(transcript);
                window.smarnaAudio.speak("That sounds like a wonderful memory! Would you like me to save this in your diary?");
            },
            () => setIsRecording(false)
        );
    };

    const handleSaveRecordedMemory = () => {
        if (!recordedText) return;
        window.smarnaAudio.playSuccess();
        const newEntry = {
            id: 'm_' + Date.now(),
            title: 'Voice Diary: ' + recordedText.slice(0, 25) + '...',
            category: 'Personal Story',
            date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600',
            description: recordedText,
            people: ['Self'],
            storyText: recordedText
        };
        store.addMemory(newEntry);
        setRecordedText('');
        alert("Saved to your personal Memory Capsule! ❤️");
    };

    const handleAddManualMemory = (e) => {
        e.preventDefault();
        if (!newTitle) return;
        window.smarnaAudio.playSuccess();
        const newEntry = {
            id: 'm_' + Date.now(),
            title: newTitle,
            category: newCategory,
            date: 'Recent Memory',
            image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600',
            description: newDesc,
            people: ['Family'],
            storyText: newDesc
        };
        store.addMemory(newEntry);
        setShowAddModal(false);
        setNewTitle('');
        setNewDesc('');
    };

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 flex items-center justify-between">
        <div>
        <h2 className="text-2xl font-black text-indigo-950">MEMORY CAPSULE ❤️</h2>
        <p className="text-xs font-bold text-amber-800">Preserve Your Lifelong Stories & Moments</p>
        </div>
        <button
        onClick={() => setShowAddModal(true)}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-2xl text-xs shadow-md flex items-center gap-1"
        >
        <span>➕</span>
        <span>Add Photo</span>
        </button>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-gray-200">
        {[
            { id: 'PHOTOS', label: '🖼️ Photos', count: memories.length },
            { id: 'DIARY', label: '🎙️ Voice Diary' },
            { id: 'STORY', label: '📜 Life Story' },
            { id: 'TOGETHER', label: '🤝 Remember' }
        ].map(t => (
            <button
            key={t.id}
            onClick={() => {
                window.smarnaAudio.playClick();
                setActiveTab(t.id);
            }}
            className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition-all ${
                activeTab === t.id
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
            >
            {t.label}
            </button>
        ))}
        </div>

        {/* TAB 1: PHOTO CAPSULE */}
        {activeTab === 'PHOTOS' && (
            <div className="space-y-4">
            {memories.map(m => (
                <div key={m.id} className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 space-y-3">
                <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                {m.category} • {m.date}
                </span>
                <button
                onClick={() => window.smarnaAudio.speak(m.title + ". " + m.storyText)}
                className="text-xs font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
                >
                🔊 Read Story
                </button>
                </div>

                <h3 className="text-xl font-extrabold text-gray-900">{m.title}</h3>

                <div className="rounded-2xl overflow-hidden shadow-sm h-48 border border-gray-100">
                <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
                </div>

                <p className="text-sm text-gray-700 font-medium leading-relaxed bg-amber-50/50 p-3 rounded-2xl border border-amber-100">
                "{m.storyText}"
                </p>

                {m.people && m.people.length > 0 && (
                    <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs font-bold text-gray-500">People:</span>
                    {m.people.map((p, idx) => (
                        <span key={idx} className="text-xs font-bold text-indigo-900 bg-indigo-50 px-2.5 py-0.5 rounded-md">
                        👤 {p}
                        </span>
                    ))}
                    </div>
                )}
                </div>
            ))}
            </div>
        )}

        {/* TAB 2: VOICE MEMORY DIARY */}
        {activeTab === 'DIARY' && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 text-center space-y-5">
            <div className="w-20 h-20 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center text-4xl mx-auto shadow-inner">
            🎙️
            </div>
            <h3 className="text-2xl font-extrabold text-indigo-950">MY MEMORY DIARY</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
            Speak naturally about your day, your childhood memories, or your thoughts. {store.companion.name} will listen gently.
            </p>

            <button
            onClick={handleStartRecording}
            disabled={isRecording}
            className={`w-24 h-24 rounded-full flex items-center justify-center text-4xl shadow-xl mx-auto transition-all ${
                isRecording
                ? 'bg-red-500 text-white animate-ping'
                : 'bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:scale-105'
            }`}
            >
            🎙️
            </button>
            <p className="text-xs font-bold text-gray-500">
            {isRecording ? 'Listening to your story...' : 'Tap Mic to Record Story'}
            </p>

            {recordedText && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-left space-y-3">
                <span className="text-xs font-bold uppercase text-amber-800">Recorded Transcript</span>
                <p className="text-sm font-semibold text-gray-800">"{recordedText}"</p>
                <button
                onClick={handleSaveRecordedMemory}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-xl text-sm shadow"
                >
                Save This Memory Capsule Entry 💾
                </button>
                </div>
            )}
            </div>
        )}

        {/* TAB 3: MY LIFE STORY */}
        {activeTab === 'STORY' && (
            <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 text-center">
            <h3 className="text-xl font-extrabold text-indigo-950">MY LIFE STORY 📜</h3>
            <p className="text-xs text-gray-600 mt-0.5">Your private digital autobiography timeline</p>
            </div>

            {MOCK_LIFE_STORY.map((item, idx) => (
                <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-amber-100 flex items-start gap-4">
                <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white font-black flex items-center justify-center text-sm shadow">
                {idx + 1}
                </div>
                <div className="flex-1">
                <h4 className="font-extrabold text-base text-gray-900">{item.era}</h4>
                <p className="text-sm text-gray-700 font-medium mt-1 leading-relaxed">{item.highlight}</p>
                </div>
                </div>
            ))}
            </div>
        )}

        {/* TAB 4: REMEMBER TOGETHER */}
        {activeTab === 'TOGETHER' && (
            <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 text-center space-y-4">
            <span className="text-5xl">🤝</span>
            <h3 className="text-2xl font-extrabold text-indigo-950">LET'S REMEMBER TOGETHER</h3>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
            {store.companion.name} asks gentle reminiscence questions:
            </p>

            <div className="bg-amber-50 p-5 rounded-3xl border-2 border-amber-300 text-center space-y-2">
            <span className="text-xs font-extrabold text-amber-800 uppercase tracking-wider">Today's Reminiscence Question</span>
            <p className="text-lg font-bold text-indigo-950">
            "Dadu, do you remember your very first bicycle when you went to school in Guntur?"
            </p>
            </div>

            <div className="flex gap-3 pt-2">
            <button
            onClick={() => {
                window.smarnaAudio.speak("Tell me about your first bicycle!");
                setActiveTab('DIARY');
            }}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-2xl text-sm shadow-md"
            >
            🗣️ Share Story
            </button>
            <button
            onClick={() => alert("Topic changed! Ask your companion next time.")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-2xl text-sm"
            >
            Change Topic ➔
            </button>
            </div>
            </div>
        )}

        {/* ADD MEMORY MODAL */}
        {showAddModal && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative space-y-4">
            <button
            onClick={() => setShowAddModal(false)}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600"
            >
            ✕
            </button>
            <h3 className="text-2xl font-extrabold text-indigo-950 text-center">Add New Memory</h3>

            <form onSubmit={handleAddManualMemory} className="space-y-3">
            <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Memory Title</label>
            <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Festival Celebration 1990"
            className="w-full p-3 border-2 border-gray-300 rounded-xl font-semibold outline-none focus:border-amber-500"
            required
            />
            </div>

            <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
            <select
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-xl font-semibold outline-none focus:border-amber-500"
            >
            <option value="Family">Family</option>
            <option value="Travel">Travel</option>
            <option value="Career">Career</option>
            <option value="Childhood">Childhood</option>
            </select>
            </div>

            <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Story / Description</label>
            <textarea
            rows={3}
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="What made this memory special?"
            className="w-full p-3 border-2 border-gray-300 rounded-xl font-medium outline-none focus:border-amber-500"
            />
            </div>

            <button
            type="submit"
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-2xl text-base shadow-md"
            >
            Save Memory Capsule 💾
            </button>
            </form>
            </div>
            </div>
        )}
        </div>
    );
}

window.MemoryCapsule = MemoryCapsule;
