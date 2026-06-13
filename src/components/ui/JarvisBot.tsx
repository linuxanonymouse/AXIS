"use client";

import { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Volume2, VolumeX, Loader2, Play, BrainCircuit } from "lucide-react";

export default function JarvisBot() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState("");

  const recognitionRef = useRef<any>(null);
  const hasGreeted = useRef(false);

  const welcomeMessage = "HI. I'm JARVIS, your AI assistant. My purpose is simple: to make complex things effortless. Whether you're deploying AI infrastructure, automating operational workflows, scaling revenue systems, or architecting custom agents, I am here to engineer your solutions with precision and speed. Consider me your central Axis command node. Need a system architected? I'll design it. Need an operation automated? I'll build the workflow. Need insights? I'll extract them. Ready when you are.";

  const setJarvisVoice = (utterance: SpeechSynthesisUtterance) => {
    const voices = window.speechSynthesis.getVoices();
    // Explicitly target known high-quality MALE voices across Windows, Mac, and Edge
    const jarvisVoice = voices.find(v => v.name.includes("Google UK English Male")) ||
                        voices.find(v => v.name.includes("Daniel")) || // Mac UK Male
                        voices.find(v => v.name.includes("Oliver")) || // Mac/iOS UK Male
                        voices.find(v => v.name.includes("Arthur")) || // Mac UK Male
                        voices.find(v => v.name.includes("Microsoft George")) || // Windows UK Male
                        voices.find(v => v.name.includes("Ryan")) || // Edge UK Male
                        voices.find(v => v.name.includes("Thomas")) || // Edge UK Male
                        voices.find(v => v.name.includes("Elliot")) || // Edge UK Male
                        voices.find(v => v.name.includes("Brian")) || // Edge/Windows UK Male
                        voices.find(v => v.lang.includes("en-GB") && v.name.toLowerCase().includes("male")) || 
                        voices.find(v => v.name.includes("David")) || // Windows US Male
                        voices.find(v => v.name.includes("Mark")) || // Windows US Male
                        voices.find(v => v.name.includes("Guy")) || // Edge US Male
                        voices.find(v => v.name.includes("Christopher")) || // Edge US Male
                        voices.find(v => v.name.includes("Eric")) || // Edge US Male
                        voices.find(v => v.lang.includes("en-GB") && !v.name.toLowerCase().includes("female") && !v.name.toLowerCase().includes("hazel") && !v.name.toLowerCase().includes("susan") && !v.name.toLowerCase().includes("zira") && !v.name.toLowerCase().includes("kate") && !v.name.toLowerCase().includes("serena") && !v.name.toLowerCase().includes("sonia") && !v.name.toLowerCase().includes("libby") && !v.name.toLowerCase().includes("maisie")) ||
                        voices[0];
    
    if (jarvisVoice) {
      utterance.voice = jarvisVoice;
    }
    
    // Remove the rapid pulse and replace with smooth state transitions
    utterance.onstart = () => {
      window.dispatchEvent(new CustomEvent('jarvis-state', { detail: { isSpeaking: true } }));
    };
    utterance.onend = () => {
      window.dispatchEvent(new CustomEvent('jarvis-state', { detail: { isSpeaking: false } }));
    };

    // Make him speak slightly faster for a more natural flow
    utterance.rate = 1.15; 
    utterance.pitch = 1.0; 
  };

  useEffect(() => {
    // Attempt auto-play greeting on load
    const speakGreeting = () => {
      if (hasGreeted.current) return;
      
      if ('speechSynthesis' in window) {
        // Double check voices are actually loaded before greeting if this is triggered early
        if (window.speechSynthesis.getVoices().length === 0) return;
        
        hasGreeted.current = true;
        const utterance = new SpeechSynthesisUtterance(welcomeMessage);
        setJarvisVoice(utterance);
        window.speechSynthesis.speak(utterance);
        
        utterance.onstart = () => setIsInitialized(true);
      }
    };

    // Load voices if they aren't loaded yet
    if ('speechSynthesis' in window && window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = speakGreeting;
    }

    // Delay slightly to ensure page load
    const timer = setTimeout(() => {
      speakGreeting();
      // If speechSynthesis doesn't trigger onstart within 500ms, assume it was blocked
      setTimeout(() => {
        if (!window.speechSynthesis.speaking) {
          setIsInitialized(false);
        }
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const manualInitialize = () => {
    setIsInitialized(true);
    speak(welcomeMessage);
  };

  const speak = (text: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    setJarvisVoice(utterance);
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setError("Speech recognition is not supported in this browser. Try Chrome or Edge.");
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true; 
      recognition.interimResults = true; // Required on some browsers to get real-time events while continuous is true
      // Removed hardcoded en-US language constraint so it correctly defaults to the user's OS language.

      recognition.onstart = () => {
        setIsListening(true);
        setError(null);
      };

      recognition.onresult = async (event: any) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        
        if (interimTranscript) {
          setTranscript(interimTranscript + "..."); // Show live typing feedback
        }

        if (finalTranscript.trim()) {
          setTranscript(finalTranscript);
          recognition.stop(); // Stop listening to process the command
          await handleSend(finalTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setError("Microphone access was denied. Please grant permission.");
        } else if (event.error === 'no-speech') {
          // Silently ignore timeout if the user didn't say anything, it just turns off the mic
          setError(null);
        } else {
          setError(`Speech recognition error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      
      // Stop any ongoing speech so Jarvis can listen
      window.speechSynthesis.cancel();
      
      recognition.start();
    } catch (err: any) {
      setError("Failed to start speech recognition.");
      console.error(err);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleSend = async (messageText: string) => {
    if (!messageText.trim()) return;
    setIsLoading(true);
    setResponse("");
    
    try {
      const res = await fetch("/api/intelligence/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      setResponse(data.response);
      speak(data.response);
    } catch (err: any) {
      setResponse("I'm sorry, I encountered an error connecting to my core systems.");
      setError(err.message);
      speak("I'm sorry, I encountered an error connecting to my core systems.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div style={{ background: "#050505", border: "1px solid #1a1a1a", padding: "2rem", borderRadius: "8px", textAlign: "center", maxWidth: "600px", margin: "0 auto" }}>
        <BrainCircuit size={48} color="#d4af37" style={{ marginBottom: "1rem", opacity: 0.8 }} />
        <h2 style={{ fontFamily: "var(--font-cormorant)", color: "#ededed", fontSize: "1.75rem", marginBottom: "1rem" }}>Initialize Jarvis</h2>
        <p style={{ color: "#888", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Axis Intelligence requires audio permissions to operate. Click below to establish connection and hear the greeting.
        </p>
        <button 
          onClick={manualInitialize}
          style={{
            background: "rgba(205, 164, 100, 0.1)", border: "1px solid var(--gold)", color: "var(--gold)",
            padding: "0.75rem 2rem", borderRadius: "4px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-mono)", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em"
          }}
        >
          <Play size={16} /> Establish Connection
        </button>
      </div>
    );
  }

  return (
    <div style={{ background: "#050505", border: "1px solid #1a1a1a", padding: "2rem", borderRadius: "8px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid #1a1a1a", paddingBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: isListening ? "#ff4444" : "var(--gold)", boxShadow: isListening ? "0 0 10px #ff4444" : "0 0 10px rgba(205,164,100,0.5)" }} />
            {isListening && <div style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: "1px solid #ff4444", animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite" }} />}
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-cormorant)", color: "#ededed", fontSize: "1.5rem", margin: 0 }}>Jarvis</h3>
            <p style={{ fontFamily: "var(--font-mono)", color: "#888", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em", margin: 0 }}>Axis Intelligence Core</p>
          </div>
        </div>
        
        <button 
          onClick={() => setIsMuted(!isMuted)}
          style={{ background: "none", border: "none", color: isMuted ? "#555" : "var(--gold)", cursor: "pointer", padding: "0.5rem" }}
          title={isMuted ? "Unmute Jarvis" : "Mute Jarvis"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
      </div>

      <div style={{ minHeight: "150px", marginBottom: "2rem" }}>
        {error && (
          <div style={{ color: "#ff4444", fontSize: "0.85rem", marginBottom: "1rem", padding: "0.5rem", background: "rgba(255,0,0,0.1)", border: "1px solid rgba(255,0,0,0.2)", borderRadius: "4px" }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: "1.5rem" }}>
          <p style={{ color: "#555", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>You said:</p>
          <p style={{ color: "#fff", fontStyle: "italic", fontSize: "1.1rem" }}>{transcript || "..."}</p>
        </div>

        <div>
          <p style={{ color: "var(--gold)", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.5rem" }}>Jarvis Response:</p>
          {isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#888" }}>
              <Loader2 size={16} className="animate-spin" /> Processing request...
            </div>
          ) : (
            <p style={{ color: "#ededed", fontSize: "1.1rem", lineHeight: 1.6 }}>{response || welcomeMessage}</p>
          )}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", alignItems: "center" }}>
        <input 
          type="text" 
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && inputText.trim()) {
              setTranscript(inputText);
              handleSend(inputText);
              setInputText("");
            }
          }}
          placeholder="Speak or type a command..."
          style={{
            background: "rgba(255,255,255,0.05)", border: "1px solid #1a1a1a", color: "#ededed",
            padding: "0.75rem 1rem", borderRadius: "4px", width: "100%", maxWidth: "400px",
            fontFamily: "var(--font-mono)", fontSize: "0.9rem", outline: "none"
          }}
        />
        <button
          onClick={isListening ? stopListening : startListening}
          style={{
            background: isListening ? "rgba(255,0,0,0.1)" : "rgba(205, 164, 100, 0.1)",
            border: `1px solid ${isListening ? "#ff4444" : "var(--gold)"}`,
            color: isListening ? "#ff4444" : "var(--gold)",
            width: "48px", height: "48px", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer", transition: "all 0.3s ease", flexShrink: 0
          }}
        >
          {isListening ? <MicOff size={20} /> : <Mic size={20} />}
        </button>
      </div>
      <style jsx>{`
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}


