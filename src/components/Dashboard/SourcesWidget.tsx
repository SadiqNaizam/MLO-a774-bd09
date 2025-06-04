import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';

interface SourceData {
  name: string;
  value: number;
  money: number;
  percentage: number;
  color: string; // Tailwind fill color class e.g., 'fill-red-500'
}

const initialSourcesData: SourceData[] = [
  { name: 'Clutch', value: 150, money: 3000, percentage: 50, color: 'fill-chart-1' },
  { name: 'Behance', value: 120, money: 1000, percentage: 40, color: 'fill-chart-2' },
  { name: 'Instagram', value: 30, money: 1000, percentage: 10, color: 'fill-chart-3' },
  { name: 'Dribbble', value: 30, money: 1000, percentage: 10, color: 'fill-chart-4' },
];

const leadsConvertedData: SourceData[] = [
  { name: 'Clutch', value: 80, money: 2800, percentage: 55, color: 'fill-chart-1' },
  { name: 'Behance', value: 50, money: 900, percentage: 35, color: 'fill-chart-2' },
  { name: 'Instagram', value: 10, money: 800, percentage: 7, color: 'fill-chart-3' },
  { name: 'Dribbble', value: 5, money: 750, percentage: 3, color: 'fill-chart-4' },
];

const totalDealsData: SourceData[] = [
  { name: 'Clutch', value: 3200, money: 3200, percentage: 45, color: 'fill-chart-1' }, // 'value' here represents deal size
  { name: 'Behance', value: 1500, money: 1500, percentage: 25, color: 'fill-chart-2' },
  { name: 'Instagram', value: 1200, money: 1200, percentage: 20, color: 'fill-chart-3' },
  { name: 'Dribbble', value: 1100, money: 1100, percentage: 10, color: 'fill-chart-4' },
];

type TabKey = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const dataMap: Record<TabKey, SourceData[]> = {
  leadsCame: initialSourcesData,
  leadsConverted: leadsConvertedData,
  totalDealsSize: totalDealsData,
};

const SourcesWidget: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabKey>('leadsCame');
  const currentData = dataMap[activeTab];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-2 shadow-lg rounded-md border">
          <p className="text-sm font-medium">{`${payload[0].name}`}</p>
          <p className="text-xs text-muted-foreground">{`Value: ${payload[0].value}`}</p>
          {activeTab !== 'totalDealsSize' && <p className="text-xs text-muted-foreground">{`Money: $${payload[0].payload.money}`}</p>}
          <p className="text-xs text-muted-foreground">{`Share: ${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    innerRadius={50} // For Donut chart
                    fill="#8884d8"
                    dataKey="value"
                    stroke="hsl(var(--card))" // Match card background for segment borders
                    strokeWidth={3}
                  >
                    {currentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} className={cn(entry.color)} />
                    ))}
                  </Pie>
                  <RechartsTooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3 text-sm">
              {currentData.map((source) => (
                <div key={source.name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className={cn("w-3 h-3 rounded-sm mr-2", source.color.replace('fill-', 'bg-'))}></span>
                    <span className="text-foreground">{source.name}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-muted-foreground font-medium">
                      {activeTab === 'totalDealsSize' ? `$${source.money}` : `$${source.money}`}
                    </span>
                    <Tooltip delayDuration={100}>
                        <TooltipTrigger asChild>
                            <span className="text-muted-foreground w-10 text-right">{source.percentage}%</span>
                        </TooltipTrigger>
                        {source.name === 'Dribbble' && activeTab === 'leadsCame' && (
                            <TooltipContent side="top" className="bg-slate-800 text-white">
                                <p>from leads total</p>
                            </TooltipContent>
                        )}
                    </Tooltip>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as TabKey)} className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="leadsCame">Leads came</TabsTrigger>
              <TabsTrigger value="leadsConverted">Leads Converted</TabsTrigger>
              <TabsTrigger value="totalDealsSize">Total deals size</TabsTrigger>
            </TabsList>
            {/* TabsContent can be used if different layouts are needed per tab, but here data changes chart & list */}
          </Tabs>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default SourcesWidget;
