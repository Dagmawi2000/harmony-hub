'use client';
import { useState } from 'react';

export default function DailyExercise() {
  const [step, setStep] = useState(0);
  
  const exercises = [
    {
      title: "Breathing Exercise",
      instructions: "Take a deep breath in for 4 counts, hold for 4, exhale for 4.",
      duration: 60
    },
    {
      title: "Gratitude Reflection",
      instructions: "Think of three things you're grateful for today.",
      duration: 120
    },
    {
      title: "Mindful Moment",
      instructions: "Focus on the present moment. What do you see, hear, and feel?",
      duration: 60
    }
  ];

  const currentExercise = exercises[step];

  const nextStep = () => {
    if (step < exercises.length - 1) {
      setStep(step + 1);
    } else {
      setStep(0);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-medium text-gray-900 mb-4">
        {currentExercise.title}
      </h3>
      <p className="text-gray-600 mb-6">
        {currentExercise.instructions}
      </p>
      <div className="text-center">
        <button
          onClick={nextStep}
          className="btn-primary"
        >
          {step < exercises.length - 1 ? 'Next Exercise' : 'Complete'}
        </button>
      </div>
    </div>
  );
}