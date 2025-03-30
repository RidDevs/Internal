
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface Job {
  id: string;
  title: string;
  department: string;
  applications: number;
  shortlisted: number;
  interviewed: number;
  status: 'Active' | 'Closed' | 'On Hold';
}

interface JobsOverviewProps {
  jobs: Job[];
}

const JobsOverview = ({ jobs }: JobsOverviewProps) => {
  return (
    <div className="dashboard-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Active Jobs</h3>
        <span className="text-sm text-muted-foreground">
          {jobs.filter(j => j.status === 'Active').length} active jobs
        </span>
      </div>
      <div className="space-y-4">
        {jobs.filter(j => j.status === 'Active').slice(0, 4).map((job) => {
          const progress = Math.round((job.shortlisted / job.applications) * 100);
          
          return (
            <div key={job.id} className="space-y-1">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{job.title}</h4>
                <span className="text-xs bg-recruitment-muted text-recruitment-primary px-2 py-1 rounded-full">
                  {job.applications} applicants
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{job.department}</p>
              <div className="flex items-center gap-2">
                <Progress value={progress} className="h-2" />
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {job.shortlisted}/{job.applications}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default JobsOverview;
