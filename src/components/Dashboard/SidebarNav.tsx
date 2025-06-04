import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Assuming react-router-dom is used for navigation
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users,
  User,
  FileText,
  FileSpreadsheet,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings,
  Menu,
  Briefcase // Placeholder for 'DO' logo, replaced with a generic business icon
} from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const mainNavItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutGrid },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/customers', label: 'Customers', icon: User },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/invoices', label: 'Invoices', icon: FileSpreadsheet },
  { href: '/items', label: 'Items', icon: ShoppingCart },
  { href: '/mail', label: 'Mail', icon: Mail },
  { href: '/shoebox', label: 'Shoebox', icon: Archive },
  { href: '/calendar', label: 'Calendar', icon: CalendarDays },
];

const bottomNavItems: NavItem[] = [
  { href: '/help', label: 'Help', icon: HelpCircle },
  { href: '/settings', label: 'Settings', icon: Settings },
];

const SidebarNav: React.FC = () => {
  const location = useLocation(); // Using useLocation to determine active path
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const renderNavItem = (item: NavItem, index: number) => {
    const isActive = location.pathname === item.href;
    return (
      <li key={index}>
        <Link
          to={item.href}
          className={cn(
            'flex items-center py-2.5 px-3 rounded-md text-sm font-medium transition-colors',
            isActive
              ? 'bg-sidebar-primary text-sidebar-primary-foreground'
              : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
          )}
        >
          <item.icon className="mr-3 h-5 w-5" />
          {item.label}
        </Link>
      </li>
    );
  };

  return (
    <aside className="fixed top-0 left-0 z-20 h-screen w-64 bg-sidebar text-sidebar-foreground flex flex-col items-stretch">
      <div className="flex items-center justify-between h-[70px] px-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <Briefcase className="h-8 w-8 text-sidebar-primary" /> 
          <span className="text-xl font-bold text-sidebar-foreground">CRM Inc.</span>
        </Link>
        {/* Mobile menu button - can be hidden on larger screens with Tailwind classes if responsive sidebar is needed */}
        {/* <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden text-sidebar-foreground">
          <Menu className="h-6 w-6" />
        </button> */}
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-1.5">
        <ul className="space-y-1.5">
          {mainNavItems.map(renderNavItem)}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <ul className="space-y-1.5">
          {bottomNavItems.map(renderNavItem)}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarNav;
