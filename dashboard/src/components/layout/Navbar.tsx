
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, SearchIcon, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2 md:w-40 lg:w-64">
          <span className="text-xl font-bold text-recruitment-primary">AI Recruit</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="relative hidden md:flex">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search candidates..."
              className="w-[300px] pl-8 bg-background"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-full">
            <BellIcon className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-recruitment-primary text-white">HR</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
