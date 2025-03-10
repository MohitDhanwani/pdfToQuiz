import React, { useState } from "react";
import { ShortAnswerQuestion } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ShortAnswerQuizProps {
  title: string;
  questions: ShortAnswerQuestion[];
  clearPDF: () => void;
}

export default function ShortAnswerQuiz({ title, questions, clearPDF }: ShortAnswerQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>(Array(questions.length).fill(""));
  const [scores, setScores] = useState<number[]>(Array(questions.length).fill(0));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [totalScore, setTotalScore] = useState(0);

  const handleNextQuestion = () => currentQuestion < questions.length - 1 && setCurrentQuestion(currentQuestion + 1);
  const handlePrevQuestion = () => currentQuestion > 0 && setCurrentQuestion(currentQuestion - 1);

  const handleAnswerChange = (answer: string) => {
    if (isSubmitted) return;
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answer;
    setUserAnswers(newAnswers);
  };

  const calculateScore = (userAnswer: string, correctAnswer: string): number => {
    if (!userAnswer.trim()) return 0;
    const userWords = userAnswer.toLowerCase().split(/\s+/);
    const correctWords = correctAnswer.toLowerCase().split(/\s+/);

    const matchCount = correctWords.filter(word => userWords.includes(word)).length;
    return Math.round((matchCount / correctWords.length) * 100);
  };

  const handleSubmitQuiz = () => {
    const newScores = questions.map((question, index) => calculateScore(userAnswers[index], question.answer));
    const finalScore = Math.round(newScores.reduce((acc, curr) => acc + curr, 0) / questions.length);

    setScores(newScores);
    setTotalScore(finalScore);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-8 px-4">
      <div className="w-full max-w-3xl">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          {!isSubmitted && (
            <Button onClick={handleSubmitQuiz} disabled={userAnswers.some(answer => !answer.trim())}>
              Submit Quiz
            </Button>
          )}
        </div>

        {isSubmitted && (
          <div className="mb-4 text-center text-lg font-bold">
            Final Score: {totalScore}%
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              Question {currentQuestion + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{questions[currentQuestion].question}</div>
            <textarea
              className="w-full mt-2 p-2 border rounded"
              value={userAnswers[currentQuestion]}
              onChange={(e) => handleAnswerChange(e.target.value)}
              disabled={isSubmitted}
            />
            {isSubmitted && (
              <div className="mt-2 text-sm text-green-600">
                Correct Answer: {questions[currentQuestion].answer}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick={handlePrevQuestion} disabled={currentQuestion === 0}>Previous</Button>
            <Button onClick={handleNextQuestion} disabled={currentQuestion === questions.length - 1}>Next</Button>
          </CardFooter>
        </Card>

        <div className="mt-4 flex justify-center">
          <Button variant="outline" onClick={clearPDF}>Start Over</Button>
        </div>
      </div>
    </div>
  );
}
