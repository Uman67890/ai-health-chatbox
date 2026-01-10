import { type HealthMetric, type MetricType } from '../types';

const STORAGE_KEY = 'wellness_ai_data';

interface StorageData {
    metrics: Record<MetricType, HealthMetric[]>;
    userProfile?: {
        goal?: string;
    };
}

const getStorageData = (): StorageData => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        return {
            metrics: {
                weight: [],
                sleep: [],
                steps: []
            }
        };
    }
    return JSON.parse(data, (key, value) => {
        if (key === 'date') return new Date(value);
        return value;
    });
};

const saveStorageData = (data: StorageData) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const saveMetric = (type: MetricType, value: number, unit: string) => {
    const data = getStorageData();
    const newMetric: HealthMetric = {
        id: Date.now().toString(),
        type,
        value,
        unit,
        date: new Date()
    };

    if (!data.metrics[type]) {
        data.metrics[type] = [];
    }

    data.metrics[type].push(newMetric);
    saveStorageData(data);
    return newMetric;
};

export const getHistory = (type: MetricType): HealthMetric[] => {
    const data = getStorageData();
    return data.metrics[type] || [];
};

export const getAllMetrics = () => {
    const data = getStorageData();
    return data.metrics;
};

export const saveUserGoal = (goal: string) => {
    const data = getStorageData();
    data.userProfile = { ...data.userProfile, goal };
    saveStorageData(data);
};

export const getUserGoal = (): string | undefined => {
    const data = getStorageData();
    return data.userProfile?.goal;
};
