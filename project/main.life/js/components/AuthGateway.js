// SMARANA Auth Gateway & Landing Screen Component

function AuthGateway({ onSelectRole }) {
    const [activeModal, setActiveModal] = React.useState(null); // 'ELDER_LOGIN', 'DOCTOR_LOGIN', null
    const [elderMethod, setElderMethod] = React.useState('PIN'); // 'PIN', 'OTP'
    const [pinDigits, setPinDigits] = React.useState('');
    const [phoneNum, setPhoneNum] = React.useState('');
    const [otpSent, setOtpSent] = React.useState(false);
    const [otpCode, setOtpCode] = React.useState('');

    const [docEmail, setDocEmail] = React.useState('dr.priya@smarana.health');
    const [docPass, setDocPass] = React.useState('password123');

    const handleElderSubmit = () => {
        window.smarnaAudio.playSuccess();
        onSelectRole('ELDER');
    };

    const handleDoctorSubmit = () => {
        window.smarnaAudio.playSuccess();
        onSelectRole('DOCTOR');
    };

    const handleKeypadClick = (num) => {
        window.smarnaAudio.playClick();
        if (pinDigits.length < 4) {
            const nextPin = pinDigits + num;
            setPinDigits(nextPin);
            if (nextPin.length === 4) {
                setTimeout(() => handleElderSubmit(), 300);
            }
        }
    };

    const handleKeypadDelete = () => {
        window.smarnaAudio.playClick();
        setPinDigits(prev => prev.slice(0, -1));
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-indigo-50 flex flex-col justify-between p-4 sm:p-8">
        {/* Top Branding Header */}
        <div className="text-center pt-6 pb-4">
        <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-md px-6 py-2.5 rounded-full shadow-md border border-amber-100">
        <span className="text-3xl">🌸</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-900 via-purple-800 to-rose-700 bg-clip-text text-transparent">
        SMARANA
        </h1>
        </div>
        <p className="mt-3 text-lg font-semibold text-indigo-950 tracking-wide">
        Remember. Learn. Connect.
        </p>
        <p className="mt-1 text-sm sm:text-base text-gray-600 max-w-md mx-auto">
        Your warm companion for memories, learning, and everyday moments.
        </p>
        </div>

        {/* Main Dual Role Cards */}
        <div className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 my-auto">
        {/* CARD 1: ELDER / PATIENT */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-amber-200/80 hover:border-amber-400 transition-all transform hover:-translate-y-1 flex flex-col justify-between text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-100/50 rounded-bl-full -z-0"></div>
        <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-5 shadow-inner">
        👵
        </div>
        <h2 className="text-2xl font-bold text-gray-900">ELDER / PATIENT</h2>
        <p className="text-amber-800 font-medium mt-1">Simple & Friendly Experience</p>
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Meet your personalized AI companion, play memory games, view family photos, and complete daily tasks easily.
        </p>
        </div>
        <button
        onClick={() => {
            window.smarnaAudio.playClick();
            setActiveModal('ELDER_LOGIN');
        }}
        className="mt-8 w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group-hover:scale-[1.02]"
        >
        <span>Continue as Elder</span>
        <span className="text-xl">➔</span>
        </button>
        </div>

        {/* CARD 2: DOCTOR / CAREGIVER */}
        <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-indigo-200/80 hover:border-indigo-400 transition-all transform hover:-translate-y-1 flex flex-col justify-between text-center relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-bl-full -z-0"></div>
        <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-2xl flex items-center justify-center text-5xl mx-auto mb-5 shadow-inner">
        🩺
        </div>
        <h2 className="text-2xl font-bold text-gray-900">DOCTOR / CAREGIVER</h2>
        <p className="text-indigo-800 font-medium mt-1">Professional Monitoring Portal</p>
        <p className="text-gray-600 text-sm mt-3 leading-relaxed">
        Track cognitive engagement trends, assign daily routines, review memory summaries, and configure alerts.
        </p>
        </div>
        <button
        onClick={() => {
            window.smarnaAudio.playClick();
            setActiveModal('DOCTOR_LOGIN');
        }}
        className="mt-8 w-full bg-gradient-to-r from-indigo-800 to-purple-800 hover:from-indigo-900 hover:to-purple-900 text-white font-bold text-lg py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-3 group-hover:scale-[1.02]"
        >
        <span>Continue as Professional</span>
        <span className="text-xl">➔</span>
        </button>
        </div>
        </div>

        {/* Footer info */}
        <div className="text-center py-4 text-xs text-gray-500">
        Smart India Hackathon Prototype • Accessible • Emotionally Connected • Dignified
        </div>

        {/* ELDER LOGIN MODAL */}
        {activeModal === 'ELDER_LOGIN' && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
            <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold"
            >
            ✕
            </button>
            <div className="text-center mb-6">
            <span className="text-4xl">👵</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Welcome, Dear Friend</h3>
            <p className="text-sm text-gray-600">Please choose your easy login method</p>
            </div>

            {/* Method Tabs */}
            <div className="flex bg-amber-50 p-1.5 rounded-2xl mb-6">
            <button
            onClick={() => setElderMethod('PIN')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                elderMethod === 'PIN' ? 'bg-white text-amber-900 shadow-md' : 'text-gray-600'
            }`}
            >
            🔢 4-Digit PIN
            </button>
            <button
            onClick={() => setElderMethod('OTP')}
            className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                elderMethod === 'OTP' ? 'bg-white text-amber-900 shadow-md' : 'text-gray-600'
            }`}
            >
            📱 Mobile OTP
            </button>
            </div>

            {elderMethod === 'PIN' ? (
                <div className="text-center">
                {/* Display dots */}
                <div className="flex justify-center gap-4 mb-6">
                {[0, 1, 2, 3].map(idx => (
                    <div
                    key={idx}
                    className={`w-12 h-14 rounded-2xl border-2 flex items-center justify-center text-2xl font-bold transition-all ${
                        pinDigits.length > idx
                        ? 'border-amber-500 bg-amber-50 text-amber-900 scale-105'
                        : 'border-gray-300 bg-gray-50'
                    }`}
                    >
                    {pinDigits.length > idx ? '●' : ''}
                    </div>
                ))}
                </div>

                {/* Large Keypad */}
                <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                    <button
                    key={num}
                    onClick={() => handleKeypadClick(num.toString())}
                    className="h-16 bg-amber-50 hover:bg-amber-100 active:bg-amber-200 border border-amber-200 rounded-2xl text-2xl font-extrabold text-amber-950 shadow-sm transition-all"
                    >
                    {num}
                    </button>
                ))}
                <button
                onClick={() => {
                    window.smarnaAudio.speak("Demo mode PIN is 1 2 3 4");
                }}
                className="h-16 bg-blue-50 text-blue-700 font-bold rounded-2xl text-xs flex flex-col items-center justify-center p-1"
                >
                <span>🗣️ Voice</span>
                <span>Help</span>
                </button>
                <button
                onClick={() => handleKeypadClick('0')}
                className="h-16 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-2xl text-2xl font-extrabold text-amber-950 shadow-sm"
                >
                0
                </button>
                <button
                onClick={handleKeypadDelete}
                className="h-16 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-2xl text-xl font-bold flex items-center justify-center"
                >
                ⌫
                </button>
                </div>

                <p className="text-xs text-gray-500 mt-4">Demo PIN: Enter any 4 numbers (e.g. 1234)</p>
                </div>
            ) : (
                <div>
                {!otpSent ? (
                    <div className="space-y-4">
                    <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
                    <input
                    type="tel"
                    value={phoneNum}
                    onChange={(e) => setPhoneNum(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full p-4 border-2 border-gray-300 rounded-2xl text-lg font-semibold focus:border-amber-500 outline-none"
                    />
                    </div>
                    <button
                    onClick={() => {
                        window.smarnaAudio.playClick();
                        setOtpSent(true);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-2xl text-lg shadow-md"
                    >
                    Send OTP Code 📩
                    </button>
                    </div>
                ) : (
                    <div className="space-y-4 text-center">
                    <p className="text-sm text-green-700 bg-green-50 p-2 rounded-xl">
                    OTP Sent to +91 98765 43210 (Demo Code: 1234)
                    </p>
                    <input
                    type="text"
                    maxLength={4}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="Enter 4-digit OTP"
                    className="w-full p-4 text-center tracking-widest border-2 border-amber-400 rounded-2xl text-2xl font-bold outline-none"
                    />
                    <button
                    onClick={handleElderSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-2xl text-lg shadow-md"
                    >
                    Verify & Continue ➔
                    </button>
                    </div>
                )}
                </div>
            )}
            </div>
            </div>
        )}

        {/* DOCTOR LOGIN MODAL */}
        {activeModal === 'DOCTOR_LOGIN' && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative animate-fadeIn">
            <button
            onClick={() => setActiveModal(null)}
            className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold"
            >
            ✕
            </button>
            <div className="text-center mb-6">
            <span className="text-4xl">🩺</span>
            <h3 className="text-2xl font-bold text-gray-900 mt-2">Doctor & Caregiver Portal</h3>
            <p className="text-sm text-gray-600">Secure clinical authentication</p>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); handleDoctorSubmit(); }} className="space-y-4">
            <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
            Professional Email
            </label>
            <input
            type="email"
            value={docEmail}
            onChange={(e) => setDocEmail(e.target.value)}
            className="w-full p-3.5 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            required
            />
            </div>

            <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1">
            Password
            </label>
            <input
            type="password"
            value={docPass}
            onChange={(e) => setDocPass(e.target.value)}
            className="w-full p-3.5 border border-gray-300 rounded-xl font-medium focus:ring-2 focus:ring-indigo-500 outline-none"
            required
            />
            </div>

            <div className="flex items-center justify-between text-xs text-gray-600">
            <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-indigo-600" />
            <span>2FA Authenticator Enabled</span>
            </label>
            <a href="#reset" className="text-indigo-600 font-semibold hover:underline">Forgot?</a>
            </div>

            <button
            type="submit"
            className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-bold py-4 rounded-xl text-lg shadow-lg transition-all"
            >
            Authenticate & Access Dashboard ➔
            </button>
            </form>
            </div>
            </div>
        )}
        </div>
    );
}

window.AuthGateway = AuthGateway;
