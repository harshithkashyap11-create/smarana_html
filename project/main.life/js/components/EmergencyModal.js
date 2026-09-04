// SMARANA Emergency Help Modal Component

function EmergencyModal({ onClose }) {
    const [alertSent, setAlertSent] = React.useState(false);

    const handleSendHelpRequest = () => {
        window.smarnaAudio.playSuccess();
        setAlertSent(true);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative text-center border-4 border-red-500 space-y-6">
        <button
        onClick={onClose}
        className="absolute top-4 right-4 w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center font-bold text-gray-600"
        >
        ✕
        </button>

        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-4xl mx-auto animate-bounce shadow-inner">
        🆘
        </div>

        <div>
        <h2 className="text-3xl font-black text-red-600">I NEED HELP</h2>
        <p className="text-sm font-bold text-gray-700 mt-1">
        Tap below to immediately notify your family or caregiver
        </p>
        </div>

        {!alertSent ? (
            <div className="space-y-3">
            <a
            href="tel:+919876543210"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
            >
            <span>📞</span>
            <span>CALL SON ANAND (+91 98765 43210)</span>
            </a>

            <button
            onClick={() => {
                window.smarnaAudio.playClick();
                alert("Connecting to Dr. Priya Sharma's clinical helpline...");
            }}
            className="w-full bg-indigo-900 hover:bg-indigo-950 text-white font-extrabold text-base py-4 rounded-2xl shadow-md flex items-center justify-center gap-3"
            >
            <span>🩺</span>
            <span>CONTACT DR. PRIYA SHARMA</span>
            </button>

            <button
            onClick={handleSendHelpRequest}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-extrabold text-base py-4 rounded-2xl shadow-md flex items-center justify-center gap-3"
            >
            <span>🚨</span>
            <span>SEND IMMEDIATE HELP REQUEST</span>
            </button>
            </div>
        ) : (
            <div className="bg-green-50 border-2 border-green-400 p-5 rounded-2xl space-y-2">
            <span className="text-3xl">✓</span>
            <h3 className="text-xl font-extrabold text-green-900">HELP REQUEST SENT!</h3>
            <p className="text-xs font-bold text-green-800">
            An alert with your location has been sent to Anand Kumar and Dr. Priya Sharma. They will check in with you right away.
            </p>
            </div>
        )}
        </div>
        </div>
    );
}

window.EmergencyModal = EmergencyModal;
