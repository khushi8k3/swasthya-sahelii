import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Mic, Send, Heart, Thermometer, Zap, Brain } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import SymptomQuestionnaire from "@/components/SymptomQuestionnaire";

const symptomCategories = [
  { id: "menstrual", label: "Menstrual Health", icon: Heart, color: "bg-secondary" },
  { id: "fever", label: "Fever/Infection", icon: Thermometer, color: "bg-warning" },
  { id: "pain", label: "Pain/Discomfort", icon: Zap, color: "bg-destructive" },
  { id: "nutrition", label: "Nutrition/Weakness", icon: Heart, color: "bg-success" },
  { id: "other", label: "Other Symptoms", icon: AlertTriangle, color: "bg-muted" }
];

const severityLevels = [
  { level: "mild", label: "Mild", color: "bg-success", description: "Minor discomfort" },
  { level: "moderate", label: "Moderate", color: "bg-warning", description: "Noticeable symptoms" },
  { level: "severe", label: "Severe", color: "bg-destructive", description: "Urgent attention needed" }
];

export default function Report() {
  const [symptoms, setSymptoms] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!symptoms || !selectedCategory || !severity) {
      toast({
        title: "Incomplete Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate red alert for severe symptoms
    if (severity === "severe") {
      toast({
        title: "🚨 RED ALERT ACTIVATED",
        description: "Your case has been marked urgent and nearby ASHA workers have been notified.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Report Submitted",
        description: "Your health report has been recorded successfully.",
      });
    }

    // Reset form
    setSymptoms("");
    setSelectedCategory("");
    setSeverity("");
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      toast({
        title: "Voice Recording Started",
        description: "Speak clearly about your symptoms. Tap the mic again to stop.",
      });
    } else {
      toast({
        title: "Voice Recording Stopped",
        description: "Your voice message has been processed.",
      });
      setSymptoms(prev => prev + " [Voice message recorded]");
    }
  };

  const handleQuestionnaireComplete = (detectedSeverity: "mild" | "moderate" | "severe") => {
    setSeverity(detectedSeverity);
    setShowQuestionnaire(false);
    toast({
      title: "AI Assessment Complete",
      description: `Your symptoms have been assessed as ${detectedSeverity} severity.`,
    });
  };

  const handleBackFromQuestionnaire = () => {
    setShowQuestionnaire(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Report Your Symptoms</h1>
        <p className="text-muted-foreground">
          Share your health concerns with us. For serious symptoms, we'll immediately alert nearby ASHA workers.
        </p>
      </div>

      {showQuestionnaire && selectedCategory ? (
        <SymptomQuestionnaire 
          category={selectedCategory}
          onComplete={handleQuestionnaireComplete}
          onBack={handleBackFromQuestionnaire}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
        {/* Symptom Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Describe Your Symptoms
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Textarea
                placeholder="Describe what you're experiencing... (You can also use voice recording below)"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className="min-h-32 resize-none"
              />
              <Button
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={toggleRecording}
                className="w-full"
              >
                <Mic className={`h-4 w-4 mr-2 ${isRecording ? "animate-pulse" : ""}`} />
                {isRecording ? "Stop Recording" : "Record Voice Message"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Symptom Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {symptomCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className="justify-start h-auto p-3"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <Icon className="h-4 w-4 mr-3" />
                    <span>{category.label}</span>
                  </Button>
                );
              })}
            </div>
            
            {selectedCategory && (
              <Button
                variant="outline"
                onClick={() => setShowQuestionnaire(true)}
                className="w-full mt-4 flex items-center gap-2"
              >
                <Brain className="h-4 w-4" />
                Take AI Health Questionnaire
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Severity Assessment */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>How Severe Are Your Symptoms?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-3">
              {severityLevels.map((level) => (
                <Button
                  key={level.level}
                  variant={severity === level.level ? "default" : "outline"}
                  className="h-auto p-4 flex-col items-start"
                  onClick={() => setSeverity(level.level)}
                >
                  <div className="flex items-center w-full mb-2">
                    <Badge className={`${level.color} text-white mr-2`}>
                      {level.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-left opacity-80">{level.description}</p>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <Button 
              onClick={handleSubmit}
              className="w-full h-12 text-lg"
              disabled={!symptoms || !selectedCategory || !severity}
            >
              <Send className="h-5 w-5 mr-2" />
              Submit Health Report
            </Button>
            
            {severity === "severe" && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <div className="flex items-center gap-2 text-destructive font-medium">
                  <AlertTriangle className="h-4 w-4" />
                  Red Alert Will Be Triggered
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Severe symptoms will immediately notify the nearest ASHA worker for urgent assistance.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      )}
    </div>
  );
}