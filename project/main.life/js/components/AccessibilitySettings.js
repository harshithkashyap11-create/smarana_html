// SMARANA Elder Profile & Accessibility Settings Component

function AccessibilitySettings({ onOpenCompanionCreator, onOpenEmergency }) {
    const store = window.smarnaStore;
    const [access, setAccess] = React.useState(store.accessibility);
    const [patient, setPatient] = React.useState(store.patient);
    const [companion, setCompanion] = React.useState(store.companion);
    const [consents, setConsents] = React.useState(MOCK_CONSENT_MATRIX);

    const toggleSetting = (key) => {
        window.smarnaAudio.playClick();
        const nextVal = !access[key];
        const updated = { ...access, [key]: nextVal };
        setAccess(updated);
        store.updateAccessibility(updated);
    };

    const toggleConsent = (idx) => {
        window.smarnaAudio.playClick();
        const nextConsents = [...consents];
        nextConsents[idx].granted = !nextConsents[idx].granted;
        setConsents(nextConsents);
    };

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 text-center space-y-3">
        <div className="w-24 h-24 rounded-full border-4 border-amber-300 mx-auto overflow-hidden shadow-lg">
        <img src={patient.avatarUrl} alt={patient.name} className="w-full h-full object-cover" />
        </div>
        <div>
        <h2 className="text-2xl font-black text-indigo-950">{patient.name}</h2>
        <p className="text-xs font-bold text-amber-800">
        Age {patient.age} • Preferred Language: {patient.preferredLanguage}
        </p>
        </div>

        <div className="flex justify-center gap-3 pt-2">
        <button
        onClick={onOpenCompanionCreator}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow"
        >
        ✨ Custom Companion ({companion.name})
        </button>
        <button
        onClick={onOpenEmergency}
        className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2.5 rounded-2xl text-xs shadow"
        >
        🆘 Emergency Setup
        </button>
        </div>
        </div>

        {/* ACCESSIBILITY MODES */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 space-y-4">
        <h3 className="text-lg font-black text-gray-900">ACCESSIBILITY & DISPLAY SETTINGS</h3>

        <div className="space-y-3">
        {[
            { key: 'easyMode', title: '💡 Easy Mode', desc: 'Simplified layout with minimal clutter' },
            { key: 'largeText', title: '🔤 Large Text Mode', desc: 'Extra large font sizes for easy reading' },
            { key: 'highContrast', title: '👁️ High Contrast Mode', desc: 'High visibility colors & sharp borders' },
            { key: 'voiceFirst', title: '🗣️ Voice-First Mode', desc: 'Automatically read screens and companion speech aloud' }
        ].map(item => (
            <div key={item.key} className="flex items-center justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-200">
            <div>
            <div className="font-extrabold text-sm text-gray-900">{item.title}</div>
            <div className="text-xs text-gray-500 font-medium">{item.desc}</div>
            </div>
            <button
            onClick={() => toggleSetting(item.key)}
            className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 ${
                access[item.key] ? 'bg-green-600' : 'bg-gray-300'
            }`}
            >
            <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                access[item.key] ? 'translate-x-6' : 'translate-x-0'
            }`} />
            </button>
            </div>
        ))}
        </div>
        </div>

        {/* PRIVACY & CONSENT MATRIX */}
        <div className="bg-white rounded-3xl p-6 shadow-md border border-amber-100 space-y-4">
        <h3 className="text-lg font-black text-gray-900">PRIVACY & PERMISSIONS MATRIX</h3>
        <p className="text-xs text-gray-600">You remain in full control of who can view or upload your memories.</p>

        <div className="space-y-3">
        {consents.map((c, idx) => (
            <div key={idx} className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-200 flex items-center justify-between gap-3">
            <div>
            <div className="font-extrabold text-sm text-gray-900">{c.feature}</div>
            <div className="text-xs text-gray-600 font-medium mt-0.5">{c.description}</div>
            </div>
            <button
            onClick={() => toggleConsent(idx)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs shadow-sm ${
                c.granted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
            >
            {c.granted ? 'Granted ✓' : 'Revoked'}
            </button>
            </div>
        ))}
        </div>
        </div>
        </div>
    );
}

window.AccessibilitySettings = AccessibilitySettings;
