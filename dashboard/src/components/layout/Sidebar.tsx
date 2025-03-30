
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Briefcase, 
  BarChart3, 
  Settings, 
  HelpCircle,
  PlusCircle
} from "lucide-react";

const Sidebar = () => {
  return (
    <div className="hidden border-r bg-card h-screen md:flex md:w-64 md:flex-col">
      <div className="flex flex-col h-full">
        <div className="flex-1 py-4">
          <div className="px-4 py-2">
            <Button className="w-full justify-start gap-2 bg-recruitment-primary hover:bg-recruitment-primary/90">
              <PlusCircle className="h-4 w-4" />
              Add New Job
            </Button>
          </div>
          <nav className="flex flex-col gap-1 px-2 pt-4">
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <Users className="h-4 w-4" />
              Candidates
            </Button>
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <Briefcase className="h-4 w-4" />
              Jobs
            </Button>
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <FileText className="h-4 w-4" />
              Resumes
            </Button>
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <BarChart3 className="h-4 w-4" />
              Analytics
            </Button>
          </nav>
        </div>
        <div className="border-t py-4">
          <nav className="flex flex-col gap-1 px-2">
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
            <Button variant="ghost" className="justify-start flex gap-2 text-left">
              <HelpCircle className="h-4 w-4" />
              Help
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
