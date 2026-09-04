// SMARANA Elder Home Dashboard Component with Speech Synthesis & Lip Sync

function ElderHome({ onNavigateTab, onOpenCompanionCreator }) {
    const store = window.smarnaStore;
    const [patient, setPatient] = React.useState(store.patient);
    const [companion, setCompanion] = React.useState(store.companion);
    const [journey, setJourney] = React.useState(store.journey);
    const [activeSpeech, setActiveSpeech] = React.useState(
        `Hello ${store.companion.addressAs || 'Dadu'}! I was waiting to see you. How are you feeling today?`
    );
    const [isTalkingModal, setIsTalkingModal] = React.useState(false);
    const [listeningState, setListeningState] = React.useState(false);
    const [conversationHistory, setConversationHistory] = React.useState([
        { sender: 'avatar', text: `Hello ${store.companion.addressAs || 'Dadu'}! I am ${store.companion.name}. Would you like to play a game or talk today?` }
    ]);

    const canvasRef = React.useRef(null);
    const engineRef = React.useRef(null);

    const speakText = (text) => {
        window.smarnaAudio.speak(text, {
            language: companion.language,
            gender: companion.gender,
            type: companion.type,
            voiceRate: companion.voiceRate,
            voicePitch: companion.voicePitch
        });
    };

    React.useEffect(() => {
        const unsub = store.subscribe(() => {
            setPatient({ ...store.patient });
            setCompanion({ ...store.companion });
            setJourney([...store.journey]);
        });
        return unsub;
    }, []);

    React.useEffect(() => {
        if (canvasRef.current) {
            engineRef.current = new window.CompanionAvatarEngine(canvasRef.current);
            engineRef.current.start();
            engineRef.current.setState('HAPPY', activeSpeech);
        }
        return () => {
            if (engineRef.current) engineRef.current.stop();
        };
    }, [canvasRef.current]);

    const handleMoodSelect = (moodText) => {
        window.smarnaAudio.playSuccess();
        store.updatePatient({ moodToday: moodText });

        let reply = "";
        if (moodText.includes('Great') || moodText.includes('Good')) {
            reply = `Wonderful! I'm so happy to hear that, ${companion.addressAs}! Let's make today full of joy.`;
            if (engineRef.current) engineRef.current.setState('EXCITED', reply);
        } else {
            reply = `I am here with you, ${companion.addressAs}. Would you like to listen to soothing music or look at a happy memory photo together?`;
            if (engineRef.current) engineRef.current.setState('SUPPORTIVE', reply);
        }
        setActiveSpeech(reply);
        speakText(reply);
    };

    const handleStartTalk = () => {
        window.smarnaAudio.playClick();
        setIsTalkingModal(true);
        if (engineRef.current) engineRef.current.setState('LISTENING');
        speakText(activeSpeech);
    };

    const handleVoiceMicInput = () => {
        setListeningState(true);
        if (engineRef.current) engineRef.current.setState('LISTENING');

        window.smarnaAudio.listen(
            (transcript) => {
                setListeningState(false);
                const newHist = [...conversationHistory, { sender: 'user', text: transcript }];
                setConversationHistory(newHist);

                setTimeout(() => {
                    let aiResponse = "";
                    if (transcript.toLowerCase().includes('game') || transcript.toLowerCase().includes('play')) {
                        aiResponse = `That sounds fun! Let's play the Memory Match game together. I'll open it for you!`;
                        setTimeout(() => onNavigateTab('PLAY'), 2500);
                    } else if (transcript.toLowerCase().includes('photo') || transcript.toLowerCase().includes('memory')) {
                        aiResponse = `I love looking at your family memories! Let's open the Memory Capsule.`;
                        setTimeout(() => onNavigateTab('MEMORIES'), 2500);
                    } else {
                        aiResponse = `Thank you for sharing that with me, ${companion.addressAs}. You completed your morning check-in beautifully!`;
                        store.completeJourneyActivity('j1');
                    }

                    setConversationHistory(prev => [...prev, { sender: 'avatar', text: aiResponse }]);
                    setActiveSpeech(aiResponse);
                    if (engineRef.current) engineRef.current.setState('SPEAKING', aiResponse);
                    speakText(aiResponse);
                }, 1200);
            },
            (err) => {
                setListeningState(false);
            }
        );
    };

    const handleCardClick = (item) => {
        window.smarnaAudio.playClick();
        if (item.type === 'game') onNavigateTab('PLAY');
        else if (item.type === 'memory') onNavigateTab('MEMORIES');
        else if (item.type === 'family') onNavigateTab('FAMILY');
        else if (item.type === 'learn') onNavigateTab('PLAY');
        else if (item.type === 'talk') handleStartTalk();
        else if (item.type === 'relax') {
            const earned = store.completeJourneyActivity(item.id);
            window.smarnaAudio.playTuneSample();
            alert(`✨ Completed 3-minute relaxation breathing with ${companion.name}! Earned +${earned} Mind Points!`);
        }
    };

    const completedCount = journey.filter(j => j.completed).length;

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        {/* Welcome Banner */}
        <div className="flex items-center justify-between bg-white rounded-3xl p-5 shadow-md border border-amber-100">
        <div>
        <h2 className="text-2xl font-black text-indigo-950">
        Good Morning, {patient.name.split(' ')[0]} {companion.addressAs} 🌞
        </h2>
        <p className="text-sm font-semibold text-amber-800 mt-0.5">
        "Let's make today a beautiful day."
        </p>
        </div>
        <button
        onClick={onOpenCompanionCreator}
        title="Customize Companion"
        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold p-3 rounded-2xl text-xs flex flex-col items-center border border-amber-300 shadow-sm"
        >
        <span className="text-xl">✨</span>
        <span>Edit Avatar</span>
        </button>
        </div>

        {/* CENTRAL FOCUS: ANIMATED COMPANION AVATAR */}
        <div className="bg-gradient-to-b from-amber-500/10 via-rose-50 to-amber-100/50 rounded-3xl p-6 shadow-xl border-2 border-amber-300/80 relative text-center">
        {/* Companion Name & Voice Gender Badge */}
        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full shadow border border-amber-200 mb-3">
        <span className="text-sm">🌸</span>
        <span className="font-extrabold text-indigo-950 text-sm">
        {companion.name} ({companion.relationship || companion.type})
        </span>
        <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full border border-amber-300">
        {companion.gender === 'male' ? '👨 Male Voice' : '👩 Female Voice'}
        </span>
        </div>

        {/* Canvas Avatar */}
        <div className="flex justify-center my-2">
        <canvas ref={canvasRef} width={240} height={230} className="rounded-2xl cursor-pointer" onClick={handleStartTalk} />
        </div>

        {/* Dynamic Speech Bubble */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border border-amber-200 text-center max-w-lg mx-auto relative my-2">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-amber-200 rotate-45"></div>
        <p className="text-base sm:text-lg font-bold text-gray-800 leading-snug">
        "{activeSpeech}"
        </p>
        <button
        onClick={() => speakText(activeSpeech)}
        className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full hover:bg-indigo-100"
        >
        <span>🔊 Read Aloud ({companion.language})</span>
        </button>
        </div>

        {/* Primary Action Button */}
        <button
        onClick={handleStartTalk}
        className="mt-4 w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-lg py-4 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 mx-auto transition-transform active:scale-95"
        >
        <span className="text-2xl">🗣️</span>
        <span>Talk With {companion.name}</span>
        </button>
        </div>

        {/* MOOD CHECK-IN */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-gray-100 text-center">
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-gray-500 mb-3">
        How are you feeling right now?
        </h3>
        <div className="grid grid-cols-5 gap-2">
        {[
            { label: '😊 Great' },
            { label: '🙂 Good' },
            { label: '😐 Okay' },
            { label: '😔 Low' },
            { label: '😢 Sad' }
        ].map(m => (
            <button
            key={m.label}
            onClick={() => handleMoodSelect(m.label)}
            className={`p-3 rounded-2xl border text-xs sm:text-sm font-extrabold transition-all flex flex-col items-center gap-1 ${
                patient.moodToday === m.label
                ? 'border-amber-500 bg-amber-50 text-amber-950 scale-105 shadow-sm'
                : 'border-gray-200 hover:border-amber-300'
            }`}
            >
            <span className="text-2xl">{m.label.split(' ')[0]}</span>
            <span>{m.label.split(' ')[1]}</span>
            </button>
        ))}
        </div>
        </div>

        {/* TODAY'S PROGRESS & VIRTUAL GARDEN */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 space-y-4">
        <div className="flex items-center justify-between">
        <div>
        <h3 className="text-lg font-black text-gray-900">TODAY'S PROGRESS</h3>
        <p className="text-xs font-bold text-amber-800">
        {completedCount} / {journey.length} ACTIVITIES COMPLETED
        </p>
        </div>
        <div className="flex items-center gap-3">
        <div className="bg-orange-50 border border-orange-200 px-3 py-1.5 rounded-2xl text-center">
        <span className="text-xs block font-bold text-orange-600">STREAK</span>
        <span className="text-lg font-black text-orange-700">🔥 {patient.streakDays} Days</span>
        </div>
        <div className="bg-purple-50 border border-purple-200 px-3 py-1.5 rounded-2xl text-center">
        <span className="text-xs block font-bold text-purple-600">POINTS</span>
        <span className="text-lg font-black text-purple-700">⭐ {patient.mindPoints}</span>
        </div>
        </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-3.5 rounded-full overflow-hidden p-0.5 border border-gray-200">
        <div
        className="bg-gradient-to-r from-amber-500 to-green-500 h-full rounded-full transition-all duration-500"
        style={{ width: `${(completedCount / journey.length) * 100}%` }}
        />
        </div>

        {/* VIRTUAL SHARED GARDEN */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-200">
        <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
        🌱 Our Shared Garden (Level {patient.gardenLevel})
        </span>
        <span className="text-xs text-emerald-700 font-bold">Grows with your daily activities!</span>
        </div>
        <div className="flex items-center gap-3 overflow-x-auto py-2">
        {patient.gardenPlants.map((plant, idx) => (
            <div key={idx} className="bg-white/80 px-3 py-2 rounded-xl shadow-sm border border-emerald-100 flex items-center gap-2 whitespace-nowrap">
            <span className="text-xl">
            {idx % 2 === 0 ? '🌻' : idx % 3 === 0 ? '🌳' : '🌺'}
            </span>
            <span className="text-xs font-bold text-gray-800">{plant}</span>
            </div>
        ))}
        </div>
        </div>
        </div>

        {/* TODAY'S JOURNEY CARDS */}
        <div className="space-y-3">
        <h3 className="text-lg font-black text-gray-900">TODAY'S JOURNEY</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {journey.map((item, idx) => (
            <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className={`p-4 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                item.completed
                ? 'bg-emerald-50/60 border-emerald-300'
                : 'bg-white border-amber-200/80 hover:border-amber-400 hover:shadow-md'
            }`}
            >
            <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-inner">
            {item.icon}
            </div>
            <div>
            <h4 className="font-extrabold text-base text-gray-900 leading-tight">
            {idx + 1}. {item.title}
            </h4>
            <p className="text-xs font-medium text-gray-600 mt-0.5">{item.description}</p>
            </div>
            </div>

            {item.completed ? (
                <span className="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm shadow">
                ✓
                </span>
            ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full border border-amber-200">
                +{item.points} pts
                </span>
            )}
            </div>
        ))}
        </div>
        </div>

        {/* LIVE VOICE DIALOG MODAL */}
        {isTalkingModal && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            <button
            onClick={() => {
                window.smarnaAudio.stopSpeech();
                setIsTalkingModal(false);
            }}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600"
            >
            ✕
            </button>

            <div className="text-center">
            <span className="text-3xl">🗣️</span>
            <h3 className="text-2xl font-extrabold text-indigo-950">Talk With {companion.name}</h3>
            <p className="text-xs text-gray-600">Speak naturally in your preferred language ({companion.language})</p>
            </div>

            {/* Conversation Log */}
            <div className="bg-gray-50 rounded-2xl p-4 max-h-60 overflow-y-auto space-y-3 border border-gray-200">
            {conversationHistory.map((h, idx) => (
                <div
                key={idx}
                className={`p-3 rounded-2xl text-sm font-semibold max-w-[85%] ${
                    h.sender === 'user'
                    ? 'bg-amber-500 text-white ml-auto rounded-br-none'
                    : 'bg-white text-gray-900 border border-gray-200 rounded-bl-none shadow-sm'
                }`}
                >
                <div className="text-[10px] opacity-75 font-bold uppercase mb-0.5">
                {h.sender === 'user' ? 'You' : companion.name}
                </div>
                {h.text}
                </div>
            ))}
            </div>

            {/* Mic Action Bar */}
            <div className="text-center pt-2">
            <button
            onClick={handleVoiceMicInput}
            disabled={listeningState}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl mx-auto transition-all ${
                listeningState
                ? 'bg-red-500 text-white animate-ping'
                : 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:scale-105'
            }`}
            >
            🎙️
            </button>
            <p className="text-xs font-bold text-gray-600 mt-2">
            {listeningState ? 'Listening to your voice...' : 'Tap Mic to Speak'}
            </p>
            </div>
            </div>
            </div>
        )}
        </div>
    );
}

window.ElderHome = ElderHome;
