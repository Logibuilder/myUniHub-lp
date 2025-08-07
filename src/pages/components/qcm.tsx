"use client";

import { useState } from 'react';
import { BookOpen, CheckCircle, XCircle } from 'lucide-react';

interface QCMQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QCMResponse {
  title: string;
  questions: QCMQuestion[];
}

interface UserAnswers {
  [questionIndex: number]: number;
}

export default function Qcm() {
  const [courseNotes, setCourseNotes] = useState('');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);
  const [qcmData, setQcmData] = useState<QCMResponse | null>(null);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateQCM = async () => {
    if (!courseNotes.trim()) {
      setError('Veuillez saisir vos notes de cours');
      return;
    }

    setLoading(true);
    setError('');
    setQcmData(null);
    setUserAnswers({});
    setShowResults(false);

    try {
      const response = await fetch('/api/generate-qcm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseNotes,
          numberOfQuestions,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de la génération du QCM');
      }

      const data: QCMResponse = await response.json();
      setQcmData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex: number, answerIndex: number) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const submitQCM = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (!qcmData) return 0;
    let correct = 0;
    qcmData.questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / qcmData.questions.length) * 100);
  };

  const exampleNotes = `Les réseaux informatiques

1. Définitions de base
- Un réseau informatique est un ensemble d'équipements interconnectés qui peuvent communiquer entre eux
- Les protocoles définissent les règles de communication
- Les topologies décrivent l'organisation physique ou logique des connexions

2. Modèle OSI
- 7 couches : Physique, Liaison, Réseau, Transport, Session, Présentation, Application
- Chaque couche a un rôle spécifique
- Encapsulation : ajout d'en-têtes à chaque couche

3. Protocoles principaux
- TCP/IP : protocole de transport fiable
- UDP : protocole de transport non fiable mais rapide
- HTTP/HTTPS : protocoles d'application pour le web
- DNS : résolution de noms de domaine

4. Adressage IP
- IPv4 : adresses sur 32 bits
- IPv6 : adresses sur 128 bits
- Classes d'adresses et sous-réseaux
- NAT : translation d'adresses réseau`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <BookOpen className="h-8 w-8 text-blue-600" />
          Générateur de QCM
        </h1>
        <p className="text-gray-600">
          Transformez vos notes de cours en questionnaire à choix multiples pour tester vos connaissances
        </p>
      </div>

      {!qcmData && (
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-8">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Saisir les notes de cours</h2>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Notes de cours
              </label>
              <textarea
                id="notes"
                placeholder="Collez ici vos notes de cours..."
                value={courseNotes}
                onChange={(e) => setCourseNotes(e.target.value)}
                className="w-full min-h-[200px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
              />
            </div>
            
            <div>
              <label htmlFor="questions" className="block text-sm font-medium text-gray-700 mb-2">
                Nombre de questions
              </label>
              <select
                id="questions"
                value={numberOfQuestions}
                onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={3}>3 questions</option>
                <option value={5}>5 questions</option>
                <option value={7}>7 questions</option>
                <option value={10}>10 questions</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={generateQCM} 
                disabled={loading}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    Génération en cours...
                  </>
                ) : (
                  'Générer le QCM'
                )}
              </button>
              <button 
                onClick={() => setCourseNotes(exampleNotes)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Exemple
              </button>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-md">
                {error}
              </div>
            )}
          </div>
        </div>
      )}

      {qcmData && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{qcmData.title}</h2>
            <div className="flex gap-2">
              {showResults && (
                <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-lg font-medium">
                  Score: {calculateScore()}%
                </span>
              )}
              <button 
                onClick={() => {
                  setQcmData(null);
                  setUserAnswers({});
                  setShowResults(false);
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Nouveau QCM
              </button>
            </div>
          </div>

          {qcmData.questions.map((question, questionIndex) => (
            <div key={questionIndex} className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold mb-2">
                  Question {questionIndex + 1}
                </h3>
                <p className="text-base text-gray-800">{question.question}</p>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = userAnswers[questionIndex] === optionIndex;
                    const isCorrect = optionIndex === question.correctAnswer;
                    const showCorrection = showResults;

                    return (
                      <label 
                        key={optionIndex} 
                        className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer transition-colors ${
                          showCorrection 
                            ? isCorrect 
                              ? 'bg-green-50 border border-green-200' 
                              : isSelected 
                                ? 'bg-red-50 border border-red-200' 
                                : 'border border-gray-200'
                            : 'hover:bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${questionIndex}`}
                          value={optionIndex}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                          disabled={showResults}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="flex-1">{option}</span>
                        {showCorrection && (
                          <span>
                            {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                            {!isCorrect && isSelected && <XCircle className="h-5 w-5 text-red-600" />}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>

                {showResults && (
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
                    <h4 className="font-semibold text-blue-900 mb-2">Explication :</h4>
                    <p className="text-blue-800">{question.explanation}</p>
                  </div>
                )}
              </div>
            </div>
          ))}

          {!showResults && (
            <div className="flex justify-center">
              <button 
                onClick={submitQCM}
                disabled={Object.keys(userAnswers).length !== qcmData.questions.length}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-lg font-medium"
              >
                Soumettre les réponses
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}