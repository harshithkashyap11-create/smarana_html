// SMARANA Doctor & Caregiver Web Portal Component

function DoctorDashboard() {
    const store = window.smarnaStore;
    const [activeTab, setActiveTab] = React.useState('DASHBOARD'); // 'DASHBOARD', 'PATIENTS', 'ANALYTICS', 'INSIGHTS', 'ROUTINES', 'CONSENT', 'ALERTS'
    const [patients, setPatients] = React.useState(store.patientsList);
    const [selectedPatient, setSelectedPatient] = React.useState(store.patientsList[0]);

    const [routineText, setRoutineText] = React.useState('');

    const handleAssignRoutine = (e) => {
        e.preventDefault();
        if (!routineText) return;
        window.smarnaAudio.playSuccess();
        alert(`✓ New activity routine assigned to ${selectedPatient.name}: "${routineText}"`);
        setRoutineText('');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* PROFESSIONAL SIDEBAR */}
        <aside className="w-full md:w-64 bg-slate-900 text-slate-100 p-5 flex flex-col justify-between shrink-0 border-r border-slate-800">
        <div>
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
        <span className="text-3xl">🩺</span>
        <div>
        <h2 className="font-extrabold text-lg text-white tracking-wide">SMARANA</h2>
        <p className="text-xs text-slate-400 font-semibold">Clinical & Caregiver Portal</p>
        </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1.5 mt-6">
        {[
            { id: 'DASHBOARD', label: 'Dashboard Overview', icon: '📊' },
            { id: 'PATIENTS', label: 'Patient Roster', icon: '👥' },
            { id: 'ANALYTICS', label: 'Engagement Trends', icon: '📈' },
            { id: 'INSIGHTS', label: 'AI Memory Insights', icon: '🧠' },
            { id: 'ROUTINES', label: 'Routine Management', icon: '📅' },
            { id: 'CONSENT', label: 'Consent Matrix', icon: '🔒' },
            { id: 'ALERTS', label: 'Alert Manager', icon: '🔔' }
        ].map(item => (
            <button
            key={item.id}
            onClick={() => {
                window.smarnaAudio.playClick();
                setActiveTab(item.id);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition-all ${
                activeTab === item.id
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
            >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
            </button>
        ))}
        </nav>
        </div>

        {/* Doctor Info */}
        <div className="pt-6 border-t border-slate-800 text-xs text-slate-400">
        <div className="font-bold text-white">Dr. Priya Sharma, MD</div>
        <div>Senior Neuro-Geriatrician</div>
        <div className="mt-2 text-[10px] text-green-400 bg-green-950/60 px-2.5 py-1 rounded-md border border-green-800 inline-block">
        ● Clinical Session Active
        </div>
        </div>
        </aside>

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-6 sm:p-8 space-y-6 overflow-y-auto">
        {/* TOP DASHBOARD METRICS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Patients</span>
        <div className="text-3xl font-black text-slate-900 mt-1">4</div>
        <span className="text-[11px] font-semibold text-emerald-600">● 100% Onboarded</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Today</span>
        <div className="text-3xl font-black text-indigo-900 mt-1">3 / 4</div>
        <span className="text-[11px] font-semibold text-emerald-600">75% Daily Compliance</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Avg Engagement Rate</span>
        <div className="text-3xl font-black text-emerald-700 mt-1">78%</div>
        <span className="text-[11px] font-semibold text-emerald-600">+12% vs last week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 bg-rose-50/30 shadow-sm">
        <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Attention Required</span>
        <div className="text-3xl font-black text-rose-700 mt-1">1</div>
        <span className="text-[11px] font-semibold text-rose-600">Lakshmi Devi (2d Inactive)</span>
        </div>
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW & ANALYTICS CHARTS */}
        {activeTab === 'DASHBOARD' && (
            <div className="space-y-6">
            {/* Dynamic Interactive SVG Chart */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
            <div>
            <h3 className="text-lg font-black text-slate-900">Weekly Engagement Activity Trend</h3>
            <p className="text-xs text-slate-500 font-medium">Daily completed cognitive activities across patients</p>
            </div>
            <span className="text-xs font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Last 7 Days
            </span>
            </div>

            {/* Dynamic SVG Bar Chart */}
            <div className="h-48 w-full flex items-end justify-between gap-4 pt-4 px-4 border-b border-slate-100">
            {[
                { day: 'Mon', count: 18, pct: 60 },
                { day: 'Tue', count: 24, pct: 80 },
                { day: 'Wed', count: 22, pct: 75 },
                { day: 'Thu', count: 28, pct: 95 },
                { day: 'Fri', count: 25, pct: 85 },
                { day: 'Sat', count: 21, pct: 70 },
                { day: 'Sun', count: 30, pct: 100 }
            ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-slate-100 rounded-t-xl h-36 flex items-end p-1 relative">
                <div
                className="w-full bg-indigo-600 group-hover:bg-indigo-700 rounded-t-lg transition-all duration-500"
                style={{ height: `${bar.pct}%` }}
                />
                </div>
                <span className="text-xs font-bold text-slate-600">{bar.day}</span>
                </div>
            ))}
            </div>
            </div>

            {/* PATIENT ROSTER TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900">Assigned Patient Roster</h3>
            <span className="text-xs font-bold text-slate-500">4 Active Patients</span>
            </div>

            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
            <thead>
            <tr className="border-b border-slate-200 text-xs font-bold uppercase text-slate-400 tracking-wider">
            <th className="pb-3">Patient Name</th>
            <th className="pb-3">Age</th>
            <th className="pb-3">Language</th>
            <th className="pb-3">AI Companion</th>
            <th className="pb-3">Last Active</th>
            <th className="pb-3">Engagement</th>
            <th className="pb-3 text-right">Action</th>
            </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
            {patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 font-bold text-slate-900">{p.name}</td>
                <td className="py-4 text-slate-600">{p.age} yrs</td>
                <td className="py-4 font-semibold text-indigo-900">{p.language}</td>
                <td className="py-4 font-medium text-slate-700">{p.companionName}</td>
                <td className="py-4 text-xs font-semibold text-slate-500">{p.lastActive}</td>
                <td className="py-4">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                    p.engagementStatus === 'High Engagement'
                    ? 'bg-green-50 text-green-700 border-green-200'
                    : p.engagementStatus === 'Low Engagement'
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-amber-50 text-amber-700 border-amber-200'
                }`}>
                {p.engagementStatus}
                </span>
                </td>
                <td className="py-4 text-right">
                <button
                onClick={() => {
                    setSelectedPatient(p);
                    setActiveTab('INSIGHTS');
                }}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold px-3 py-1.5 rounded-xl text-xs"
                >
                View Clinical Insights ➔
                </button>
                </td>
                </tr>
            ))}
            </tbody>
            </table>
            </div>
            </div>
            </div>
        )}

        {/* TAB 2 & 4: INDIVIDUAL PATIENT INSIGHTS & AI OBSERVATIONS */}
        {(activeTab === 'PATIENTS' || activeTab === 'INSIGHTS') && (
            <div className="space-y-6">
            {/* Patient Header Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
            <span className="text-xs font-bold uppercase text-indigo-600 tracking-wider">Patient Overview</span>
            <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedPatient.name}</h2>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">
            Age {selectedPatient.age} • Language: {selectedPatient.language} • Companion: {selectedPatient.companionName}
            </p>
            </div>
            <div className="flex gap-2">
            <span className="bg-purple-50 text-purple-900 px-3 py-1.5 rounded-xl font-bold text-xs border border-purple-200">
            🔥 {selectedPatient.streak} Day Streak
            </span>
            <span className="bg-indigo-50 text-indigo-900 px-3 py-1.5 rounded-xl font-bold text-xs border border-indigo-200">
            ⭐ {selectedPatient.mindPoints} Mind Points
            </span>
            </div>
            </div>

            {/* AI GENERATED ENGAGEMENT OBSERVATION CARD */}
            <div className="bg-gradient-to-r from-indigo-900 to-purple-950 text-white rounded-3xl p-6 shadow-xl space-y-3">
            <div className="flex items-center gap-2">
            <span className="text-xl">✨</span>
            <h3 className="text-base font-extrabold tracking-wide uppercase text-indigo-200">
            AI-GENERATED ENGAGEMENT OBSERVATION
            </h3>
            </div>
            <p className="text-lg font-bold leading-relaxed text-indigo-50">
            "{selectedPatient.recentObservation}"
            </p>
            <div className="pt-2 border-t border-indigo-800/60 text-xs text-indigo-300 italic">
            * Note: This is an automated engagement observation derived from activity participation and is not a medical diagnosis.
            </div>
            </div>

            {/* ROUTINE BUILDER */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900">Assign Activity Routine</h3>
            <form onSubmit={handleAssignRoutine} className="flex gap-3">
            <input
            type="text"
            value={routineText}
            onChange={(e) => setRoutineText(e.target.value)}
            placeholder="e.g. 10-minute morning music memory session..."
            className="flex-1 p-3.5 border border-slate-300 rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-indigo-600"
            />
            <button
            type="submit"
            className="bg-indigo-900 hover:bg-indigo-950 text-white font-bold px-6 py-3.5 rounded-xl text-sm shadow-md"
            >
            Assign Routine ➔
            </button>
            </form>
            </div>
            </div>
        )}

        {/* TAB 6: CONSENT MATRIX */}
        {activeTab === 'CONSENT' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-slate-900">Clinical Consent & Memory Access Audit Log</h3>
            <p className="text-xs text-slate-500">Doctors only access consented activity metrics and approved memory capsules.</p>

            <div className="space-y-3 pt-2">
            {MOCK_CONSENT_MATRIX.map((c, idx) => (
                <div key={idx} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                <h4 className="font-extrabold text-sm text-slate-900">{c.feature}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{c.description}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-300">
                Consent Active ✓
                </span>
                </div>
            ))}
            </div>
            </div>
        )}
        </main>
        </div>
    );
}

window.DoctorDashboard = DoctorDashboard;
