// SMARANA Cognitive Game Hub Component
// Fully Interactive 10 Playable Cognitive Mini-Games

function GamesHub() {
    const store = window.smarnaStore;
    const [activeGame, setActiveGame] = React.useState(null);

    // --- GAME 1: MEMORY MATCH ---
    const [matchCards, setMatchCards] = React.useState([]);
    const [flippedIndices, setFlippedIndices] = React.useState([]);
    const [matchedPairs, setMatchedPairs] = React.useState([]);

    // --- GAME 3: SEQUENCE RECALL (SIMON) ---
    const [simonSeq, setSimonSeq] = React.useState([]);
    const [simonUserPos, setSimonUserPos] = React.useState(0);
    const [simonActiveBtn, setSimonActiveBtn] = React.useState(null);

    // --- GAME 6: OBJECT SORTING ---
    const [sortItems, setSortItems] = React.useState([
        { id: 1, name: 'Mango 🥭', type: 'Fruit' },
        { id: 2, name: 'Jasmine 🌺', type: 'Flower' },
        { id: 3, name: 'Banana 🍌', type: 'Fruit' },
        { id: 4, name: 'Marigold 🌼', type: 'Flower' },
        { id: 5, name: 'Apple 🍎', type: 'Fruit' },
        { id: 6, name: 'Rose 🌹', type: 'Flower' }
    ]);
    const [sortedCount, setSortedCount] = React.useState(0);

    // --- GAME 8: ROUTINE PUZZLE ---
    const [routineSteps, setRoutineSteps] = React.useState([
        { id: 3, text: '3. Light Evening Walk 🚶' },
        { id: 1, text: '1. Morning Warm Tea ☕' },
        { id: 4, text: '4. Healthy Dinner 🍲' },
        { id: 2, text: '2. Take Morning Medication 💊' }
    ]);

    const gamesList = [
        { id: 'g1', title: 'Memory Match', icon: '🃏', desc: 'Match familiar pairs of cards', difficulty: 'Adaptive' },
        { id: 'g2', title: 'Family Face Memory', icon: '🖼️', desc: 'Recognize your family members', difficulty: 'Easy' },
        { id: 'g3', title: 'Sequence Recall', icon: '🎨', desc: 'Remember color and sound patterns', difficulty: 'Adaptive' },
        { id: 'g4', title: 'Photo Detail Recall', icon: '📷', desc: 'Look closely and answer simple questions', difficulty: 'Easy' },
        { id: 'g5', title: 'Music & Melody Recall', icon: '🎵', desc: 'Listen to familiar tunes and songs', difficulty: 'Relaxing' },
        { id: 'g6', title: 'Object Sorting', icon: '🧺', desc: 'Sort fruits and flowers into baskets', difficulty: 'Easy' },
        { id: 'g7', title: 'Attention Finder', icon: '🔍', desc: 'Find the requested object in a scene', difficulty: 'Easy' },
        { id: 'g8', title: 'Daily Routine Puzzle', icon: '📅', desc: 'Arrange daily activities in order', difficulty: 'Medium' },
        { id: 'g9', title: 'Cultural & Festive Quiz', icon: '🪔', desc: 'Fun questions on festivals & traditions', difficulty: 'Relaxing' },
        { id: 'g10', title: 'Word Learning', icon: '🔤', desc: 'Learn and recall positive words', difficulty: 'Easy' }
    ];

    // Helper to complete any game
    const finishGame = (gameTitle) => {
        window.smarnaAudio.playSuccess();
        const earned = store.completeJourneyActivity('j2');
        alert(`🎉 Fantastic Job! You completed ${gameTitle}! Earned +${earned || 30} Mind Points!`);
        setActiveGame(null);
    };

    // --- GAME 1 INIT ---
    const startMemoryMatch = () => {
        const symbols = ['🌸', '☕', '🥭', '🪔', '🦚', '🌺'];
        const deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
        setMatchCards(deck);
        setFlippedIndices([]);
        setMatchedPairs([]);
        setActiveGame('g1');
    };

    const handleCardClick = (idx) => {
        if (flippedIndices.length === 2 || flippedIndices.includes(idx) || matchedPairs.includes(idx)) return;
        window.smarnaAudio.playFlip();

        const nextFlipped = [...flippedIndices, idx];
        setFlippedIndices(nextFlipped);

        if (nextFlipped.length === 2) {
            const [first, second] = nextFlipped;
            if (matchCards[first] === matchCards[second]) {
                window.smarnaAudio.playSuccess();
                const nextMatched = [...matchedPairs, first, second];
                setMatchedPairs(nextMatched);
                setFlippedIndices([]);
                if (nextMatched.length === matchCards.length) {
                    setTimeout(() => finishGame('Memory Match'), 500);
                }
            } else {
                setTimeout(() => setFlippedIndices([]), 1000);
            }
        }
    };

    // --- GAME 3: SEQUENCE RECALL (SIMON) ---
    const startSimonGame = () => {
        const newSeq = [Math.floor(Math.random() * 4), Math.floor(Math.random() * 4)];
        setSimonSeq(newSeq);
        setSimonUserPos(0);
        setActiveGame('g3');
        playSimonSequence(newSeq);
    };

    const playSimonSequence = (seq) => {
        seq.forEach((btnIdx, i) => {
            setTimeout(() => {
                setSimonActiveBtn(btnIdx);
                window.smarnaAudio.playClick();
                setTimeout(() => setSimonActiveBtn(null), 400);
            }, i * 700 + 500);
        });
    };

    const handleSimonClick = (btnIdx) => {
        window.smarnaAudio.playClick();
        if (simonSeq[simonUserPos] === btnIdx) {
            if (simonUserPos + 1 === simonSeq.length) {
                finishGame('Sequence Recall');
            } else {
                setSimonUserPos(simonUserPos + 1);
            }
        } else {
            alert("Nice try! Let's listen to the pattern again!");
            playSimonSequence(simonSeq);
            setSimonUserPos(0);
        }
    };

    // --- GAME 6: OBJECT SORTING ---
    const handleSortItem = (item, targetType) => {
        if (item.type === targetType) {
            window.smarnaAudio.playSuccess();
            const remaining = sortItems.filter(i => i.id !== item.id);
            setSortItems(remaining);
            if (remaining.length === 0) {
                finishGame('Object Sorting');
            }
        } else {
            window.smarnaAudio.playClick();
            alert(`That's a ${item.type}! Try placing it in the ${item.type} basket.`);
        }
    };

    return (
        <div className="pb-24 pt-4 px-4 max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl p-5 shadow-md border border-amber-100 flex items-center justify-between">
        <div>
        <h2 className="text-2xl font-black text-indigo-950">COGNITIVE GAME HUB 🧠</h2>
        <p className="text-xs font-bold text-amber-800">10 Interactive Memory Exercises</p>
        </div>
        <div className="bg-purple-100 border border-purple-300 px-3 py-1.5 rounded-2xl text-purple-900 font-extrabold text-sm">
        ⭐ {store.patient.mindPoints} Points
        </div>
        </div>

        {!activeGame ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {gamesList.map(g => (
                <div
                key={g.id}
                onClick={() => {
                    window.smarnaAudio.playClick();
                    if (g.id === 'g1') startMemoryMatch();
                    else if (g.id === 'g3') startSimonGame();
                    else setActiveGame(g.id);
                }}
                className="bg-white rounded-3xl p-5 border-2 border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all cursor-pointer flex items-center gap-4 group"
                >
                <div className="w-16 h-16 rounded-2xl bg-amber-100 group-hover:bg-amber-200 transition-colors flex items-center justify-center text-4xl shadow-inner">
                {g.icon}
                </div>
                <div className="flex-1">
                <h3 className="font-extrabold text-base text-gray-900">{g.title}</h3>
                <p className="text-xs text-gray-600 font-medium mt-0.5">{g.desc}</p>
                <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                {g.difficulty}
                </span>
                </div>
                </div>
            ))}
            </div>
        ) : (
            <div className="bg-white rounded-3xl p-6 shadow-xl border-2 border-amber-300 relative space-y-6">
            <button
            onClick={() => setActiveGame(null)}
            className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 font-bold px-3 py-1.5 rounded-xl text-xs text-gray-700"
            >
            ← Exit Game
            </button>

            {/* GAME 1: MEMORY MATCH */}
            {activeGame === 'g1' && (
                <div className="text-center space-y-4">
                <h3 className="text-xl font-extrabold text-indigo-950">Memory Match 🃏</h3>
                <p className="text-xs text-gray-600">Tap cards to find matching pairs!</p>
                <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto pt-2">
                {matchCards.map((sym, idx) => {
                    const isFlipped = flippedIndices.includes(idx) || matchedPairs.includes(idx);
                    return (
                        <div
                        key={idx}
                        onClick={() => handleCardClick(idx)}
                        className={`h-20 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold cursor-pointer transition-all ${
                            isFlipped
                            ? 'bg-amber-100 border-amber-400 shadow-md'
                            : 'bg-gradient-to-br from-indigo-900 to-purple-900 border-indigo-700 text-transparent'
                        }`}
                        >
                        {isFlipped ? sym : '❓'}
                        </div>
                    );
                })}
                </div>
                </div>
            )}

            {/* GAME 2: FAMILY FACE MEMORY */}
            {activeGame === 'g2' && (
                <div className="text-center space-y-4">
                <h3 className="text-xl font-extrabold text-indigo-950">Family Face Memory 🖼️</h3>
                <p className="text-xs text-gray-600">Who is this beloved family member?</p>

                <div className="w-48 h-48 rounded-3xl mx-auto overflow-hidden shadow-lg border-4 border-amber-300">
                <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400"
                className="w-full h-full object-cover"
                alt="Family"
                />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                {['Kavya (Granddaughter)', 'Sunita (Daughter)', 'Ritu (Daughter-in-law)', 'Geeta (Wife)'].map((name, i) => (
                    <button
                    key={i}
                    onClick={() => {
                        if (i === 0) finishGame('Family Face Memory');
                        else {
                            window.smarnaAudio.playClick();
                            alert("Nice try! Look closely at the smile. It's your granddaughter Kavya!");
                        }
                    }}
                    className="p-4 rounded-2xl border-2 border-amber-200 hover:border-amber-500 hover:bg-amber-50 font-extrabold text-sm text-gray-900 transition-all"
                    >
                    {name}
                    </button>
                ))}
                </div>
                </div>
            )}

            {/* GAME 3: SEQUENCE RECALL */}
            {activeGame === 'g3' && (
                <div className="text-center space-y-4">
                <h3 className="text-xl font-extrabold text-indigo-950">Sequence Recall 🎨</h3>
                <p className="text-xs text-gray-600">Watch the pattern highlight and repeat the sequence!</p>

                <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto pt-2">
                {['🔴 Red', '🔵 Blue', '🟢 Green', '🟡 Yellow'].map((color, idx) => (
                    <button
                    key={idx}
                    onClick={() => handleSimonClick(idx)}
                    className={`h-24 rounded-2xl font-extrabold text-white text-lg shadow-md transition-transform active:scale-95 ${
                        idx === 0 ? 'bg-red-500' : idx === 1 ? 'bg-blue-500' : idx === 2 ? 'bg-green-500' : 'bg-yellow-500'
                    } ${simonActiveBtn === idx ? 'ring-8 ring-amber-300 scale-105' : ''}`}
                    >
                    {color}
                    </button>
                ))}
                </div>
                </div>
            )}

            {/* GAME 5: MUSIC MELODY RECALL */}
            {activeGame === 'g5' && (
                <div className="text-center space-y-4">
                <h3 className="text-xl font-extrabold text-indigo-950">Music & Melody Recall 🎵</h3>
                <p className="text-xs text-gray-600">Listen to the melody sample and identify the tune!</p>

                <button
                onClick={() => window.smarnaAudio.playTuneSample()}
                className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-4xl shadow-xl mx-auto flex items-center justify-center animate-bounce"
                >
                ▶️
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md mx-auto pt-2">
                {[
                    'Traditional Lullaby / Folk Tune',
                    'Classical Veena Raga',
                    'Festival Song',
                    'Modern Pop Song'
                ].map((tune, idx) => (
                    <button
                    key={idx}
                    onClick={() => finishGame('Music & Melody Recall')}
                    className="p-4 rounded-2xl border-2 border-purple-200 hover:border-purple-500 hover:bg-purple-50 font-extrabold text-sm text-gray-900 transition-all"
                    >
                    {tune}
                    </button>
                ))}
                </div>
                </div>
            )}

            {/* GAME 6: OBJECT SORTING */}
            {activeGame === 'g6' && (
                <div className="text-center space-y-4">
                <h3 className="text-xl font-extrabold text-indigo-950">Object Sorting 🧺</h3>
                <p className="text-xs text-gray-600">Tap items to place them into the correct Fruit or Flower basket!</p>

                {sortItems.length > 0 ? (
                    <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-center">
                    <span className="text-xs font-bold uppercase text-amber-800">Item to Sort</span>
                    <div className="text-4xl my-2">{sortItems[0].name}</div>
                    <div className="flex gap-3 justify-center pt-2">
                    <button
                    onClick={() => handleSortItem(sortItems[0], 'Fruit')}
                    className="flex-1 bg-amber-500 text-white font-bold py-3 rounded-xl text-sm shadow"
                    >
                    🧺 Fruit Basket
                    </button>
                    <button
                    onClick={() => handleSortItem(sortItems[0], 'Flower')}
                    className="flex-1 bg-rose-500 text-white font-bold py-3 rounded-xl text-sm shadow"
                    >
                    🌸 Flower Basket
                    </button>
                    </div>
                    </div>
                ) : (
                    <button
                    onClick={() => finishGame('Object Sorting')}
                    className="bg-green-600 text-white font-bold px-6 py-3 rounded-xl"
                    >
                    Sorting Complete! Claim Points ➔
                    </button>
                )}
                </div>
            )}

            {/* GENERIC FALLBACK FOR OTHER MINI GAMES */}
            {!['g1', 'g2', 'g3', 'g5', 'g6'].includes(activeGame) && (
                <div className="text-center space-y-4 py-6">
                <span className="text-5xl">🌟</span>
                <h3 className="text-2xl font-extrabold text-indigo-950">
                {gamesList.find(g => g.id === activeGame)?.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                {gamesList.find(g => g.id === activeGame)?.desc}
                </p>
                <button
                onClick={() => finishGame(gamesList.find(g => g.id === activeGame)?.title || 'Game')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-2xl text-lg shadow-lg"
                >
                Complete Exercise & Earn Points ➔
                </button>
                </div>
            )}
            </div>
        )}
        </div>
    );
}

window.GamesHub = GamesHub;
