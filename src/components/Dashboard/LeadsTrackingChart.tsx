import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

interface ChartDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsChartData: ChartDataPoint[] = [
  { month: 'March', closedWon: 65, closedLost: 50 },
  { month: 'April', closedWon: 50, closedLost: 40 },
  { month: 'May', closedWon: 85, closedLost: 60 },
  { month: 'June', closedWon: 70, closedLost: 10 }, 
  { month: 'July', closedWon: 80, closedLost: 45 },
  { month: 'August', closedWon: 55, closedLost: 95 }, 
];

const totalClosedWon = leadsChartData.reduce((sum, data) => sum + data.closedWon, 0);
const totalClosedLost = leadsChartData.reduce((sum, data) => sum + data.closedLost, 0);

const LeadsTrackingChart: React.FC = () => {
  const [timeRange, setTimeRange] = React.useState<string>('Last 6 months');
  // In a real app, changing timeRange would fetch new data

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background p-3 shadow-lg rounded-md border">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((pld: any) => (
            <div key={pld.dataKey} style={{ color: pld.color }} className="text-xs">
              {pld.dataKey === 'closedWon' ? 'Closed Won' : 'Closed Lost'}: {pld.value}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Leads tracking</CardTitle>
          <CardDescription className="mt-1">
            <span className="text-2xl font-bold text-foreground">{totalClosedWon}</span> total closed{' '}
            <span className="text-2xl font-bold text-muted-foreground">{totalClosedLost}</span> total lost
          </CardDescription>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-xs">
              {timeRange} <ChevronDown className="ml-1 h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {['Last 30 days', 'Last 3 months', 'Last 6 months', 'Last 12 months'].map(range => (
              <DropdownMenuItem key={range} onSelect={() => setTimeRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={leadsChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorClosedWon" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6AB6EC" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6AB6EC" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorClosedLost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#E94E77" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#E94E77" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                dy={10} 
                className="text-xs text-muted-foreground"
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                dx={-10} 
                className="text-xs text-muted-foreground"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                align="left" 
                iconType="circle" 
                wrapperStyle={{ paddingTop: '20px' }} 
                formatter={(value) => <span className="text-sm text-muted-foreground capitalize ml-1">{value.replace('closedW', 'Closed w').replace('closedL', 'Closed l')}</span>}
              />
              <Area type="monotone" dataKey="closedWon" stroke="#6AB6EC" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedWon)" />
              <Area type="monotone" dataKey="closedLost" stroke="#E94E77" strokeWidth={2} fillOpacity={1} fill="url(#colorClosedLost)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingChart;
