import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { CalendarDays, ChevronDown, PlusCircle } from 'lucide-react';

interface TopHeaderProps {
  pageTitle?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ pageTitle = 'Dashboard' }) => {
  const [selectedDateRange, setSelectedDateRange] = React.useState<string>('Last 6 months');

  const dateRanges = [
    'Today',
    'Last 7 days',
    'Last 30 days',
    'Last 6 months',
    'Last 12 months',
    'Custom Range'
  ] as const;

  return (
    <header className={cn(
      'fixed top-0 right-0 h-[70px] bg-card shadow-sm flex items-center justify-between px-6 z-10',
      'left-0 md:left-64' // Adjust left offset based on sidebar width; md:left-64 assumes sidebar is hidden on smaller screens
    )}>
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              <PlusCircle className="mr-2 h-4 w-4" /> Create <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>New Lead</DropdownMenuItem>
            <DropdownMenuItem>New Contact</DropdownMenuItem>
            <DropdownMenuItem>New Company</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>New Deal</DropdownMenuItem>
            <DropdownMenuItem>New Task</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="min-w-[160px] justify-between">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{selectedDateRange}</span>
              <ChevronDown className="ml-auto h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {dateRanges.map((range) => (
              <DropdownMenuItem key={range} onSelect={() => setSelectedDateRange(range)}>
                {range}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
