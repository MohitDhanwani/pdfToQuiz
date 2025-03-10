import React from 'react';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ModalProps {
  onSelectType: (type: string) => void;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onSelectType, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl w-full max-w-md p-6 relative">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 dark:text-gray-400">
          <X size={20} />
        </button>

        <h3 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">Select Generation Type</h3>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            <Button onClick={() => onSelectType('Quiz')} className="w-full text-lg">Quiz</Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Generate quizzes with multiple-choice or short-answer questions for quick assessments.</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            <Button onClick={() => onSelectType('Flash Card')} variant="outline" className="w-full text-lg">Flash Card</Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Create flashcards to enhance memory retention and revision.</p>
          </div>

          <div className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800">
            <Button onClick={() => onSelectType('Short/Long Answer')} variant="outline" className="w-full text-lg">Short / Long Answers</Button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Generate prompts for detailed responses or essays based on the content.</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-gray-400 mt-6 text-center">
          Choose the type of content you want to generate from your PDF.
        </p>
      </div>
    </div>
  );
};

export default Modal;
