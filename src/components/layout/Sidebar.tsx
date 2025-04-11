// Sidebar.tsx
import React, { useState } from 'react';
import { 
  ArrowLeft, 
  LayoutDashboard, 
  Users, 
  Truck, 
  User, 
  FileText, 
  MapPin, 
  Star, 
  Settings 
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard/home', icon: <LayoutDashboard size={20} /> },
  { label: 'Users', href: '/dashboard/users', icon: <Users size={20} /> },
  { label: 'Register New Vehicle', href: '/dashboard/register-new-vehicle', icon: <Truck size={20} /> },
  { label: 'Register New Driver', href: '/dashboard/register-new-driver', icon: <User size={20} /> },
  { label: 'User Form', href: '/dashboard/user-data-form', icon: <FileText size={20} /> },
  { label: 'Truck Allocation', href: '/dashboard/truck-allocation', icon: <Truck size={20} /> },
  { label: 'Vehicle Tracking', href: '/dashboard/vehicle-tracking', icon: <MapPin size={20} /> },
  { label: 'Driver Score', href: '/dashboard/driver-score', icon: <Star size={20} /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={20} /> },
];

const Sidebar: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(true);

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div
      className={`relative border-r bg-white text-black h-screen pt-8 transition-all duration-300 ${
        isMinimized ? 'w-20' : 'w-64'
      }`}
    >
      {/* Toggle Button in the top-right corner */}
      <div
        className="absolute top-8 right-0 transform translate-x-1/2 bg-white border rounded-full p-1 cursor-pointer"
        onClick={toggleSidebar}
      >
        <ArrowLeft
          className={`transition-transform ${isMinimized ? 'rotate-180' : ''}`}
          size={20}
        />
      </div>

      {/* Navigation Items */}
      <ul className="mt-10 space-y-2">
        {navItems.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="flex items-center gap-4 px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              <span>{item.icon}</span>
              {!isMinimized && <span className="text-sm font-medium">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      {/* "hi" at the bottom left */}
      {!isMinimized && (
        <div className="absolute bottom-4 left-4">
          <p>hi</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
