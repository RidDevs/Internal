
import React from 'react';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/dashboard/StatCard';
import CandidateCard from '@/components/dashboard/CandidateCard';
import JobsOverview from '@/components/dashboard/JobsOverview';
import RecentActivities from '@/components/dashboard/RecentActivities';
import BiasDetection from '@/components/dashboard/BiasDetection';
import AIInsights from '@/components/dashboard/AIInsights';
import ResumeParser from '@/components/resume/ResumeParser';
import { 
  Users,
  Briefcase,
  FileText,
  CheckCircle2
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Sample data
const candidates = [
  {
    id: '1',
    name: 'Alexandra Johnson',
    role: 'Senior Software Engineer',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL', 'AWS'],
    match: 92,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Product Manager',
    skills: ['Product Strategy', 'Agile', 'User Research', 'Roadmapping'],
    match: 85,
    flags: ['Experience gap: 3 months'],
  },
  {
    id: '3',
    name: 'Sarah Williams',
    role: 'UX/UI Designer',
    skills: ['Figma', 'User Testing', 'Wireframing', 'Design Systems'],
    match: 78,
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Data Scientist',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization'],
    match: 65,
  },
];

const jobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    applications: 45,
    shortlisted: 12,
    interviewed: 6,
    status: 'Active' as const,
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    applications: 32,
    shortlisted: 8,
    interviewed: 4,
    status: 'Active' as const,
  },
  {
    id: '3',
    title: 'UX/UI Designer',
    department: 'Design',
    applications: 28,
    shortlisted: 10,
    interviewed: 5,
    status: 'Active' as const,
  },
  {
    id: '4',
    title: 'Data Scientist',
    department: 'Data',
    applications: 22,
    shortlisted: 7,
    interviewed: 3,
    status: 'Active' as const,
  },
];

const activities = [
  {
    id: '1',
    action: 'shortlisted',
    user: 'Emma Thompson',
    target: 'Alexandra Johnson for Senior Engineer',
    time: '2 hours ago',
  },
  {
    id: '2',
    action: 'added a new job posting for',
    user: 'Daniel Smith',
    target: 'Product Designer',
    time: '4 hours ago',
  },
  {
    id: '3',
    action: 'scheduled an interview with',
    user: 'Ryan Martinez',
    target: 'Michael Chen',
    time: 'Yesterday at 2:30 PM',
  },
  {
    id: '4',
    action: 'rejected',
    user: 'Olivia Wilson',
    target: '3 candidates for Data Analyst',
    time: 'Yesterday at 10:15 AM',
  },
];

const biasMetrics = [
  { category: 'Gender Balance', score: 92, status: 'good' as const },
  { category: 'Age Distribution', score: 78, status: 'warning' as const },
  { category: 'Ethnic Diversity', score: 85, status: 'good' as const },
  { category: 'Educational Background', score: 62, status: 'warning' as const },
];

const insights = [
  {
    id: '1',
    text: 'Candidates with communication skills are 45% more likely to move forward in your interview process.',
    category: 'opportunity' as const,
  },
  {
    id: '2',
    text: 'Your job descriptions may contain language that appeals more to male candidates. Consider reviewing for inclusive language.',
    category: 'warning' as const,
  },
  {
    id: '3',
    text: 'Try scheduling interviews in the morning when candidates tend to perform 23% better.',
    category: 'tip' as const,
  },
];

const Index = () => {
  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Recruitment Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline">Export Report</Button>
          <Button>AI Candidate Matching</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Total Candidates" 
          value="1,248" 
          icon={<Users size={20} />} 
          change="12% from last month" 
          trend="up"
        />
        <StatCard 
          title="Open Jobs" 
          value="24" 
          icon={<Briefcase size={20} />} 
          change="3 new this week" 
          trend="up"
        />
        <StatCard 
          title="Resumes Processed" 
          value="854" 
          icon={<FileText size={20} />} 
          change="142 this week" 
          trend="up"
        />
        <StatCard 
          title="Time-to-Hire (Avg)" 
          value="18 days" 
          icon={<CheckCircle2 size={20} />} 
          change="↓ 3 days since last quarter" 
          trend="down"
        />
      </div>

      <Tabs defaultValue="dashboard" className="mb-6">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="tools">AI Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-6 pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Top Matching Candidates</h2>
                  <Button variant="ghost" className="text-sm">View All</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {candidates.map((candidate) => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>
              <JobsOverview jobs={jobs} />
            </div>
            <div className="space-y-6">
              <RecentActivities activities={activities} />
              <BiasDetection metrics={biasMetrics} overallScore={82} />
              <AIInsights insights={insights} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="tools" className="pt-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ResumeParser />
            <div className="dashboard-card">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <span className="p-1.5 rounded-full bg-recruitment-muted text-recruitment-primary">
                  <Users size={16} />
                </span>
                AI Matching Engine
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI can analyze your job requirements and match them with candidate profiles, 
                identifying the best fits while minimizing unconscious bias.
              </p>
              <Button>Match Candidates</Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default Index;
