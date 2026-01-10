import { useState, useCallback } from 'react';
import { type Message, WELLNESS_ADVICE, DEFAULT_RESPONSE, EMERGENCY_KEYWORDS, EMERGENCY_MESSAGE } from './types';
import { fetchMedicalInfo } from './services/medicalInfoService';

const DISEASE_DIRECTORY = {
    title: "Global Disease Directory",
    description: "I have access to a global medical database. Here is a categorized overview of major health conditions you can explore:",
    categories: [
        {
            name: "Infectious Diseases",
            diseases: ["COVID-19", "Influenza", "Tuberculosis", "Malaria", "Dengue", "Cholera", "Typhoid", "Measles", "Ebola", "Zika"]
        },
        {
            name: "Chronic & Metabolic",
            diseases: ["Diabetes", "Hypertension", "Heart Disease", "Stroke", "Asthma", "COPD", "Obesity"]
        },
        {
            name: "Neurological & Mental",
            diseases: ["Alzheimer's", "Parkinson's", "Migraine", "Epilepsy", "Depression", "Anxiety", "Bipolar Disorder"]
        },
        {
            name: "Other Major Categories",
            diseases: ["Cancer", "Leukemia", "Lupus", "Arthritis", "Anemia", "Pneumonia", "Polio"]
        }
    ]
};

export const useHealthAI = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hello! I'm your Google-powered Health Assistant. I can provide detailed medical reports (Symptoms, Medication, Precautions) for almost any disease in the world. Just name a condition or describe your symptoms!",
            type: 'bot',
            timestamp: new Date(),
        },
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const generateLocalResponse = useCallback((input: string): string | null => {
        const lowerInput = input.toLowerCase();

        // Check for general "all diseases" request
        if (lowerInput.includes('all disease') || lowerInput.includes('list of disease') || lowerInput.includes('every disease')) {
            return "DIRECTORY_TRIGGER"; // Special internal trigger
        }

        // Check for emergencies first
        if (EMERGENCY_KEYWORDS.some(keyword => lowerInput.includes(keyword))) {
            return EMERGENCY_MESSAGE;
        }

        // Check for specific wellness requests
        if (lowerInput.includes('diet') || lowerInput.includes('food')) return WELLNESS_ADVICE[0];
        if (lowerInput.includes('sleep')) return WELLNESS_ADVICE[1];
        if (lowerInput.includes('hydrat') || lowerInput.includes('water')) return WELLNESS_ADVICE[2];
        if (lowerInput.includes('stress') || lowerInput.includes('mindful')) return WELLNESS_ADVICE[3];
        if (lowerInput.includes('check-up') || lowerInput.includes('screening')) return WELLNESS_ADVICE[5];

        // Check for general wellness/advice requests
        if (lowerInput.includes('wellness') || lowerInput.includes('advice') || lowerInput.includes('tip')) {
            return WELLNESS_ADVICE[Math.floor(Math.random() * WELLNESS_ADVICE.length)];
        }

        if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            return "Hello! I can provide info about symptoms, diseases, medications, or wellness tips. What would you like to know?";
        }

        return null;
    }, []);

    const sendMessage = useCallback(async (text: string) => {
        if (!text.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text,
            type: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setIsTyping(true);

        try {
            // 1. Try local response first (fast)
            const localResponse = generateLocalResponse(text);

            if (localResponse) {
                // Delay for realism
                await new Promise(resolve => setTimeout(resolve, 800));

                if (localResponse === "DIRECTORY_TRIGGER") {
                    const botMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: "I've organized my medical database into a few key categories for you:",
                        type: 'bot',
                        timestamp: new Date(),
                        diseaseDirectory: DISEASE_DIRECTORY
                    };
                    setMessages(prev => [...prev, botMessage]);
                } else {
                    const botMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: localResponse,
                        type: 'bot',
                        timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, botMessage]);
                }
            } else {
                // 2. Treat almost all other queries as medical and fetch rich cards
                const data = await fetchMedicalInfo(text);

                // If we got some useful info (either from Local Conditions or Wikipedia)
                if (data.summary && data.summary !== "Fetching global health overview..." && !data.summary.includes("couldn't find a detailed match")) {
                    const botMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: `Here is the clinical overview for ${data.title}:`,
                        type: 'bot',
                        timestamp: new Date(),
                        medicalData: data
                    };
                    setMessages(prev => [...prev, botMessage]);
                } else {
                    // Default fallback for general conversation
                    const botMessage: Message = {
                        id: (Date.now() + 1).toString(),
                        text: DEFAULT_RESPONSE,
                        type: 'bot',
                        timestamp: new Date(),
                    };
                    setMessages(prev => [...prev, botMessage]);
                }
            }
        } catch (error) {
            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: "I'm having trouble connecting to my medical database. " + DEFAULT_RESPONSE,
                type: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, botMessage]);
        } finally {
            setIsTyping(false);
        }
    }, [generateLocalResponse]);

    const getHealthInsights = useCallback(async (query: string) => {
        setIsTyping(true);
        try {
            const data = await fetchMedicalInfo(query);
            const botMessage: Message = {
                id: Date.now().toString(),
                text: '', // Text is empty as we render a card
                type: 'bot',
                timestamp: new Date(),
                medicalData: data
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            const errorMessage: Message = {
                id: Date.now().toString(),
                text: "Sorry, I couldn't fetch that information right now.",
                type: 'bot',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    }, []);

    return { messages, sendMessage, isTyping, getHealthInsights };
};
