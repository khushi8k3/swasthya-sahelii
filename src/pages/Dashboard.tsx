import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  Heart, 
  Calendar,
  MapPin,
  Filter,
  Download
} from "lucide-react";

const healthStats = {
  totalReports: 247,
  redAlerts: 12,
  resolvedCases: 198,
  activeUsers: 89,
  ashaWorkers: 15
};

const recentCases = [
  {
    id: 1,
    severity: "severe",
    category: "Maternal Health",
    location: "Ward 3, Village A",
    time: "2 hours ago",
    status: "Assigned to Priya Sharma",
    age: "24 years"
  },
  {
    id: 2,
    severity: "moderate", 
    category: "Menstrual Health",
    location: "Ward 1, Village B",
    time: "5 hours ago",
    status: "Follow-up scheduled",
    age: "19 years"
  },
  {
    id: 3,
    severity: "mild",
    category: "Nutrition",
    location: "Ward 2, Village A", 
    time: "1 day ago",
    status: "Resolved",
    age: "32 years"
  }
];

const healthTrends = [
  { category: "Anemia", cases: 45, trend: "+12%", color: "bg-warning" },
  { category: "Maternal Issues", cases: 32, trend: "-8%", color: "bg-destructive" },
  { category: "Menstrual Health", cases: 28, trend: "+5%", color: "bg-secondary" },
  { category: "Nutrition", cases: 23, trend: "-15%", color: "bg-success" }
];

const villageData = [
  { name: "Village A", population: 1200, reports: 89, alerts: 5, coverage: 85 },
  { name: "Village B", population: 950, reports: 67, alerts: 3, coverage: 78 },
  { name: "Village C", population: 1450, reports: 91, alerts: 4, coverage: 92 }
];

export default function Dashboard() {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "severe": return "bg-destructive";
      case "moderate": return "bg-warning"; 
      case "mild": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Health Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Community health overview and trends for healthcare workers and NGOs.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Heart className="h-4 w-4 text-primary" />
              Total Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthStats.totalReports}</div>
            <p className="text-xs text-muted-foreground">+23% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              Red Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">{healthStats.redAlerts}</div>
            <p className="text-xs text-muted-foreground">Requiring urgent attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Resolved Cases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{healthStats.resolvedCases}</div>
            <p className="text-xs text-muted-foreground">80% resolution rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-secondary" />
              Active Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthStats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent-foreground" />
              ASHA Workers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{healthStats.ashaWorkers}</div>
            <p className="text-xs text-muted-foreground">Currently active</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Cases */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Recent Cases
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentCases.map((case_) => (
              <div key={case_.id} className="border-l-4 border-primary pl-4 pb-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge className={`${getSeverityColor(case_.severity)} text-white text-xs`}>
                        {case_.severity}
                      </Badge>
                      <span className="text-sm font-medium">{case_.category}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {case_.location} • {case_.age}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{case_.time}</span>
                </div>
                <p className="text-sm">{case_.status}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Health Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Health Category Trends
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthTrends.map((trend, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{trend.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">{trend.cases}</span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        trend.trend.startsWith('+') ? 'text-destructive' : 'text-success'
                      }`}
                    >
                      {trend.trend}
                    </Badge>
                  </div>
                </div>
                <Progress 
                  value={(trend.cases / healthStats.totalReports) * 100} 
                  className="h-2"
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Village Coverage */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Village Health Coverage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {villageData.map((village, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">{village.name}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Population:</span>
                      <span className="font-medium">{village.population.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Reports:</span>
                      <span className="font-medium">{village.reports}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Red Alerts:</span>
                      <span className="font-medium text-destructive">{village.alerts}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Health Coverage:</span>
                        <span className="font-medium">{village.coverage}%</span>
                      </div>
                      <Progress value={village.coverage} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Insights Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Key Insights & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <h4 className="font-medium text-success mb-1">✓ Improvement Noted</h4>
              <p className="text-sm">Nutrition-related cases decreased by 15% this month due to targeted interventions.</p>
            </div>
            <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <h4 className="font-medium text-warning mb-1">⚠ Attention Needed</h4>
              <p className="text-sm">Anemia cases rising in Village A. Recommend iron supplementation program.</p>
            </div>
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
              <h4 className="font-medium text-primary mb-1">📊 Data Insight</h4>
              <p className="text-sm">Peak reporting hours: 9-11 AM and 3-5 PM. Consider ASHA worker scheduling.</p>
            </div>
            <div className="p-3 bg-secondary/10 border border-secondary/20 rounded-lg">
              <h4 className="font-medium text-secondary mb-1">🎯 Goal Progress</h4>
              <p className="text-sm">85% average health coverage achieved. Target: 90% by next quarter.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}