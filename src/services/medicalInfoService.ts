import { type MedicalInfo, type MedicalCondition } from '../types';

const DISCLAIMER = "⚠️ MEDICAL DISCLAIMER: This information is for educational purposes only and is not medical advice. Always consult a healthcare professional for diagnosis and treatment.";

const LOCAL_CONDITIONS: Record<string, MedicalCondition> = {
    "flu": {
        name: "Influenza (Flu)",
        causes: ["Influenza viruses", "Airborne droplets", "Surface contact"],
        symptoms: ["Fever (100°F+)", "Dry cough", "Sore throat", "Muscle aches", "Fatigue"],
        precautions: ["Annual vaccine", "Frequent handwashing", "Avoiding crowds", "Wearing masks"],
        medications: ["Oseltamivir (Tamiflu)", "Acetaminophen/Paracetamol", "Ibuprofen"],
        homeRemedies: ["Drink plenty of warm fluids", "Bed rest", "Saltwater gargle", "Steam inhalation"]
    },
    "migraine": {
        name: "Migraine",
        causes: ["Genetic factors", "Stress", "Sensory triggers", "Sleep deprivation"],
        symptoms: ["Pulsating headache", "Nausea", "Light sensitivity", "Blurred vision"],
        precautions: ["Sleep schedule", "Stress management", "Identify food triggers", "Stay hydrated"],
        medications: ["Sumatriptan", "Ibuprofen", "Naproxen", "Aspirin"],
        homeRemedies: ["Rest in a dark/quiet room", "Cold compress on forehead", "Peppermint oil", "Ginger tea"]
    },
    "diabetes": {
        name: "Diabetes (Type 2)",
        causes: ["Insulin resistance", "Excess weight", "Physical inactivity", "Genetics"],
        symptoms: ["Excessive thirst", "Frequent urination", "Blurred vision", "Fatigue"],
        precautions: ["Balanced diet", "Daily exercise", "Weight control", "Blood sugar monitoring"],
        medications: ["Metformin", "Sulfonylureas", "Insulin", "SGLT2 inhibitors"],
        homeRemedies: ["Manage carb intake", "Increase fiber", "Stay hydrated", "Regular physical activity"]
    },
    "malaria": {
        name: "Malaria",
        causes: ["Plasmodium falciparum (most deadly) and P. vivax parasites", "Bite of an infected female Anopheles mosquito", "Transfusions or mother-to-child (rare)"],
        symptoms: ["Cyclical high fever (often every 48-72 hours)", "Shaking chills followed by intense heat", "Splenomegaly (enlarged spleen)", "Anemia and Jaundice", "Dry cough and abdominal pain", "Severe headache and muscle aches"],
        precautions: ["Long-lasting insecticidal nets (LLINs)", "Indoor residual spraying (IRS)", "DEET/Picaridin-based repellents", "Antimalarial chemoprophylaxis for travelers", "Clearing stagnant water to prevent breeding"],
        medications: ["Artemether-lumefantrine (Coartem)", "Chloroquine or Quinine sulfate", "Primaquine for liver-stage parasites", "Atovaquone-proguanil (Malarone)"],
        homeRemedies: ["ORS (Oral Rehydration Salts) for fluid loss", "Tepid water sponging to reduce core temperature", "High-carbohydrate, high-protein diet", "Absolute bed rest in a well-ventilated room"],
        diseaseKnowledge: ["Malaria is not contagious; it cannot be spread from person to person.", "The incubation period is typically 10–15 days after the mosquito bite.", "Over 200 million clinical cases occur globally each year.", "P. falciparum accounts for the majority of malaria deaths globally."]
    },
    "hypertension": {
        name: "Hypertension (High Blood Pressure)",
        causes: ["High salt intake", "Age", "Genetics", "Chronic stress"],
        symptoms: ["Often no signs", "Morning headaches", "Nosebleeds", "Vision changes"],
        precautions: ["Reduce sodium", "Regular cardio", "Limit alcohol", "Deep breathing"],
        medications: ["ACE inhibitors", "Beta-blockers", "Diuretics", "Calcium channel blockers"],
        homeRemedies: ["DASH diet", "Low-sodium meals", "Potassium-rich foods", "Daily brisk walk"]
    },
    "ebola": {
        name: "Ebola Virus Disease",
        causes: ["Ebolavirus", "Direct contact with blood/fluids", "Infected animals"],
        symptoms: ["Fever", "Severe headache", "Muscle pain", "Weakness", "Internal bleeding"],
        precautions: ["Avoid contact with fluids", "Sanitization", "Safe burial practices", "Hand hygiene"],
        medications: ["Inmazeb", "Ebanga", "Supportive care (IV fluids)"],
        homeRemedies: ["Strict isolation", "Replacement of electrolytes", "Nutritious recovery diet"]
    },
    "measles": {
        name: "Measles (Rubeola)",
        causes: ["Measles virus", "Airborne droplets", "Coughing/Sneezing"],
        symptoms: ["High fever", "Koplik spots", "Red rash", "Cough", "Runny nose"],
        precautions: ["MMR vaccine", "Isolation", "Hand hygiene", "Quarantine"],
        medications: ["Vitamin A", "Acetaminophen", "Antibiotics (if secondary infection)"],
        homeRemedies: ["Rest in dimmed light", "Humidifier use", "Increased fluid intake"]
    },
    "typhoid": {
        name: "Typhoid Fever",
        causes: ["Salmonella Typhi bacteria", "Contaminated food/water"],
        symptoms: ["Prolonged fever", "Abdominal pain", "Rosy spots on chest", "Constipation/Diarrhea"],
        precautions: ["Typhoid vaccine", "Drink boiled water", "Eat hot/peeled food", "Handwashing"],
        medications: ["Ciprofloxacin", "Azithromycin", "Ceftriaxone"],
        homeRemedies: ["Cold water sponge", "ORS (Electrolytes)", "High-protein diet"],
        diseaseKnowledge: ["Caused by Salmonella Typhi, which only lives in humans.", "Spread through the 'fecal-oral' route via contaminated food.", "Modern antibiotics have made typhoid relatively easy to treat in healthy adults.", "If untreated, it can lead to intestinal perforation or internal bleeding."]
    },
    "hepatitis": {
        name: "Hepatitis B",
        causes: ["HBV virus", "Infected blood", "Sexual contact", "Needle sharing"],
        symptoms: ["Jaundice (yellow skin)", "Dark urine", "Extreme fatigue", "Nausea"],
        precautions: ["Hepatitis B vaccine", "Safe practices", "Don't share razors/needles"],
        medications: ["Tenofovir", "Entecavir", "Interferon injections"],
        homeRemedies: ["Avoid alcohol", "High-carbohydrate diet", "Physical rest"]
    },
    "anemia": {
        name: "Iron Deficiency Anemia",
        causes: ["Lack of iron", "Blood loss", "Pregnancy", "Poor diet"],
        symptoms: ["Pale skin", "Shortness of breath", "Cold hands/feet", "Heart palpitations"],
        precautions: ["Iron-rich diet", "Regular screenings", "Limit tea/coffee with meals"],
        medications: ["Ferrous sulfate", "Iron injections", "B12 supplements"],
        homeRemedies: ["Eat spinach/lentils", "Vitamin C with iron (oranges)", "Cook in cast iron pots"]
    },
    "asthma": {
        name: "Asthma",
        causes: ["Airborne allergens", "Respiratory infections", "Cold air", "Exercise"],
        symptoms: ["Wheezing", "Chest tightness", "Shortness of breath", "Coughing"],
        precautions: ["Avoid triggers", "Air purifiers", "Regular checkups"],
        medications: ["Albuterol (Inhaler)", "Fluticasone", "Montelukast", "Salmeterol"],
        homeRemedies: ["Steam inhalation", "Breathing exercises (Buteyko)", "Avoid cold/dry air"]
    },
    "pneumonia": {
        name: "Pneumonia",
        causes: ["Bacteria (Streptococcus)", "Viruses", "Fungi", "Aspiration"],
        symptoms: ["Chest pain when breathing", "Phlegmy cough", "Fever/Chills", "Confusion (in elderly)"],
        precautions: ["Pneumococcal vaccine", "Flu shot", "No smoking", "Handwashing"],
        medications: ["Antibiotics (Macrolides)", "Azithromycin", "Cough suppressants"],
        homeRemedies: ["Warm peppermint tea", "Garlic tea", "Chest massage", "Hydration"]
    },
    "tuberculosis": {
        name: "Tuberculosis (TB)",
        causes: ["Bacterial infection", "Prolonged close contact"],
        symptoms: ["Cough for 3+ weeks", "Blood in sputum", "Night sweats", "Weight loss"],
        precautions: ["BCG Vaccine", "Well-ventilated rooms", "Covering mouth", "Hand hygiene"],
        medications: ["Isoniazid", "Rifampicin", "Pyrazinamide", "Ethambutol"],
        homeRemedies: ["Nutrient-rich diet", "Garlic and ginger (supportive)", "Avoid smoke/dust"]
    },
    "dengue": {
        name: "Dengue Fever",
        causes: ["Dengue virus", "Day-biting Aedes mosquitoes"],
        symptoms: ["High fever", "Joint/bone pain", "Pain behind eyes", "Skin rash"],
        precautions: ["Mosquito repellent", "Screening windows", "Full-length clothing"],
        medications: ["Acetaminophen (strictly)", "Avoid Ibuprofen/Aspirin", "IV fluids"],
        homeRemedies: ["Papaya leaf extract", "Coconut water", "Stay hydrated", "Bed rest"]
    },
    "alzheimer": {
        name: "Alzheimer's",
        causes: ["Protein plaques in brain", "Aging", "Genetics"],
        symptoms: ["Progressive memory loss", "Wandering", "Confusion", "Language problems"],
        precautions: ["Mental exercises", "Heart-healthy diet", "Physical activity"],
        medications: ["Donepezil", "Memantine", "Rivastigmine"],
        homeRemedies: ["Structured daily routine", "Safe environment", "Memory aids/reminders"]
    },
    "covid": {
        name: "COVID-19",
        causes: ["SARS-CoV-2 virus", "Airborne transmission"],
        symptoms: ["Fever/Chills", "Dry cough", "Shortness of breath", "Loss of taste"],
        precautions: ["Masking", "Social distancing", "Hand sanitation", "Vaccination"],
        medications: ["Paxlovid", "Molnupiravir", "Symptomatic support"],
        homeRemedies: ["Hydration", "Prone breathing techniques", "Warm decoctions (Kadha)", "Gargling"]
    },
    "depression": {
        name: "Clinical Depression",
        causes: ["Chemical imbalance", "Life stress", "Trauma", "Family history"],
        symptoms: ["Low mood", "Sleep issues", "Change in appetite", "Loss of energy"],
        precautions: ["Physical movement", "Social connection", "Regular sleep", "Avoiding alcohol"],
        medications: ["SSRIs (Prozac, Zoloft)", "SNRIs", "Psychotherapy"],
        homeRemedies: ["Morning sunlight", "Yoga/Meditation", "Journaling", "Nutritious diet"]
    },
    "cancer": {
        name: "Cancer",
        causes: ["DNA mutations", "Carcinogens (Tobacco, UV)", "Obesity"],
        symptoms: ["Lumps", "Unexplained weight loss", "Fatigue", "Persistent cough"],
        precautions: ["No tobacco", "Healthy weight", "Sun protection", "Regular screenings"],
        medications: ["Chemotherapy", "Targeted therapy", "Surgery", "Radiation"],
        homeRemedies: ["Ginger for nausea", "Small/frequent meals", "Light stretching", "Support groups"]
    },
    "cholera": {
        name: "Cholera",
        causes: ["Vibrio cholerae bacteria", "Contaminated water/food"],
        symptoms: ["Painless watery diarrhea (Rice water)", "Leg cramps", "Rapid heart rate"],
        precautions: ["Drink safe water", "Wash hands often", "Cook food thoroughly"],
        medications: ["Oral Rehydration (ORS)", "Doxycycline", "Azithromycin"],
        homeRemedies: ["Lemon water", "Probiotics", "Coconut water", "Thin gruel"]
    },
    "zika": {
        name: "Zika Virus",
        causes: ["Zika virus", "Aedes mosquito bites", "Sexual transmission"],
        symptoms: ["Fever", "Rash", "Joint pain", "Conjunctivitis (red eyes)"],
        precautions: ["Mosquito prevention", "Safe practices", "Protective clothing"],
        medications: ["Rest", "Fluids", "Acetaminophen for pain"],
        homeRemedies: ["Eucalyptus oil repellent", "Bed rest", "Hydrating soups"]
    },
    "polio": {
        name: "Poliomyelitis (Polio)",
        causes: ["Poliovirus", "Fecal-oral route", "Contaminated food/water"],
        symptoms: ["Nausea", "Stiffness in back/neck", "Muscle weakness", "Paralysis"],
        precautions: ["Polio vaccine (OPV/IPV)", "Sanitation", "Hygiene"],
        medications: ["Pain relievers", "Physical therapy", "Portable ventilators"],
        homeRemedies: ["Nutritious diet", "Gentle massage", "Bed rest during acute phase"]
    }
};

const extractSection = (text: string, keywords: string[]): string[] => {
    // Advanced heuristic: split by punctuation and filter for keyword density
    const sentences = text.split(/[.!?]+(?=\s|$)/);
    const matches = sentences
        .map(s => s.trim())
        .filter(s => s.length > 5)
        .filter(s => {
            const lowerS = s.toLowerCase();
            return keywords.some(k => lowerS.includes(k.toLowerCase()));
        });

    // Remove duplicates and return top results
    return [...new Set(matches)].slice(0, 5);
};

export const fetchMedicalInfo = async (query: string): Promise<MedicalInfo> => {
    const normalizedQuery = query.toLowerCase();

    // 1. Check local data
    let conditionData: MedicalCondition | undefined;
    for (const [key, data] of Object.entries(LOCAL_CONDITIONS)) {
        if (normalizedQuery.includes(key) || key.includes(normalizedQuery)) {
            conditionData = data;
            break;
        }
    }

    // 2. Fetch from Wikipedia
    let summary = "";
    let title = query;
    let imageUrl: string | undefined;

    try {
        const wikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`);
        if (wikiRes.status === 404) {
            // Try a search if direct summary fails
            const searchRes = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`);
            const searchData = await searchRes.json();
            if (searchData.query?.search?.[0]) {
                const newQuery = searchData.query.search[0].title;
                const newWikiRes = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(newQuery)}`);
                if (newWikiRes.ok) {
                    const data = await newWikiRes.json();
                    summary = data.extract;
                    title = data.title;
                    imageUrl = data.thumbnail?.original || data.thumbnail?.source;
                }
            }
        } else if (wikiRes.ok) {
            const data = await wikiRes.json();
            summary = data.extract;
            title = data.title;
            imageUrl = data.thumbnail?.original || data.thumbnail?.source;
        }
    } catch (error) {
        console.error("Failed to fetch from Wikipedia:", error);
    }

    if (!summary && !conditionData) {
        return {
            title: title,
            summary: "I'm searching my global records, but I couldn't find a detailed match. Please try a common disease name.",
            disclaimer: DISCLAIMER
        };
    }

    // 3. Heuristic extraction
    const symptoms = conditionData?.symptoms || extractSection(summary, ["symptom", "sign", "manifestation", "feel", "characterized by", "including"]);
    const precautions = conditionData?.precautions || extractSection(summary, ["prevent", "avoid", "precaution", "risk", "lifestyle", "control", "reduction"]);
    const medications = conditionData?.medications || extractSection(summary, ["medication", "treatment", "drug", "therapy", "prescribe", "management", "remedy"]);
    const remedies = conditionData?.homeRemedies || extractSection(summary, ["remedy", "home", "natural", "supportive", "water", "rest", "diet", "herbal"]);
    const causes = conditionData?.causes || extractSection(summary, ["cause", "due to", "result of", "origin", "linked to", "etiology"]);
    const knowledge = conditionData?.diseaseKnowledge || extractSection(summary, ["known as", "history", "discovered", "global", "impact", "research", "scientific", "study"]);

    return {
        title: conditionData ? conditionData.name : title,
        summary: summary || "Fetching global overview...",
        imageUrl: imageUrl,
        causes: causes.length > 0 ? causes : undefined,
        symptoms: symptoms.length > 0 ? symptoms : undefined,
        precautions: precautions.length > 0 ? precautions : undefined,
        medications: medications.length > 0 ? medications : undefined,
        homeRemedies: remedies.length > 0 ? remedies : undefined,
        diseaseKnowledge: knowledge.length > 0 ? knowledge : undefined,
        disclaimer: DISCLAIMER
    };
};
