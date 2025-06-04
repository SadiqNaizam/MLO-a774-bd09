import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  avgDays: number;
  color: string; // Tailwind background color class e.g., 'bg-red-500'
}

const funnelData: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, avgDays: 2, color: 'bg-chart-1' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, avgDays: 2, color: 'bg-chart-2' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, avgDays: 5, color: 'bg-chart-5' }, // Using chart-5 as per image (dark blue/purple)
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, avgDays: 8, color: 'bg-chart-4' }, // Using chart-4 as per image (green)
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, avgDays: 10, color: 'bg-purple-600' }, // Custom purple as per image
];

const totalActiveLeads = funnelData.reduce((sum, stage) => sum + stage.count, 0);
const totalValue = funnelData.reduce((sum, stage) => sum + stage.value, 0);

const FunnelWidget: React.FC = () => {
  const totalCountForPercentage = funnelData.length > 0 ? funnelData[0].count : 1; // Base percentage on the first stage or a fallback

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Funnel count</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">{totalActiveLeads}</span>
            <span className="ml-2 text-muted-foreground">active leads</span>
          </div>

          <div className="mb-6 h-3 flex rounded overflow-hidden">
            {funnelData.map((stage) => {
              const percentage = (stage.count / totalCountForPercentage) * 100;
              return (
                <Tooltip key={stage.id} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn('h-full', stage.color)}
                      style={{ width: `${percentage}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{stage.name}: {stage.count} leads</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>

          <div className="space-y-3">
            {funnelData.map((stage) => (
              <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
                <div className={cn("w-3 h-3 rounded-sm", stage.color)}></div>
                <div className="text-foreground truncate">{stage.name}</div>
                <div className="text-muted-foreground font-medium text-right">{stage.count}</div>
                <div className="text-muted-foreground text-right">$ {stage.value}</div>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <div className="text-muted-foreground text-right cursor-default">
                      {stage.avgDays} days
                    </div>
                  </TooltipTrigger>
                  {stage.id === 'inConversation' && (
                     <TooltipContent side="top" className="bg-slate-800 text-white">
                        <p>Average time on this stage</p>
                     </TooltipContent>
                  )}
                </Tooltip>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default FunnelWidget;
