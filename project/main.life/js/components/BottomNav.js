// SMARANA Elder Bottom Navigation Component

function BottomNav({ activeTab, onSelectTab }) {
    const tabs = [
        { id: 'HOME', label: 'HOME', icon: '🏠' },
        { id: 'PLAY', label: 'PLAY', icon: '🧠' },
        { id: 'MEMORIES', label: 'MEMORIES', icon: '❤️' },
        { id: 'FAMILY', label: 'FAMILY', icon: '👨‍👩‍👧' },
        { id: 'PROFILE', label: 'PROFILE', icon: '👤' }
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-amber-200 z-40 px-2 py-2 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-around">
        {tabs.map(t => {
            const isActive = activeTab === t.id;
            return (
                <button
                key={t.id}
                onClick={() => {
                    window.smarnaAudio.playClick();
                    onSelectTab(t.id);
                }}
                className={`flex flex-col items-center justify-center w-16 py-1.5 rounded-2xl transition-all ${
                    isActive
                    ? 'bg-amber-100 text-amber-950 scale-110 font-extrabold shadow-sm border border-amber-300'
                    : 'text-gray-500 hover:text-gray-900 font-semibold'
                }`}
                >
                <span className="text-2xl leading-none mb-1">{t.icon}</span>
                <span className="text-[10px] tracking-wider">{t.label}</span>
                </button>
            );
        })}
        </div>
        </nav>
    );
}

window.BottomNav = BottomNav;
