import React, { useState, useRef, useEffect } from 'react';
import { Send, HeartPulse, Sparkles, User, Bot, ShieldAlert, Stethoscope, ShieldCheck, Pill, Thermometer, Coffee, AlignLeft, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useHealthAI } from './useHealthAI';
import { HealthDashboard } from './components/HealthDashboard';
import { TeamDetails } from './components/TeamDetails';
import './App.css';

function App() {
  const { messages, sendMessage, isTyping, getHealthInsights } = useHealthAI();
  const [conditionInput, setConditionInput] = useState('');
  const [view, setView] = useState<'chat' | 'dashboard' | 'team'>('chat');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, view]);

  const handleConditionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (conditionInput.trim()) {
      getHealthInsights(conditionInput);
      setConditionInput('');
    }
  };

  return (
    <div className="app-container">
      <header className="header glass">
        <div className="logo-container">
          <HeartPulse size={32} />
        </div>
        <div className="header-content">
          <h1>Wellness AI</h1>
          <p>Your global health and wellness companion</p>
        </div>
        <div className="nav-actions">
          <button
            className={`nav-btn ${view === 'chat' ? 'active' : ''}`}
            onClick={() => setView('chat')}
          >
            Chat
          </button>
          <button
            className={`nav-btn ${view === 'dashboard' ? 'active' : ''}`}
            onClick={() => setView('dashboard')}
          >
            My Health
          </button>
          <button
            className={`nav-btn ${view === 'team' ? 'active' : ''}`}
            onClick={() => setView('team')}
          >
            Team
          </button>
        </div>
      </header>

      {view === 'dashboard' ? (
        <HealthDashboard />
      ) : view === 'team' ? (
        <TeamDetails />
      ) : (
        <main className="chat-window glass">
          <div className="messages-area">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`message-wrapper ${msg.type}`}
                >
                  <div className="icon-wrapper" style={{ marginRight: msg.type === 'bot' ? '10px' : '0', marginLeft: msg.type === 'user' ? '10px' : '0' }}>
                    {msg.type === 'bot' ? <Bot size={20} color="var(--primary)" /> : <User size={20} color="var(--text-muted)" />}
                  </div>

                  {msg.diseaseDirectory ? (
                    <div className="directory-card google-style">
                      <div className="card-header-main">
                        <div className="info-header">
                          <span className="type-label">Global Registry</span>
                          <h3>{msg.diseaseDirectory.title}</h3>
                        </div>
                        <Sparkles size={24} className="icon-pulse" />
                      </div>
                      <div className="card-content-top">
                        <p className="summary">{msg.diseaseDirectory.description}</p>
                      </div>
                      <div className="directory-grid">
                        {msg.diseaseDirectory.categories.map((cat, i) => (
                          <div key={i} className="directory-section">
                            <h4>{cat.name}</h4>
                            <div className="tag-container">
                              {cat.diseases.map((d, j) => (
                                <button
                                  key={j}
                                  className="disease-tag"
                                  onClick={() => sendMessage(d)}
                                >
                                  {d}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="disclaimer">
                        Click on any condition to see its full medical report (Symptoms, Meds, Precautions).
                      </div>
                    </div>
                  ) : msg.medicalData ? (
                    <div className="medical-card google-style">
                      <div className="card-header-main">
                        <div className="info-header">
                          <span className="type-label">Health condition</span>
                          <h3>{msg.medicalData.title}</h3>
                        </div>
                        <ShieldAlert size={24} className="icon-pulse" />
                      </div>

                      <div className="card-content-top">
                        {msg.medicalData.imageUrl && (
                          <div className="condition-image">
                            <img src={msg.medicalData.imageUrl} alt={msg.medicalData.title} />
                          </div>
                        )}
                        <p className="summary">{msg.medicalData.summary}</p>
                      </div>

                      <div className="card-grid">
                        {msg.medicalData.symptoms && (
                          <div className="section symptoms">
                            <h4><Thermometer size={14} /> Symptoms</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.symptoms.map((s, i) => <li key={i}>{s}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {msg.medicalData.homeRemedies && (
                          <div className="section remedies">
                            <h4><Coffee size={14} /> Home Remedies</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.homeRemedies.map((r, i) => <li key={i}>{r}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {msg.medicalData.precautions && (
                          <div className="section precautions">
                            <h4><ShieldCheck size={14} /> Precautions</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.precautions.map((p, i) => <li key={i}>{p}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {msg.medicalData.medications && (
                          <div className="section medications">
                            <h4><Pill size={14} /> Medication info</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.medications.map((m, i) => <li key={i}>{m}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {msg.medicalData.causes && (
                          <div className="section causes">
                            <h4><Stethoscope size={14} /> Causes</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.causes.map((c, i) => <li key={i}>{c}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}

                        {msg.medicalData.diseaseKnowledge && (
                          <div className="section knowledge">
                            <h4><AlignLeft size={14} /> Disease Knowledge</h4>
                            <div className="section-content">
                              <ul>
                                {msg.medicalData.diseaseKnowledge.map((k, i) => <li key={i}>{k}</li>)}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="disclaimer">
                        <strong>Medical Disclaimer:</strong> {msg.medicalData.disclaimer}
                      </div>
                    </div>
                  ) : (
                    <div className={`message ${msg.type}`}>
                      {msg.text}
                      <span className="time">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  )}
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="message-wrapper bot"
                >
                  <div className="icon-wrapper" style={{ marginRight: '10px' }}>
                    <Bot size={20} color="var(--primary)" />
                  </div>
                  <div className="message bot typing">
                    <span></span><span></span><span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </AnimatePresence>
          </div>

          <div className="input-area-wrapper">
            <div className="single-portal-container">
              {/* Condition Portal */}
              <form onSubmit={handleConditionSubmit} className="portal-box condition-portal glass full-width">
                <div className="portal-header">
                  <Sparkles size={16} color="#1a73e8" />
                  <span>Search Symptoms & Conditions</span>
                </div>
                <div className="portal-input-row">
                  <input
                    type="text"
                    value={conditionInput}
                    onChange={(e) => setConditionInput(e.target.value)}
                    placeholder="Search any symptom or disease..."
                  />
                  <button type="submit" disabled={!conditionInput.trim()}>
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>

            <div className="quick-chips">
              <button className="chip glass" onClick={() => sendMessage("Tell me about a balanced diet")}>
                <Coffee size={14} /> Balanced Diet
              </button>
              <button className="chip glass" onClick={() => sendMessage("Tips for quality sleep")}>
                <Moon size={14} /> Quality Sleep
              </button>
              <button className="chip glass" onClick={() => sendMessage("How to stay hydrated")}>
                <Thermometer size={14} /> Stay Hydrated
              </button>
              <button className="chip glass" onClick={() => sendMessage("Ways to manage stress")}>
                <User size={14} /> Manage Stress
              </button>
              <button className="chip glass" onClick={() => sendMessage("Routine medical check-ups")}>
                <Stethoscope size={14} /> Medical Check-ups
              </button>
              <button className="chip glass" onClick={() => sendMessage("Give me a wellness tip")}>
                <Sparkles size={14} /> More Wellness Tips
              </button>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
