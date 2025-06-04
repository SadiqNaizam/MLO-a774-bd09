import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LostReason {
  id: string;
  reason: string;
  percentage: number;
}

const lostReasonsData: LostReason[] = [
  { id: 'proposalUnclear1', reason: 'The proposal is unclear', percentage: 40 },
  { id: 'venturePursuit', reason: 'However venture pursuit', percentage: 20 },
  { id: 'other', reason: 'Other', percentage: 10 },
  { id: 'proposalUnclear2', reason: 'The proposal is unclear', percentage: 30 }, // Note: Image has duplicate reason, kept for accuracy
];

const LostReasonsWidget: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {lostReasonsData.map((item) => (
            <div key={item.id}>
              <p className="text-3xl font-bold text-foreground">{item.percentage}%</p>
              <p className="text-sm text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LostReasonsWidget;
