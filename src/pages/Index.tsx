import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Bell, Calendar, Users, BookOpen, Mic, Globe, AlertTriangle, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Mic,
      title: "Voice & Multi-Language",
      description: "Report symptoms in your local language using voice messages or text input.",
      color: "bg-primary"
    },
    {
      icon: Bell,
      title: "Red Alert System",
      description: "Serious health issues trigger immediate alerts to nearby ASHA workers.",
      color: "bg-destructive"
    },
    {
      icon: BookOpen,
      title: "Health Awareness",
      description: "Access educational resources on women's health, nutrition, and preventive care.",
      color: "bg-secondary"
    },
    {
      icon: Calendar,
      title: "Health Journal",
      description: "Track daily symptoms, medications, and overall well-being over time.",
      color: "bg-success"
    },
    {
      icon: Users,
      title: "ASHA Integration",
      description: "Direct connection with trained health workers for guidance and support.",
      color: "bg-warning"
    },
    {
      icon: TrendingUp,
      title: "Community Dashboard",
      description: "Health workers monitor anonymized data to identify community health trends.",
      color: "bg-accent-foreground"
    }
  ];

  const stats = [
    { number: "250+", label: "Health Reports", icon: Heart },
    { number: "15", label: "ASHA Workers", icon: Users },
    { number: "85%", label: "Response Rate", icon: TrendingUp },
    { number: "24/7", label: "Support", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary text-primary-foreground">
                  Women's Health Platform
                </Badge>
                <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Empowering Rural Women's 
                  <span className="bg-gradient-hero bg-clip-text text-transparent"> Health Journey</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Connect with ASHA workers, report health symptoms, access educational resources, 
                  and maintain your health journal - all in your local language with voice support.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-12 px-8">
                  <Link to="/report">
                    <Bell className="h-5 w-5 mr-2" />
                    Report Symptoms
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-12 px-8">
                  <Link to="/awareness">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Learn More
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div className="text-sm text-muted-foreground">
                  Available in: <span className="font-medium">English, हिंदी, বাংলা, தமிழ்</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroImage}
                alt="ASHA workers helping women in rural community"
                className="rounded-2xl shadow-strong w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-background rounded-xl p-4 shadow-medium border">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">15 ASHA Workers Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comprehensive Health Support</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform bridges the gap between rural women and healthcare services through technology and community support.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="transition-all hover:shadow-medium">
                  <CardHeader>
                    <div className={`inline-flex items-center justify-center w-12 h-12 ${feature.color} rounded-lg mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Alert Section */}
      <section className="py-16 bg-destructive/5">
        <div className="container mx-auto px-4">
          <Card className="border-destructive bg-background">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="h-8 w-8 text-destructive" />
                  </div>
                </div>
                <div className="flex-1 text-center lg:text-left">
                  <h3 className="text-2xl font-bold mb-2">Medical Emergency?</h3>
                  <p className="text-muted-foreground mb-4">
                    For severe symptoms, our Red Alert system immediately notifies nearby ASHA workers. 
                    Your safety is our priority.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <Button asChild size="lg" variant="destructive">
                    <Link to="/report">
                      <AlertTriangle className="h-5 w-5 mr-2" />
                      Report Emergency
                    </Link>
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Or call 108 for ambulance
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Start Your Health Journey Today</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of women who are taking control of their health with ASHA Connect.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="h-12 px-8">
                <Link to="/journal">
                  <Calendar className="h-5 w-5 mr-2" />
                  Start Health Journal
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8">
                <Link to="/asha">
                  <Users className="h-5 w-5 mr-2" />
                  Connect with ASHA
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
