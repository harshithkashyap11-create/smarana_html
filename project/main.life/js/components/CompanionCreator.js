// SMARANA Create My Companion Customizer Wizard with Voice Selection

function CompanionCreator({ onComplete, onClose }) {
    const store = window.smarnaStore;
    const [step, setStep] = React.useState(1);
    const [cfg, setCfg] = React.useState({ ...store.companion });
    const [systemVoices, setSystemVoices] = React.useState([]);

    const canvasRef = React.useRef(null);
    const avatarEngineRef = React.useRef(null);

    React.useEffect(() => {
        if (window.smarnaAudio) {
            const v = window.smarnaAudio.getAvailableVoices(cfg.language);
            setSystemVoices(v);
        }
    }, [cfg.language]);

    React.useEffect(() => {
        if (canvasRef.current) {
            avatarEngineRef.current = new window.CompanionAvatarEngine(canvasRef.current);
            avatarEngineRef.current.start();
        }
        return () => {
            if (avatarEngineRef.current) avatarEngineRef.current.stop();
        };
    }, [canvasRef.current]);

    const handlePreviewVoice = () => {
        window.smarnaAudio.speak(
            `Hello ${cfg.addressAs || 'Dadu'}! I am ${cfg.name}. I am your ${cfg.relationship || 'companion'}. How are you feeling today?`,
            {
                language: cfg.language,
                gender: cfg.gender,
                type: cfg.type,
                voiceRate: cfg.voiceRate || 0.95,
                voicePitch: cfg.voicePitch || 1.1
            }
        );
    };

    const handleSave = () => {
        window.smarnaAudio.playSuccess();
        store.updateCompanion(cfg);
        if (onComplete) onComplete(cfg);
    };

        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 border border-amber-200">
            <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600"
            >
            ✕
            </button>

            <div className="text-center mb-4">
            <span className="text-3xl">✨</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-indigo-950">CREATE MY COMPANION</h2>
            <p className="text-sm text-gray-600">Create someone who feels familiar, warm, and special.</p>
            </div>

            {/* Step Indicator */}
            <div className="flex items-center justify-between gap-1 mb-6 max-w-md mx-auto">
            {[1, 2, 3, 4, 5].map(s => (
                <div
                key={s}
                className={`flex-1 h-2 rounded-full transition-all ${
                    s <= step ? 'bg-amber-500' : 'bg-gray-200'
                }`}
                />
            ))}
            </div>

            {/* LIVE CANVAS PREVIEW */}
            <div className="flex justify-center mb-6">
            <div className="relative bg-gradient-to-b from-amber-50 to-orange-100 rounded-3xl p-3 shadow-inner border-2 border-amber-300">
            <canvas ref={canvasRef} width={220} height={200} className="rounded-2xl" />
            <div className="absolute bottom-2 right-2 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-amber-900 shadow">
            {cfg.name || 'Preview'} ({cfg.gender === 'male' ? '👨 Male' : '👩 Female'})
            </div>
            </div>
            </div>

            {/* STEP 1: COMPANION TYPE */}
            {step === 1 && (
                <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Step 1: Choose Companion Type</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                    { type: 'Granddaughter', icon: '👧', label: 'Granddaughter', gender: 'female' },
                    { type: 'Grandson', icon: '👦', label: 'Grandson', gender: 'male' },
                    { type: 'Friend', icon: '🧑', label: 'Warm Friend', gender: 'female' },
                    { type: 'Cat', icon: '🐱', label: 'AI Pet Cat', gender: 'female' }
                ].map(item => (
                    <button
                    key={item.type}
                    onClick={() => {
                        window.smarnaAudio.playClick();
                        setCfg(prev => ({
                            ...prev,
                            type: item.type,
                            gender: item.gender,
                            voicePitch: item.gender === 'male' ? 0.8 : 1.2
                        }));
                    }}
                    className={`p-4 rounded-2xl border-2 text-center transition-all ${
                        cfg.type === item.type
                        ? 'border-amber-500 bg-amber-50 shadow-md scale-105'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                    >
                    <div className="text-4xl mb-2">{item.icon}</div>
                    <div className="font-bold text-sm text-gray-900">{item.label}</div>
                    <div className="text-[10px] text-gray-500 font-bold uppercase mt-1">{item.gender}</div>
                    </button>
                ))}
                </div>
                </div>
            )}

            {/* STEP 2: APPEARANCE CUSTOMIZATION */}
            {step === 2 && (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2">
                <h3 className="text-lg font-bold text-gray-900 text-center">Step 2: Choose Appearance</h3>

                {/* Skin Tone */}
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Skin Tone</label>
                <div className="flex gap-3">
                {['#FAD0C4', '#E8B993', '#C68642', '#8D5524'].map(tone => (
                    <button
                    key={tone}
                    onClick={() => setCfg(prev => ({ ...prev, appearance: { ...prev.appearance, skinTone: tone } }))}
                    style={{ backgroundColor: tone }}
                    className={`w-10 h-10 rounded-full border-4 shadow-sm transition-all ${
                        cfg.appearance?.skinTone === tone ? 'border-amber-500 scale-110' : 'border-white'
                    }`}
                    />
                ))}
                </div>
                </div>

                {/* Outfit Style */}
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Outfit Style</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                    { id: 'traditional-saree', label: 'Traditional Saree 🥻' },
                    { id: 'kurta', label: 'Kurta Pyjama 👔' },
                    { id: 'modern-casual', label: 'Modern Casual 👕' },
                    { id: 'festive', label: 'Festive Wear ✨' }
                ].map(o => (
                    <button
                    key={o.id}
                    onClick={() => setCfg(prev => ({ ...prev, appearance: { ...prev.appearance, outfitStyle: o.id } }))}
                    className={`p-2.5 rounded-xl border font-semibold text-xs transition-all ${
                        cfg.appearance?.outfitStyle === o.id
                        ? 'border-amber-500 bg-amber-50 text-amber-900 font-bold'
                        : 'border-gray-200'
                    }`}
                    >
                    {o.label}
                    </button>
                ))}
                </div>
                </div>

                {/* Outfit Color */}
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-2">Outfit Color</label>
                <div className="flex gap-3">
                {['#C0392B', '#8E44AD', '#27AE60', '#D35400', '#2980B9'].map(col => (
                    <button
                    key={col}
                    onClick={() => setCfg(prev => ({ ...prev, appearance: { ...prev.appearance, outfitColor: col } }))}
                    style={{ backgroundColor: col }}
                    className={`w-9 h-9 rounded-full border-4 shadow-sm transition-all ${
                        cfg.appearance?.outfitColor === col ? 'border-amber-500 scale-110' : 'border-white'
                    }`}
                    />
                ))}
                </div>
                </div>

                {/* Glasses & Bindi */}
                <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-800">
                <input
                type="checkbox"
                checked={cfg.appearance?.glasses || false}
                onChange={(e) => setCfg(prev => ({ ...prev, appearance: { ...prev.appearance, glasses: e.target.checked } }))}
                className="w-5 h-5 text-amber-600 rounded"
                />
                <span>Glasses 👓</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-gray-800">
                <input
                type="checkbox"
                checked={cfg.appearance?.accessories?.includes('bindi') || false}
                onChange={(e) => {
                    const acc = cfg.appearance?.accessories || [];
                    const nextAcc = e.target.checked ? [...acc, 'bindi'] : acc.filter(a => a !== 'bindi');
                    setCfg(prev => ({ ...prev, appearance: { ...prev.appearance, accessories: nextAcc } }));
                }}
                className="w-5 h-5 text-amber-600 rounded"
                />
                <span>Bindi 🔴</span>
                </label>
                </div>
                </div>
            )}

            {/* STEP 3: NAME & RELATIONSHIP */}
            {step === 3 && (
                <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Step 3: Name & Relationship</h3>
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Companion Name</label>
                <input
                type="text"
                value={cfg.name}
                onChange={(e) => setCfg(prev => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Anaya, Arjun, Maya, Leo"
                className="w-full p-4 border-2 border-gray-300 rounded-2xl text-lg font-bold outline-none focus:border-amber-500"
                />
                </div>
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">
                How should companion address you?
                </label>
                <div className="grid grid-cols-3 gap-2">
                {['Dadu', 'Grandpa', 'Grandma', 'Nani', 'Thatha', 'Ammamma'].map(t => (
                    <button
                    key={t}
                    onClick={() => setCfg(prev => ({ ...prev, addressAs: t }))}
                    className={`p-3 rounded-xl border font-bold text-sm transition-all ${
                        cfg.addressAs === t ? 'border-amber-500 bg-amber-50 text-amber-900' : 'border-gray-200'
                    }`}
                    >
                    {t}
                    </button>
                ))}
                </div>
                </div>
                </div>
            )}

            {/* STEP 4: PERSONALITY */}
            {step === 4 && (
                <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Step 4: Choose Personality</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                    { name: 'Sunshine', icon: '☀️', desc: 'Cheerful, energetic and uplifting' },
                    { name: 'Caring', icon: '❤️', desc: 'Warm, supportive and gentle' },
                    { name: 'Calm', icon: '🌿', desc: 'Peaceful, slow-paced and soothing' },
                    { name: 'Curious', icon: '📚', desc: 'Loves sharing stories and learning' },
                    { name: 'Playful', icon: '🎮', desc: 'Fun, humorous and encouraging' }
                ].map(p => (
                    <button
                    key={p.name}
                    onClick={() => setCfg(prev => ({ ...prev, personality: p.name }))}
                    className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                        cfg.personality === p.name
                        ? 'border-amber-500 bg-amber-50 shadow-md'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                    >
                    <span className="text-3xl">{p.icon}</span>
                    <div>
                    <div className="font-bold text-gray-900">{p.name}</div>
                    <div className="text-xs text-gray-600">{p.desc}</div>
                    </div>
                    </button>
                ))}
                </div>
                </div>
            )}

            {/* STEP 5: MULTILINGUAL VOICE & GENDER ENGINE */}
            {step === 5 && (
                <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900 text-center">Step 5: Voice, Language & Gender</h3>

                {/* Voice Gender Selection */}
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Voice Gender Tone</label>
                <div className="grid grid-cols-2 gap-3">
                <button
                onClick={() => setCfg(prev => ({ ...prev, gender: 'female', voicePitch: 1.2 }))}
                className={`p-3.5 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    cfg.gender === 'female' ? 'border-amber-500 bg-amber-50 text-amber-950 shadow-sm' : 'border-gray-200'
                }`}
                >
                <span>👧</span>
                <span>Female Voice (Higher Pitch)</span>
                </button>
                <button
                onClick={() => setCfg(prev => ({ ...prev, gender: 'male', voicePitch: 0.8 }))}
                className={`p-3.5 rounded-2xl border-2 font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    cfg.gender === 'male' ? 'border-indigo-500 bg-indigo-50 text-indigo-950 shadow-sm' : 'border-gray-200'
                }`}
                >
                <span>👦</span>
                <span>Male Voice (Deeper Pitch)</span>
                </button>
                </div>
                </div>

                {/* Language Picker */}
                <div>
                <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Language Selection</label>
                <select
                value={cfg.language}
                onChange={(e) => setCfg(prev => ({ ...prev, language: e.target.value }))}
                className="w-full p-3.5 border-2 border-gray-300 rounded-xl text-base font-bold outline-none focus:border-amber-500"
                >
                {['Telugu', 'English', 'Hindi', 'Tamil', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Punjabi', 'Bengali'].map(l => (
                    <option key={l} value={l}>{l}</option>
                ))}
                </select>
                </div>

                {/* System Voice Selection (If available) */}
                {systemVoices.length > 0 && (
                    <div>
                    <label className="block text-xs font-bold uppercase text-gray-600 mb-1">Installed Browser Voice</label>
                    <select
                    value={cfg.selectedVoiceName || ''}
                    onChange={(e) => setCfg(prev => ({ ...prev, selectedVoiceName: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-xl text-xs font-semibold"
                    >
                    <option value="">Auto-Select Voice ({cfg.gender})</option>
                    {systemVoices.map(v => (
                        <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
                    ))}
                    </select>
                    </div>
                )}

                {/* Voice Preview Button */}
                <button
                onClick={handlePreviewVoice}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 text-base transition-transform active:scale-98"
                >
                <span className="text-xl">🔊</span>
                <span>TEST & LISTEN TO VOICE SAMPLE</span>
                </button>
                </div>
            )}

            {/* Wizard Action Bar */}
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
            {step > 1 ? (
                <button
                onClick={() => setStep(step - 1)}
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl"
                >
                ← Back
                </button>
            ) : <div />}

            {step < 5 ? (
                <button
                onClick={() => setStep(step + 1)}
                className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-base rounded-2xl shadow-md"
                >
                Next Step ➔
                </button>
            ) : (
                <button
                onClick={handleSave}
                className="px-8 py-3.5 bg-green-600 hover:bg-green-700 text-white font-bold text-base rounded-2xl shadow-lg"
                >
                Complete & Meet {cfg.name}! 🎉
                </button>
            )}
            </div>
            </div>
            </div>
        );
}

window.CompanionCreator = CompanionCreator;
