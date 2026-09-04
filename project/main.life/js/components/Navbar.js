// SMARANA Navbar & Global Header Component

function Navbar({ currentRole, onSwitchRole, onOpenEmergency }) {
    const store = window.smarnaStore;
    const [access, setAccess] = React.useState(store.accessibility);

    const toggleContrast = () => {
        const next = !access.highContrast;
        setAccess(prev => ({ ...prev, highContrast: next }));
        store.updateAccessibility({ highContrast: next });
        window.smarnaAudio.playClick();
    };

    return (
        <header className="bg-white/90 backdrop-blur-md border-b border-amber-100 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Logo & Brand */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onSwitchRole('LANDING')}>
        <span className="text-2xl">🌸</span>
        <div>
        <h1 className="text-xl font-extrabold tracking-tight text-indigo-950 flex items-center gap-2">
        SMARANA
        <span className="text-[10px] font-bold uppercase tracking-widest bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-200">
        {currentRole} PORTAL
        </span>
        </h1>
        <p className="text-[11px] font-semibold text-gray-500 hidden sm:block">Remember. Learn. Connect.</p>
        </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
        {/* High Contrast Toggle */}
        <button
        onClick={toggleContrast}
        title="Toggle High Contrast Mode"
        className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${
            access.highContrast
            ? 'bg-black text-yellow-300 border-black shadow-md'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
        }`}
        >
        <span>👁️</span>
        <span className="hidden md:inline">Contrast</span>
        </button>

        {/* Quick Role Switcher for Hackathon Demo */}
        <div className="bg-gray-100 p-1 rounded-xl flex items-center gap-1 border border-gray-200">
        <button
        onClick={() => onSwitchRole('ELDER')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            currentRole === 'ELDER'
            ? 'bg-amber-500 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        >
        <span>👵</span>
        <span className="hidden sm:inline">Elder</span>
        </button>
        <button
        onClick={() => onSwitchRole('DOCTOR')}
        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
            currentRole === 'DOCTOR'
            ? 'bg-indigo-900 text-white shadow-sm'
            : 'text-gray-600 hover:text-gray-900'
        }`}
        >
        <span>🩺</span>
        <span className="hidden sm:inline">Doctor</span>
        </button>
        </div>

        {/* Emergency Help Button */}
        {currentRole === 'ELDER' && (
            <button
            onClick={() => {
                window.smarnaAudio.playClick();
                onOpenEmergency();
            }}
            className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-extrabold text-xs sm:text-sm px-3.5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-1.5 animate-pulse"
            >
            <span className="text-base">🆘</span>
            <span>I NEED HELP</span>
            </button>
        )}
        </div>
        </div>
        </header>
    );
}

window.Navbar = Navbar;
