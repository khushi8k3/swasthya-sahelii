import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Baby, Droplets, Shield, Utensils, Brain, ExternalLink } from "lucide-react";

const healthTopics = [
  {
    id: "menstruation",
    title: "Menstrual Health & Hygiene",
    icon: Droplets,
    color: "bg-secondary",
    content: [
      "Use clean cloth or sanitary pads during menstruation",
      "Change pads/cloth every 4-6 hours",
      "Maintain proper hygiene - wash hands before and after",
      "Pain relief: Heat therapy and light exercise can help",
      "Track your cycle to identify irregularities"
    ],
    urgentSigns: ["Heavy bleeding (soaking pad every hour)", "Severe pain affecting daily activities", "Missed periods for 3+ months"]
  },
  {
    id: "breast-cancer",
    title: "Breast Cancer Awareness",
    icon: Heart,
    color: "bg-destructive",
    content: [
      "Perform monthly self-examinations",
      "Look for lumps, skin changes, or nipple discharge",
      "Check both breasts and underarm areas",
      "Best time: 7-10 days after period ends",
      "Regular screening after age 40 is recommended"
    ],
    urgentSigns: ["New lump in breast or underarm", "Skin dimpling or puckering", "Nipple discharge or inversion"]
  },
  {
    id: "anemia",
    title: "Anemia Prevention",
    icon: Shield,
    color: "bg-warning",
    content: [
      "Eat iron-rich foods: spinach, lentils, meat",
      "Include vitamin C foods to enhance iron absorption",
      "Avoid tea/coffee with iron-rich meals",
      "Take prescribed iron tablets if recommended",
      "Regular health check-ups to monitor hemoglobin"
    ],
    urgentSigns: ["Extreme fatigue and weakness", "Pale skin, nails, or inner eyelids", "Shortness of breath"]
  },
  {
    id: "nutrition",
    title: "Maternal Nutrition",
    icon: Utensils,
    color: "bg-success",
    content: [
      "Eat varied diet with fruits, vegetables, grains",
      "Take folic acid supplements before and during pregnancy",
      "Consume adequate protein and calcium",
      "Stay hydrated - drink 8-10 glasses of water daily",
      "Avoid alcohol, smoking, and raw/undercooked foods during pregnancy"
    ],
    urgentSigns: ["Severe nausea preventing eating", "Rapid weight loss", "Signs of malnutrition"]
  },
  {
    id: "reproductive",
    title: "Reproductive Health",
    icon: Baby,
    color: "bg-primary",
    content: [
      "Regular gynecological check-ups",
      "Practice safe sex and family planning",
      "Understand fertility signs and cycles",
      "Get vaccinated (HPV, rubella) as recommended",
      "Seek counseling for family planning options"
    ],
    urgentSigns: ["Unusual vaginal discharge or odor", "Pelvic pain or burning urination", "Irregular bleeding between periods"]
  },
  {
    id: "mental-health",
    title: "Mental Health & Well-being",
    icon: Brain,
    color: "bg-accent",
    content: [
      "Practice stress management techniques",
      "Maintain social connections and support systems",
      "Regular physical activity and adequate sleep",
      "Seek help for persistent sadness or anxiety",
      "Talk to trusted friends, family, or healthcare workers"
    ],
    urgentSigns: ["Thoughts of self-harm", "Persistent hopelessness", "Inability to function daily"]
  }
];

export default function Awareness() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Health Awareness Hub</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Essential health information for women. Learn about prevention, early detection, and when to seek help.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {healthTopics.map((topic) => {
          const Icon = topic.icon;
          return (
            <Card key={topic.id} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${topic.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg">{topic.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2 text-sm uppercase tracking-wide">Key Points</h4>
                  <ul className="space-y-1 text-sm">
                    {topic.content.map((point, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium text-sm uppercase tracking-wide flex items-center gap-2">
                    <span className="text-destructive">🚨</span>
                    Seek Immediate Help If:
                  </h4>
                  <div className="space-y-1">
                    {topic.urgentSigns.map((sign, index) => (
                      <Badge key={index} variant="outline" className="text-xs block w-full justify-start p-2 h-auto">
                        {sign}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" className="w-full" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Contact Section */}
      <Card className="mt-8 border-destructive bg-destructive/5">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            🚨 Emergency Contacts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-medium mb-2">National Emergency Numbers</h4>
              <ul className="space-y-1 text-sm">
                <li><strong>108:</strong> Emergency Ambulance Service</li>
                <li><strong>102:</strong> National Health Helpline</li>
                <li><strong>181:</strong> Women's Helpline</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Through ASHA Connect</h4>
              <ul className="space-y-1 text-sm">
                <li>• Report severe symptoms for immediate ASHA notification</li>
                <li>• Use "ASHA Connect" page for direct communication</li>
                <li>• Emergency cases are automatically prioritized</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}