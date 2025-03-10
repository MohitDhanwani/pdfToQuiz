
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RefreshCw, FileText, RotateCw } from "lucide-react";
import { Flashcard } from "@/lib/schemas";

type FlashcardsProps = {
  flashcards: Flashcard[];
  clearPDF: () => void;
  title: string;
};

const FlashcardCard: React.FC<{
  flashcard: Flashcard;
  isFlipped: boolean;
  onFlip: () => void;
}> = ({ flashcard, isFlipped, onFlip }) => {
  return (
    <div 
      className="h-[300px] w-full cursor-pointer" 
      onClick={onFlip}
    >
      <motion.div
        className="w-full h-full relative"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div 
          className={`absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-8 rounded-lg border-2 border-primary/20 bg-card text-card-foreground shadow-lg`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <h3 className="text-xl font-medium text-center">{flashcard.front}</h3>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-6"
            onClick={(e) => {
              e.stopPropagation();
              onFlip();
            }}
          >
            <RotateCw className="mr-2 h-4 w-4" /> Flip to see answer
          </Button>
        </div>

        {/* Back of card */}
        <div 
          className={`absolute w-full h-full backface-hidden flex flex-col justify-center items-center p-8 rounded-lg border-2 border-primary/20 bg-primary/5 text-card-foreground shadow-lg`}
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)"
          }}
        >
          <p className="text-lg text-center">{flashcard.back}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            className="mt-6"
            onClick={(e) => {
              e.stopPropagation();
              onFlip();
            }}
          >
            <RotateCw className="mr-2 h-4 w-4" /> Flip to question
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default function Flashcards({
  flashcards,
  clearPDF,
  title = "Flashcards",
}: FlashcardsProps) {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((currentCardIndex / flashcards.length) * 100);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentCardIndex, flashcards.length]);

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
      }, 100);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
      }, 100);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setIsFlipped(false);
    setCurrentCardIndex(0);
    setProgress(0);
  };

  const currentFlashcard = flashcards[currentCardIndex];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-foreground">
          {title}
        </h1>
        <div className="relative">
          <Progress value={progress} className="h-1 mb-8" />
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentCardIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="space-y-8">
                  <FlashcardCard
                    flashcard={currentFlashcard}
                    isFlipped={isFlipped}
                    onFlip={handleFlip}
                  />
                  <div className="flex justify-between items-center pt-4">
                    <Button
                      onClick={handlePreviousCard}
                      disabled={currentCardIndex === 0}
                      variant="ghost"
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                    </Button>
                    <span className="text-sm font-medium">
                      {currentCardIndex + 1} / {flashcards.length}
                    </span>
                    <Button
                      onClick={handleNextCard}
                      disabled={currentCardIndex === flashcards.length - 1}
                      variant="ghost"
                    >
                      Next <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center space-x-4 pt-8 mt-8 border-t">
            <Button
              onClick={handleReset}
              variant="outline"
              className="bg-muted hover:bg-muted/80 w-full"
            >
              <RefreshCw className="mr-2 h-4 w-4" /> Start Over
            </Button>
            <Button
              onClick={clearPDF}
              className="bg-primary hover:bg-primary/90 w-full"
            >
              <FileText className="mr-2 h-4 w-4" /> Try Another PDF
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}