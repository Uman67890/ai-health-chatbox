export type MessageType = 'user' | 'bot';

export interface DiseaseCategory {
  name: string;
  diseases: string[];
}

export interface DiseaseDirectory {
  title: string;
  description: string;
  categories: DiseaseCategory[];
}

export interface Message {
  id: string;
  text: string;
  type: MessageType;
  timestamp: Date;
  medicalData?: MedicalInfo;
  diseaseDirectory?: DiseaseDirectory;
}

export const WELLNESS_ADVICE = [
  "Eat a Balanced Diet: Incorporate a variety of fruits, vegetables, whole grains, and lean proteins into your meals.",
  "Prioritize Quality Sleep: Aim for 7-9 hours of quality sleep each night to support mental and physical health.",
  "Stay Hydrated: Drink plenty of water throughout the day to maintain hydration and support bodily functions.",
  "Manage Stress: Practice mindfulness, meditation, or yoga to reduce stress and improve mental well-being.",
  "Limit Processed Foods: Reduce intake of processed and sugary foods to maintain a healthy weight and energy levels.",
  "Routine Medical Check-ups: Schedule regular health screenings and check-ups to catch potential health issues early.",
  "Build Strong Relationships: Foster social connections and support networks to enhance emotional health.",
  "Practice Gratitude: Keep a gratitude journal to focus on positive aspects of life and improve mental health.",
  "Limit Screen Time: Reduce time spent on screens to improve sleep quality and mental well-being.",
  "Get Moving: Engage in regular physical activity to boost your mood and energy levels."
];

export interface MedicalCondition {
  name: string;
  causes: string[];
  symptoms: string[];
  precautions: string[];
  medications: string[];
  homeRemedies: string[];
  diseaseKnowledge?: string[];
}

export interface MedicalInfo {
  title: string;
  summary: string;
  imageUrl?: string;
  causes?: string[];
  symptoms?: string[];
  precautions?: string[];
  medications?: string[];
  homeRemedies?: string[];
  diseaseKnowledge?: string[];
  disclaimer: string;
}

export type MetricType = 'weight' | 'sleep' | 'steps';

export interface HealthMetric {
  id: string;
  type: MetricType;
  value: number;
  date: Date;
  unit: string;
}

export const SYMPTOM_RESPONSES: Record<string, string> = {
  "headache": "For a mild headache, rest in a quiet room and stay hydrated. If it's severe or persistent, please consult a doctor.",
  "fever": "A fever often indicates your body is fighting an infection. Rest and drink fluids. If it exceeds 103°F (39.4°C), seek medical attention.",
  "cough": "Common coughs can be relieved with honey or warm fluids. If you have chest pain or difficulty breathing, contact emergency services.",
  "sore throat": "Gargling with warm salt water can help. Stay hydrated and rest your voice.",
  "tired": "Fatigue can be caused by stress, poor sleep, or diet. Try consistent sleep patterns, but see a professional if it persists.",
  "fatigue": "Persistent fatigue may be linked to anemia, sleep disorders, or stress. Ensure you're getting 7-9 hours of sleep and adequate nutrition.",
  "nausea": "Nausea can be caused by various factors like motion sickness, indigestion, or infection. Sip clear fluids and eat bland foods like crackers.",
  "dizziness": "Dizziness can result from dehydration, low blood sugar, or inner ear issues. Sit or lie down immediately. If it persists, see a doctor.",
  "insomnia": "Difficulty sleeping can be improved by limiting screen time before bed, maintaining a regular schedule, and avoiding caffeine late in the day.",
};

export const DISEASE_INFO: Record<string, string> = {
  "diabetes": "Diabetes is a chronic condition that affects how your body turns food into energy. It requires careful management of blood sugar through diet, exercise, and sometimes medication. Please consult an endocrinologist for a personalized plan.",
  "hypertension": "Hypertension (high blood pressure) is when the force of your blood against artery walls is too high. It often has no symptoms but increases risk for heart disease. Lifestyle changes and medication can manage it.",
  "flu": "The flu is a viral infection that attacks your respiratory system. Rest, fluids, and over-the-counter pain relievers usually help. If symptoms are severe, see a doctor within 48 hours for potential antiviral meds.",
  "asthma": "Asthma is a condition where your airways narrow and swell, producing extra mucus. It can make breathing difficult and trigger coughing or wheezing. It is typically managed with rescue and maintenance inhalers.",
  "cold": "The common cold is a viral infection of your nose and throat. It's usually harmless, though it may not feel that way. Rest and fluids are key; most people recover in 7-10 days.",
  "malaria": "Malaria is a life-threatening disease caused by parasites that are transmitted to people through the bites of infected female Anopheles mosquitoes. It is preventable and curable.",
  "tuberculosis": "Tuberculosis (TB) is an infectious disease usually caused by Mycobacterium tuberculosis bacteria. It generally affects the lungs, but can also affect other parts of the body.",
  "cancer": "Cancer refers to any one of a large number of diseases characterized by the development of abnormal cells that divide uncontrollably and have the ability to infiltrate and destroy normal body tissue.",
  "cholera": "Cholera is an acute diarrheal infection caused by ingestion of food or water contaminated with the bacterium Vibrio cholerae. It remains a global threat to public health.",
  "heart disease": "Heart disease describes a range of conditions that affect your heart. Diseases under the heart disease umbrella include blood vessel diseases, such as coronary artery disease; heart rhythm problems (arrhythmias); and heart defects you're born with (congenital heart defects), among others.",
};

export const MEDICATION_INFO: Record<string, string> = {
  "ibuprofen": "Ibuprofen is a Non-Steroidal Anti-Inflammatory Drug (NSAID) used to treat pain, fever, and inflammation. Take with food to avoid stomach upset. Do not exceed recommended doses.",
  "paracetamol": "Paracetamol (Acetaminophen) is used to treat pain and fever. It is generally gentle on the stomach but can cause liver damage if taken in excess. Never exceed 4g in 24 hours.",
  "aspirin": "Aspirin is used to reduce pain, fever, or inflammation. It is also sometimes used as a blood thinner. Not recommended for children under 16 due to Reye's syndrome risk.",
  "antihistamine": "Antihistamines are used to relieve allergy symptoms like sneezing or itching. Some can cause drowsiness. Check the label if you need to drive or operate machinery.",
  "antibiotics": "Antibiotics treat bacterial infections, not viruses (like colds/flu). Always finish the entire prescribed course even if you feel better, to prevent antibiotic resistance.",
  "insulin": "Insulin is a hormone made by the pancreas that allows your body to use sugar (glucose) from carbohydrates in the food that you eat for energy or to store glucose for future use.",
  "metformin": "Metformin is a medication used to treat type 2 diabetes and sometimes used to prevent the condition in those at high risk. It works by improving the way your body handles insulin.",
};

export const DEFAULT_RESPONSE = "I'm here to help with wellness tips, common symptoms, disease information, or medication basics. Can you tell me more about what's on your mind?";

export const EMERGENCY_KEYWORDS = ["chest pain", "can't breathe", "unconscious", "stroke", "severe bleeding", "heart attack", "seizure"];

export const EMERGENCY_MESSAGE = "🚨 IMPORTANT: If you are experiencing a medical emergency, please call your local emergency services (like 911) immediately.";

