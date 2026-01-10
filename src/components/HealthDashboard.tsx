import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Moon, Scale, PlusCircle } from 'lucide-react';
import { saveMetric, getAllMetrics } from '../services/healthTrackingService';
import { generateHealthPlan, type HealthPlan } from '../services/healthPlanService';
import { type MetricType } from '../types';

export const HealthDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'overview' | 'log' | 'plan'>('overview');
    const [metrics, setMetrics] = useState(getAllMetrics());
    const [plan, setPlan] = useState<HealthPlan | null>(null);

    // Form states
    const [weightInput, setWeightInput] = useState('');
    const [sleepInput, setSleepInput] = useState('');
    const [stepsInput, setStepsInput] = useState('');
    const [selectedGoal, setSelectedGoal] = useState('Maintenance');

    useEffect(() => {
        setMetrics(getAllMetrics());
    }, [activeTab]);

    const handleLog = (type: MetricType, value: string, unit: string) => {
        if (!value) return;
        saveMetric(type, parseFloat(value), unit);
        setWeightInput('');
        setSleepInput('');
        setStepsInput('');
        setMetrics(getAllMetrics());
        alert(`${type} logged!`);
    };

    const handleGeneratePlan = () => {
        const newPlan = generateHealthPlan(selectedGoal);
        setPlan(newPlan);
    };

    return (
        <div className="dashboard-container glass">
            <div className="dashboard-header">
                <h2>My Health Dashboard</h2>
                <div className="tabs">
                    <button
                        className={activeTab === 'overview' ? 'active' : ''}
                        onClick={() => setActiveTab('overview')}
                    >Overview</button>
                    <button
                        className={activeTab === 'log' ? 'active' : ''}
                        onClick={() => setActiveTab('log')}
                    >Log Data</button>
                    <button
                        className={activeTab === 'plan' ? 'active' : ''}
                        onClick={() => setActiveTab('plan')}
                    >My Plan</button>
                </div>
            </div>

            <div className="dashboard-content">
                {activeTab === 'overview' && (
                    <div className="overview-grid">
                        <motion.div className="metric-card" whileHover={{ scale: 1.02 }}>
                            <div className="card-icon weight"><Scale size={24} /></div>
                            <h3>Weight</h3>
                            <p className="value">
                                {metrics.weight.length > 0
                                    ? `${metrics.weight[metrics.weight.length - 1].value} kg`
                                    : '-- kg'}
                            </p>
                            <small>Last update: {metrics.weight.length > 0 ? new Date(metrics.weight[metrics.weight.length - 1].date).toLocaleDateString() : 'Never'}</small>
                        </motion.div>

                        <motion.div className="metric-card" whileHover={{ scale: 1.02 }}>
                            <div className="card-icon sleep"><Moon size={24} /></div>
                            <h3>Sleep</h3>
                            <p className="value">
                                {metrics.sleep.length > 0
                                    ? `${metrics.sleep[metrics.sleep.length - 1].value} hrs`
                                    : '-- hrs'}
                            </p>
                            <small>Last night</small>
                        </motion.div>

                        <motion.div className="metric-card" whileHover={{ scale: 1.02 }}>
                            <div className="card-icon steps"><Activity size={24} /></div>
                            <h3>Steps</h3>
                            <p className="value">
                                {metrics.steps.length > 0
                                    ? metrics.steps[metrics.steps.length - 1].value.toLocaleString()
                                    : '--'}
                            </p>
                            <small>Most recent</small>
                        </motion.div>
                    </div>
                )}

                {activeTab === 'log' && (
                    <div className="log-forms">
                        <div className="form-group">
                            <label><Scale size={16} /> Update Weight (kg)</label>
                            <div className="input-row">
                                <input type="number" value={weightInput} onChange={e => setWeightInput(e.target.value)} placeholder="e.g. 70" />
                                <button onClick={() => handleLog('weight', weightInput, 'kg')}><PlusCircle size={20} /></button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label><Moon size={16} /> Log Sleep (hours)</label>
                            <div className="input-row">
                                <input type="number" value={sleepInput} onChange={e => setSleepInput(e.target.value)} placeholder="e.g. 7.5" />
                                <button onClick={() => handleLog('sleep', sleepInput, 'hrs')}><PlusCircle size={20} /></button>
                            </div>
                        </div>
                        <div className="form-group">
                            <label><Activity size={16} /> Log Steps</label>
                            <div className="input-row">
                                <input type="number" value={stepsInput} onChange={e => setStepsInput(e.target.value)} placeholder="e.g. 5000" />
                                <button onClick={() => handleLog('steps', stepsInput, 'steps')}><PlusCircle size={20} /></button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'plan' && (
                    <div className="plan-section">
                        {!plan ? (
                            <div className="create-plan">
                                <h3>Create Your Plan</h3>
                                <p>Select a goal to generate a personalized routine.</p>
                                <select value={selectedGoal} onChange={e => setSelectedGoal(e.target.value)}>
                                    <option value="Maintenance">Maintenance</option>
                                    <option value="Weight Loss">Weight Loss</option>
                                    <option value="Muscle Gain">Muscle Gain</option>
                                </select>
                                <button className="generate-btn" onClick={handleGeneratePlan}>Generate Plan</button>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="active-plan">
                                <div className="plan-header">
                                    <h3>Target: {plan.goal}</h3>
                                    <span className="calories-badge">{plan.calories} kcal/day</span>
                                </div>
                                <p className="plan-tip">{plan.tip}</p>

                                <div className="daily-schedule">
                                    <h4>Sample Daily Routine</h4>
                                    <ul>
                                        <li><strong>Breakfast:</strong> {plan.schedule[0].breakfast}</li>
                                        <li><strong>Lunch:</strong> {plan.schedule[0].lunch}</li>
                                        <li><strong>Snack:</strong> {plan.schedule[0].snack}</li>
                                        <li><strong>Dinner:</strong> {plan.schedule[0].dinner}</li>
                                        <li className="workout-item"><strong>Workout:</strong> {plan.schedule[0].workout}</li>
                                    </ul>
                                </div>

                                <button className="reset-btn" onClick={() => setPlan(null)}>Change Goal</button>
                            </motion.div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
