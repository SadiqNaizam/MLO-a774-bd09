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

interface HeaderProps {
  pageTitle?: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle = 'Dashboard' }) => {
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
      'fixed top-0 h-[70px] bg-card shadow-sm flex items-center justify-between px-6 z-10',
      'left-64 right-0' // Offset by sidebar width, covers remaining width
    )}>
      <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default">
              <PlusCircle className="mr-2 h-4 w-4" /> Create <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
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
            <Button variant="outline" className="min-w-[180px] justify-between">
              <CalendarDays className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-foreground flex-1 text-left">{selectedDateRange}</span>
              <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[180px]">
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

export default Header;
