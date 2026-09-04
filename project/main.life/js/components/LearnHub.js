// SMARANA Learn Something New & Digital Literacy Simulation

function LearnHub() {
    const [activeLesson, setActiveLesson] = React.useState(null);
    const [simStep, setSimStep] = React.useState(1);

    const lessons = [
        {
            id: 'l1',
            title: 'How to Make a Smartphone Video Call',
            category: 'Digital Literacy',
            icon: '📞',
            desc: 'Step-by-step interactive simulation to call your family'
        },
        {
            id: 'l2',
            title: 'Online Scam & Message Safety Awareness',
            category: 'Safety',
            icon: '🛡️',
            desc: 'Recognize fake reward messages & protect your privacy'
        },
        {
            id: 'l3',
            title: 'Sending Voice Messages on WhatsApp',
            category: 'Communication',
            icon: '💬',
            desc: 'Easily send audio greetings to your children'
        }
    ];

    const handleFinishLesson = (title) => {
        window.smarnaAudio.playSuccess();
        const earned = window.smarnaStore.completeJourneyActivity('j3');
        alert(`🎉 Great job! Completed lesson: ${title}! Earned +${earned || 25} Mind Points!`);
        setActiveLesson(null);
        setSimStep(1);
    };

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 flex items-center justify-between">
        <div>
        <h2 className="text-2xl font-black text-indigo-950">LEARN SOMETHING NEW 📚</h2>
        <p className="text-xs font-bold text-amber-800">Short & Practical 5-Minute Micro Lessons</p>
        </div>
        </div>

        {!activeLesson ? (
            <div className="space-y-3">
            {lessons.map(l => (
                <div
                key={l.id}
                onClick={() => {
                    window.smarnaAudio.playClick();
                    setActiveLesson(l.id);
                    setSimStep(1);
                }}
                className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4"
                >
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center text-3xl shadow-inner">
                {l.icon}
                </div>
                <div className="flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                {l.category}
                </span>
                <h3 className="font-extrabold text-base text-gray-900 mt-1">{l.title}</h3>
                <p className="text-xs text-gray-600 font-medium">{l.desc}</p>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 relative space-y-5">
            <button
            onClick={() => setActiveLesson(null)}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 font-bold px-3 py-1.5 rounded-xl text-xs text-gray-700"
            >
            ← Exit Lesson
            </button>

            {activeLesson === 'l1' && (
                <div className="text-center space-y-4">
                <span className="text-4xl">📞</span>
                <h3 className="text-xl font-extrabold text-indigo-950">Interactive Simulation: Video Calling</h3>

                {simStep === 1 && (
                    <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 space-y-3">
                    <p className="text-sm font-bold text-gray-800">
                    Step 1: Open your phone contacts and find your granddaughter Kavya.
                    </p>
                    <button
                    onClick={() => setSimStep(2)}
                    className="w-full bg-amber-500 text-white font-bold py-3 rounded-xl text-sm shadow"
                    >
                    Tap Kavya's Profile ➔
                    </button>
                    </div>
                )}

                {simStep === 2 && (
                    <div className="bg-green-50 p-5 rounded-2xl border border-green-200 space-y-3">
                    <p className="text-sm font-bold text-gray-800">
                    Step 2: Look for the green Video Camera icon 📹 and tap it!
                    </p>
                    <button
                    onClick={() => handleFinishLesson('How to Make a Video Call')}
                    className="w-full bg-green-600 text-white font-bold py-3 rounded-xl text-sm shadow flex items-center justify-center gap-2"
                    >
                    <span>📹 Tap Green Video Call Button</span>
                    </button>
                    </div>
                )}
                </div>
            )}

            {activeLesson === 'l2' && (
                <div className="text-center space-y-4">
                <span className="text-4xl">🛡️</span>
                <h3 className="text-xl font-extrabold text-indigo-950">Digital Scam Safety Awareness</h3>
                <div className="bg-red-50 p-5 rounded-2xl border border-red-200 space-y-3 text-left">
                <p className="text-xs font-bold uppercase text-red-700">Question:</p>
                <p className="text-sm font-bold text-gray-900">
                "You receive an SMS saying: 'You won 10 Lakh Rupees! Click this unknown link immediately to claim.'"
                </p>
                <p className="text-xs text-gray-700">What should you do?</p>
                </div>

                <div className="grid grid-cols-1 gap-2 pt-2">
                <button
                onClick={() => handleFinishLesson('Online Safety Awareness')}
                className="p-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-2xl text-sm shadow"
                >
                ✓ Ignore & Delete the message (Correct!)
                </button>
                <button
                onClick={() => alert("Remember: Never click unknown links asking for personal details or money!")}
                className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-2xl text-sm"
                >
                Click the link immediately
                </button>
                </div>
                </div>
            )}

            {activeLesson === 'l3' && (
                <div className="text-center space-y-4 py-4">
                <span className="text-4xl">💬</span>
                <h3 className="text-xl font-extrabold text-indigo-950">Sending WhatsApp Voice Notes</h3>
                <p className="text-sm text-gray-600">Press and hold the green microphone icon while speaking!</p>
                <button
                onClick={() => handleFinishLesson('Sending Voice Messages')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl text-base shadow-md"
                >
                Practice Finished ➔
                </button>
                </div>
            )}
            </div>
        )}
        </div>
    );
}

window.LearnHub = LearnHub;
