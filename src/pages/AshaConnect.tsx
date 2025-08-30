import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Phone, MessageCircle, MapPin, Clock, User, Send, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ashaWorkers = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Village Health Center",
    distance: "0.5 km",
    availability: "Available",
    specialties: ["Maternal Health", "Child Care", "Immunization"],
    rating: 4.8,
    phone: "+91-9876543210",
    experience: "5 years"
  },
  {
    id: 2,
    name: "Sunita Devi",
    location: "Primary Health Center",
    distance: "1.2 km",
    availability: "On Call",
    specialties: ["Women's Health", "Family Planning", "Nutrition"],
    rating: 4.9,
    phone: "+91-9876543211",
    experience: "8 years"
  },
  {
    id: 3,
    name: "Meera Patel",
    location: "Community Health Post",
    distance: "2.1 km",
    availability: "Busy",
    specialties: ["Anemia Care", "Health Education", "Emergency Care"],
    rating: 4.7,
    phone: "+91-9876543212",
    experience: "3 years"
  }
];

const recentAlerts = [
  { id: 1, time: "2 hours ago", message: "Severe abdominal pain case in Ward 3", status: "Responded" },
  { id: 2, time: "5 hours ago", message: "High fever emergency in Village Center", status: "Responded" },
  { id: 3, time: "1 day ago", message: "Pregnancy complication alert", status: "Responded" }
];

export default function AshaConnect() {
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleContactWorker = (worker: typeof ashaWorkers[0], method: 'call' | 'message') => {
    if (method === 'call') {
      toast({
        title: "Calling ASHA Worker",
        description: `Connecting you to ${worker.name} at ${worker.phone}`,
      });
    } else {
      if (!message.trim()) {
        toast({
          title: "Empty Message",
          description: "Please write a message before sending.",
          variant: "destructive"
        });
        return;
      }
      
      toast({
        title: "Message Sent",
        description: `Your message has been sent to ${worker.name}`,
      });
      setMessage("");
      setSelectedWorker(null);
    }
  };

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-success";
      case "On Call": return "bg-warning";
      case "Busy": return "bg-destructive";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">ASHA Worker Connect</h1>
        <p className="text-muted-foreground">
          Connect directly with nearby Accredited Social Health Activists (ASHA) for immediate health guidance and support.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ASHA Workers List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold mb-4">Nearby ASHA Workers</h2>
          
          {ashaWorkers.map((worker) => (
            <Card key={worker.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {worker.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{worker.name}</CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {worker.location} • {worker.distance}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getAvailabilityColor(worker.availability)} text-white`}>
                    {worker.availability}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{worker.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{worker.experience}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2">Specialties</h4>
                  <div className="flex flex-wrap gap-2">
                    {worker.specialties.map((specialty, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleContactWorker(worker, 'call')}
                    disabled={worker.availability === "Busy"}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => setSelectedWorker(worker.id)}
                    disabled={worker.availability === "Busy"}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>

                {/* Message Form */}
                {selectedWorker === worker.id && (
                  <div className="mt-4 p-4 border rounded-lg bg-accent/30">
                    <h4 className="font-medium mb-2">Send Message to {worker.name}</h4>
                    <Textarea
                      placeholder="Describe your health concern or question..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="mb-2"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => handleContactWorker(worker, 'message')}
                      >
                        <Send className="h-4 w-4 mr-2" />
                        Send
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setSelectedWorker(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Alerts Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Red Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="border-l-2 border-destructive pl-3 pb-3">
                  <div className="flex justify-between items-start mb-1">
                    <Badge className="bg-success text-white text-xs">
                      {alert.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{alert.time}</span>
                  </div>
                  <p className="text-sm">{alert.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Emergency Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Ambulance (108)</span>
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    Call
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span>Health Helpline (102)</span>
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    Call
                  </Button>
                </div>
                <div className="flex justify-between">
                  <span>Women's Helpline (181)</span>
                  <Button size="sm" variant="outline" className="h-6 px-2 text-xs">
                    Call
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary bg-primary/5">
            <CardHeader>
              <CardTitle className="text-lg text-primary">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• For emergencies, call 108 immediately</p>
              <p>• Red Alert cases are automatically notified to all nearby ASHA workers</p>
              <p>• Regular check-ups help prevent serious health issues</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}