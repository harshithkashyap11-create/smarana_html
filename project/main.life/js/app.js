// SMARANA Main Application Component

function App() {
    const store = window.smarnaStore;
    const [role, setRole] = React.useState(store.role || 'LANDING'); // 'LANDING', 'ELDER', 'DOCTOR'
    const [elderTab, setElderTab] = React.useState('HOME'); // 'HOME', 'PLAY', 'MEMORIES', 'FAMILY', 'PROFILE'
    const [showCreator, setShowCreator] = React.useState(false);
    const [showEmergency, setShowEmergency] = React.useState(false);
    const [access, setAccess] = React.useState(store.accessibility);

    React.useEffect(() => {
        const unsub = store.subscribe(() => {
            setAccess({ ...store.accessibility });
        });
        return unsub;
    }, []);

    const handleSwitchRole = (newRole) => {
        window.smarnaAudio.playClick();
        store.setRole(newRole);
        setRole(newRole);
    };

    return (
        <div className={`min-h-screen ${access.highContrast ? 'bg-black text-yellow-300 font-bold' : 'bg-amber-50/40 text-gray-900'}`}>
        {/* NAVBAR HEADER */}
        {role !== 'LANDING' && (
            <window.Navbar
            currentRole={role}
            onSwitchRole={handleSwitchRole}
            onOpenEmergency={() => setShowEmergency(true)}
            />
        )}

        {/* VIEWPORT ROUTER */}
        {role === 'LANDING' && (
            <window.AuthGateway onSelectRole={handleSwitchRole} />
        )}

        {role === 'ELDER' && (
            <main className="w-full">
            {elderTab === 'HOME' && (
                <window.ElderHome
                onNavigateTab={setElderTab}
                onOpenCompanionCreator={() => setShowCreator(true)}
                />
            )}

            {elderTab === 'PLAY' && (
                <window.GamesHub onCompleteGame={() => setElderTab('HOME')} />
            )}

            {elderTab === 'MEMORIES' && (
                <window.MemoryCapsule />
            )}

            {elderTab === 'FAMILY' && (
                <window.FamilyTime />
            )}

            {elderTab === 'PROFILE' && (
                <window.AccessibilitySettings
                onOpenCompanionCreator={() => setShowCreator(true)}
                onOpenEmergency={() => setShowEmergency(true)}
                />
            )}

            {/* ELDER BOTTOM NAV */}
            <window.BottomNav activeTab={elderTab} onSelectTab={setElderTab} />
            </main>
        )}

        {role === 'DOCTOR' && (
            <window.DoctorDashboard />
        )}

        {/* MODALS */}
        {showCreator && (
            <window.CompanionCreator
            onClose={() => setShowCreator(false)}
            onComplete={() => {
                setShowCreator(false);
                if (role === 'ELDER') setElderTab('HOME');
            }}
            />
        )}

        {showEmergency && (
            <window.EmergencyModal onClose={() => setShowEmergency(false)} />
        )}
        </div>
    );
}

// Render App
const rootEl = document.getElementById('root');
if (rootEl) {
    const root = ReactDOM.createRoot(rootEl);
    root.render(<App />);
}
