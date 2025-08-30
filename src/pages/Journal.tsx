import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus, TrendingUp, Heart, Thermometer, Moon, Sun } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const moodOptions = [
  { value: "excellent", label: "Excellent", emoji: "😊", color: "bg-success" },
  { value: "good", label: "Good", emoji: "🙂", color: "bg-primary" },
  { value: "fair", label: "Fair", emoji: "😐", color: "bg-warning" },
  { value: "poor", label: "Poor", emoji: "😔", color: "bg-destructive" }
];

const sampleEntries = [
  {
    date: "2024-01-15",
    mood: "good",
    symptoms: "Mild headache in the morning",
    medication: "Took paracetamol",
    notes: "Feeling better after afternoon rest"
  },
  {
    date: "2024-01-14",
    mood: "excellent",
    symptoms: "No symptoms",
    medication: "Iron supplement",
    notes: "Good energy levels throughout the day"
  },
  {
    date: "2024-01-13",
    mood: "fair",
    symptoms: "Stomach discomfort, fatigue",
    medication: "ORS solution",
    notes: "Need to improve diet and rest more"
  }
];

export default function Journal() {
  const [entries, setEntries] = useState(sampleEntries);
  const [newEntry, setNewEntry] = useState({
    date: new Date().toISOString().split('T')[0],
    mood: "",
    symptoms: "",
    medication: "",
    notes: ""
  });
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!newEntry.mood) {
      toast({
        title: "Missing Information",
        description: "Please select your mood for today.",
        variant: "destructive"
      });
      return;
    }

    setEntries([newEntry, ...entries]);
    setNewEntry({
      date: new Date().toISOString().split('T')[0],
      mood: "",
      symptoms: "",
      medication: "",
      notes: ""
    });
    setShowForm(false);
    
    toast({
      title: "Entry Added",
      description: "Your health journal entry has been saved successfully.",
    });
  };

  const getMoodData = (moodValue: string) => 
    moodOptions.find(mood => mood.value === moodValue) || moodOptions[1];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Health Journal</h1>
          <p className="text-muted-foreground">
            Track your daily health, symptoms, and well-being over time.
          </p>
        </div>
        <Button onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* Health Overview */}
      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{entries.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">days logged</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Avg Mood
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good 🙂</div>
          </CardContent>
        </Card>
      </div>

      {/* New Entry Form */}
      {showForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Today's Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">How are you feeling?</label>
                <div className="grid grid-cols-2 gap-2">
                  {moodOptions.map((mood) => (
                    <Button
                      key={mood.value}
                      variant={newEntry.mood === mood.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewEntry({...newEntry, mood: mood.value})}
                    >
                      <span className="mr-2">{mood.emoji}</span>
                      {mood.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Symptoms (if any)</label>
              <Textarea
                placeholder="Describe any symptoms you experienced today..."
                value={newEntry.symptoms}
                onChange={(e) => setNewEntry({...newEntry, symptoms: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Medications/Treatments</label>
              <Input
                placeholder="Any medications or treatments taken today"
                value={newEntry.medication}
                onChange={(e) => setNewEntry({...newEntry, medication: e.target.value})}
                className="mt-1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Additional Notes</label>
              <Textarea
                placeholder="Any other observations about your health today..."
                value={newEntry.notes}
                onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                className="mt-1"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleSubmit}>Save Entry</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Journal Entries */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Recent Entries</h2>
        {entries.map((entry, index) => {
          const moodData = getMoodData(entry.mood);
          return (
            <Card key={index}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base font-medium">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                  <Badge className={`${moodData.color} text-white`}>
                    {moodData.emoji} {moodData.label}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {entry.symptoms && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Symptoms</h4>
                    <p className="text-sm">{entry.symptoms}</p>
                  </div>
                )}
                {entry.medication && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Medications</h4>
                    <p className="text-sm">{entry.medication}</p>
                  </div>
                )}
                {entry.notes && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Notes</h4>
                    <p className="text-sm">{entry.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}