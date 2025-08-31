import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft, AlertTriangle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  options: { value: string; label: string; severity: number }[];
}

interface QuestionnaireProps {
  category: string;
  onComplete: (severity: "mild" | "moderate" | "severe") => void;
  onBack: () => void;
}

const questionsByCategory: Record<string, Question[]> = {
  menstrual: [
    {
      id: "pain_level",
      question: "How would you describe your menstrual pain?",
      options: [
        { value: "none", label: "No pain or very mild discomfort", severity: 0 },
        { value: "manageable", label: "Manageable pain, can continue daily activities", severity: 1 },
        { value: "interfering", label: "Pain interferes with daily activities", severity: 2 },
        { value: "severe", label: "Severe pain, unable to function normally", severity: 3 }
      ]
    },
    {
      id: "flow_pattern",
      question: "How heavy is your menstrual flow?",
      options: [
        { value: "light", label: "Light flow (changing pad/tampon every 4-6 hours)", severity: 0 },
        { value: "normal", label: "Normal flow (changing every 3-4 hours)", severity: 1 },
        { value: "heavy", label: "Heavy flow (changing every 1-2 hours)", severity: 2 },
        { value: "flooding", label: "Very heavy with clots, soaking through quickly", severity: 3 }
      ]
    },
    {
      id: "cycle_changes",
      question: "Have you noticed changes in your menstrual cycle?",
      options: [
        { value: "regular", label: "Regular cycle, no significant changes", severity: 0 },
        { value: "slight", label: "Slight changes in timing or flow", severity: 1 },
        { value: "irregular", label: "Very irregular cycles or missed periods", severity: 2 },
        { value: "stopped", label: "Periods stopped suddenly or bleeding between periods", severity: 3 }
      ]
    }
  ],
  fever: [
    {
      id: "temperature",
      question: "What is your current body temperature?",
      options: [
        { value: "normal", label: "Normal (98-99°F / 36-37°C)", severity: 0 },
        { value: "low_fever", label: "Low fever (99-101°F / 37-38°C)", severity: 1 },
        { value: "moderate_fever", label: "Moderate fever (101-103°F / 38-39°C)", severity: 2 },
        { value: "high_fever", label: "High fever (>103°F / >39°C)", severity: 3 }
      ]
    },
    {
      id: "duration",
      question: "How long have you had fever?",
      options: [
        { value: "new", label: "Just started today", severity: 1 },
        { value: "few_days", label: "2-3 days", severity: 2 },
        { value: "week", label: "More than a week", severity: 3 },
        { value: "persistent", label: "On and off for weeks", severity: 3 }
      ]
    },
    {
      id: "symptoms",
      question: "What other symptoms do you have with fever?",
      options: [
        { value: "mild", label: "Mild headache or body ache", severity: 1 },
        { value: "moderate", label: "Persistent cough, sore throat, fatigue", severity: 2 },
        { value: "severe", label: "Difficulty breathing, chest pain, confusion", severity: 3 },
        { value: "critical", label: "Severe weakness, unable to keep fluids down", severity: 3 }
      ]
    }
  ],
  pain: [
    {
      id: "pain_scale",
      question: "On a scale of 1-10, how would you rate your pain?",
      options: [
        { value: "mild", label: "1-3: Mild pain, doesn't interfere with activities", severity: 0 },
        { value: "moderate", label: "4-6: Moderate pain, some difficulty with activities", severity: 1 },
        { value: "severe", label: "7-8: Severe pain, significantly limits activities", severity: 2 },
        { value: "extreme", label: "9-10: Extreme pain, unable to function", severity: 3 }
      ]
    },
    {
      id: "location",
      question: "Where is your pain located?",
      options: [
        { value: "general", label: "General body ache or muscle pain", severity: 1 },
        { value: "abdomen", label: "Lower abdomen or pelvic area", severity: 2 },
        { value: "chest", label: "Chest or heart area", severity: 3 },
        { value: "head", label: "Severe headache or migraine", severity: 2 }
      ]
    }
  ],
  nutrition: [
    {
      id: "weakness_level",
      question: "How would you describe your energy levels?",
      options: [
        { value: "slightly_tired", label: "Slightly more tired than usual", severity: 1 },
        { value: "moderate_fatigue", label: "Moderate fatigue, affects daily tasks", severity: 2 },
        { value: "severe_weakness", label: "Severe weakness, difficulty walking", severity: 3 },
        { value: "extreme", label: "Extreme weakness, fainting episodes", severity: 3 }
      ]
    },
    {
      id: "eating_pattern",
      question: "How has your appetite and eating been?",
      options: [
        { value: "normal", label: "Normal appetite and eating well", severity: 0 },
        { value: "reduced", label: "Reduced appetite but still eating", severity: 1 },
        { value: "poor", label: "Very poor appetite, eating very little", severity: 2 },
        { value: "unable", label: "Unable to keep food down, vomiting", severity: 3 }
      ]
    }
  ],
  other: [
    {
      id: "general_concern",
      question: "How concerning are your symptoms to you?",
      options: [
        { value: "minor", label: "Minor concern, just want to monitor", severity: 1 },
        { value: "moderate", label: "Moderate concern, affecting daily life", severity: 2 },
        { value: "serious", label: "Very concerned, symptoms are worsening", severity: 3 },
        { value: "urgent", label: "Urgent concern, need immediate help", severity: 3 }
      ]
    },
    {
      id: "duration_other",
      question: "How long have you been experiencing these symptoms?",
      options: [
        { value: "recent", label: "Just started (1-2 days)", severity: 1 },
        { value: "week", label: "About a week", severity: 2 },
        { value: "chronic", label: "Several weeks or months", severity: 2 },
        { value: "worsening", label: "Getting progressively worse", severity: 3 }
      ]
    }
  ]
};

export default function SymptomQuestionnaire({ category, onComplete, onBack }: QuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  
  const questions = questionsByCategory[category] || questionsByCategory.other;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate severity based on answers
      const totalSeverity = questions.reduce((sum, q) => {
        const answer = answers[q.id];
        const option = q.options.find(opt => opt.value === answer);
        return sum + (option?.severity || 0);
      }, 0);

      const maxPossibleSeverity = questions.reduce((sum, q) => 
        sum + Math.max(...q.options.map(opt => opt.severity)), 0
      );

      const severityRatio = totalSeverity / maxPossibleSeverity;
      
      let severity: "mild" | "moderate" | "severe";
      if (severityRatio >= 0.7 || totalSeverity >= questions.length * 2.5) {
        severity = "severe";
      } else if (severityRatio >= 0.4 || totalSeverity >= questions.length * 1.5) {
        severity = "moderate";
      } else {
        severity = "mild";
      }

      onComplete(severity);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onBack();
    }
  };

  const currentAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-primary" />
            AI Health Assessment
          </CardTitle>
          <Badge variant="outline">
            {currentQuestion + 1} of {questions.length}
          </Badge>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary rounded-full h-2 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">{question.question}</h3>
          
          <RadioGroup value={currentAnswer} onValueChange={handleAnswer}>
            <div className="space-y-3">
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label 
                    htmlFor={option.value} 
                    className="flex-1 cursor-pointer p-3 rounded-lg border border-border hover:bg-accent"
                  >
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="flex justify-between pt-4">
          <Button 
            variant="outline" 
            onClick={handlePrevious}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            {currentQuestion === 0 ? "Back to Form" : "Previous"}
          </Button>
          
          <Button 
            onClick={handleNext}
            disabled={!currentAnswer}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
            {currentQuestion < questions.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}