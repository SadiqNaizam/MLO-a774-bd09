import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface OtherDataItem {
  id: string;
  value: string | number;
  label: string;
  tooltip?: string;
}

const otherDataItems: OtherDataItem[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'avgConversionTime', value: 12, label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads', tooltip: 'Leads with no activity in the last 30 days' },
];

const OtherDataWidget: React.FC = () => {
  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Other data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
            {otherDataItems.map((item) => (
              <div key={item.id} className="flex flex-col">
                <p className="text-3xl font-bold text-foreground">{item.value}</p>
                <div className="flex items-center">
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                  {item.tooltip && (
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="ml-1 h-3.5 w-3.5 text-muted-foreground cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{item.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default OtherDataWidget;
