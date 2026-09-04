// SMARANA Family Time & Memory Quests Component

function FamilyTime() {
    const [messages, setMessages] = React.useState(MOCK_FAMILY_MESSAGES);
    const [quests, setQuests] = React.useState(MOCK_MEMORY_QUESTS);
    const [playingId, setPlayingId] = React.useState(null);

    const handlePlayVoice = (msg) => {
        window.smarnaAudio.playClick();
        setPlayingId(msg.id);
        window.smarnaAudio.speak(
            `Voice message from ${msg.sender}. ${msg.message}`,
            'en-IN',
            1.0,
            1.1,
            null,
            () => setPlayingId(null)
        );
    };

    const handleAnswerQuest = (quest) => {
        window.smarnaAudio.playSuccess();
        const earned = window.smarnaStore.completeJourneyActivity('j5');
        alert(`🎉 Answered Memory Quest from ${quest.askedBy}! Earned +${earned || 30} Mind Points!`);
        setQuests(prev => prev.map(q => q.id === quest.id ? { ...q, status: 'Completed' } : q));
    };

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 flex items-center justify-between">
        <div>
        <h2 className="text-2xl font-black text-indigo-950">FAMILY TIME 👨‍👩‍👧</h2>
        <p className="text-xs font-bold text-amber-800">Messages & Quests from Your Loved Ones</p>
        </div>
        <div className="bg-rose-100 text-rose-800 px-3 py-1.5 rounded-2xl font-extrabold text-xs border border-rose-300">
        2 New Messages
        </div>
        </div>

        {/* FAMILY VOICE & PHOTO MESSAGES */}
        <div className="space-y-4">
        <h3 className="text-lg font-black text-gray-900">FAMILY MESSAGES</h3>
        {messages.map(msg => (
            <div key={msg.id} className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 space-y-3">
            <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center text-2xl shadow-inner">
            {msg.avatar}
            </div>
            <div>
            <h4 className="font-extrabold text-base text-gray-900">{msg.sender}</h4>
            <p className="text-xs text-gray-500 font-semibold">{msg.time}</p>
            </div>
            </div>
            <span className="text-xs font-bold uppercase bg-amber-50 text-amber-900 px-2.5 py-1 rounded-full border border-amber-200">
            {msg.type}
            </span>
            </div>

            <p className="text-sm font-semibold text-gray-800 bg-gray-50 p-3 rounded-2xl border border-gray-200">
            "{msg.message}"
            </p>

            {msg.image && (
                <div className="h-44 rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <img src={msg.image} alt="Family upload" className="w-full h-full object-cover" />
                </div>
            )}

            {msg.type === 'voice' && (
                <button
                onClick={() => handlePlayVoice(msg)}
                className={`w-full py-3 px-4 rounded-2xl font-bold text-sm shadow flex items-center justify-center gap-2 transition-all ${
                    playingId === msg.id
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-indigo-900 hover:bg-indigo-950 text-white'
                }`}
                >
                <span>{playingId === msg.id ? '🔊 Playing Voice Note...' : '▶️ Listen to Voice Message (' + msg.audioDuration + ')'}</span>
                </button>
            )}
            </div>
        ))}
        </div>

        {/* MEMORY QUESTS */}
        <div className="space-y-4">
        <h3 className="text-lg font-black text-gray-900">FAMILY MEMORY QUESTS</h3>
        {quests.map(q => (
            <div key={q.id} className="bg-white rounded-3xl p-5 shadow-md border-2 border-purple-200 space-y-3">
            <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-900 bg-purple-100 px-3 py-1 rounded-full border border-purple-300">
            Question from {q.askedBy}
            </span>
            <span className="text-xs font-bold text-green-700 bg-green-50 px-2.5 py-0.5 rounded-md border border-green-200">
            +{q.rewardPoints} Mind Points
            </span>
            </div>

            <p className="text-base font-bold text-gray-900">
            "{q.question}"
            </p>

            {q.status === 'Completed' ? (
                <div className="text-xs font-bold text-green-700 bg-green-50 p-2.5 rounded-xl border border-green-200 text-center">
                ✓ Quest Completed & Shared with Family!
                </div>
            ) : (
                <button
                onClick={() => handleAnswerQuest(q)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-2xl text-sm shadow-md"
                >
                🎙️ Record Answer for {q.askedBy} ➔
                </button>
            )}
            </div>
        ))}
        </div>
        </div>
    );
}

window.FamilyTime = FamilyTime;
