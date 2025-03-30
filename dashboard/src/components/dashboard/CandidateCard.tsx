
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface CandidateCardProps {
  candidate: {
    id: string;
    name: string;
    role: string;
    skills: string[];
    match: number;
    imageUrl?: string;
    flags?: string[];
  };
}

const CandidateCard = ({ candidate }: CandidateCardProps) => {
  const getMatchClass = () => {
    if (candidate.match >= 80) return "high-match";
    if (candidate.match >= 60) return "medium-match";
    return "low-match";
  };

  return (
    <div className="candidate-card">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={candidate.imageUrl} />
          <AvatarFallback className="bg-recruitment-muted text-recruitment-primary">
            {candidate.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium">{candidate.name}</h3>
            <span className={`match-indicator ${getMatchClass()}`}>
              {candidate.match}% Match
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{candidate.role}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {candidate.skills.slice(0, 3).map((skill, i) => (
          <Badge key={i} variant="outline" className="bg-muted/50">
            {skill}
          </Badge>
        ))}
        {candidate.skills.length > 3 && (
          <Badge variant="outline" className="bg-muted/50">
            +{candidate.skills.length - 3} more
          </Badge>
        )}
      </div>
      {candidate.flags && candidate.flags.length > 0 && (
        <div className="mt-2 pt-2 border-t text-xs text-amber-600">
          <span className="font-medium">AI Flags: </span>
          {candidate.flags.join(', ')}
        </div>
      )}
    </div>
  );
};

export default CandidateCard;
