import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Menu, X, ChevronDown, Users, Settings, LogOut, UserCog } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout as logoutAction } from '../../features/auth/authSlice'

// ✅ ForwardRef wrapper for React Router Link
const LinkWithRef = React.forwardRef(({ to, ...props }, ref) => (
  <RouterLink ref={ref} to={to} {...props} />
))
LinkWithRef.displayName = 'LinkWithRef'

const Navbar = () => {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const logout = () => {
    dispatch(logoutAction())
    navigate('/signin')
  }

  const navItems = [
    { name: 'Yangiliklar', href: '/news' },
    { name: 'Tadbirlar', href: '/events' },
    { name: 'Do\'kon', href: '/shop' },
    { name: 'Mening sinfim', href: '/myclass', studentOnly:true },
    { name: 'Ball olish', href: '/requests', studentOnly:true,},
    { name: 'Ball olish', href: '/requests', classOnly:true,},
    { name: 'Sinflar', href: '/classes', adminOnly:true },
    { name: 'Tranzaksiyalar', href: '/transactions', adminOnly:true },
    { name: 'So\'rovlar', href: '/requests', adminOnly:true },
    { name: 'Adminlar', href: '/admin-management', adminOnly:true, admin1:true },
  ]
  .filter(el=>{
    if(el.adminOnly && auth.user?.role !== "admin") return false
    if (el.admin1 === true && auth.user?.login !== "admin1") return false
    if(el.studentOnly && auth.user?.role !== "student") return false
    if(el.classOnly && auth.user?.role !== "class") return false
    return true
  })

  return (
    <nav
      className={cn(
        'top-0 left-0 right-0 transition-all duration-300 ease-out border-b border-border/80',
        'bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-sm'
      )}
    >
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <RouterLink to="/">
              <div className="flex items-center space-x-2 group cursor-pointer">
                <div className="relative">
                  <div className="w-15 h-15 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-110">
                     {/* eslint-disable-next-line react/no-unknown-property */}
                    <img src="/logo3.png" fetchpriority='high' alt="Logo" className='w-full h-full' />
                  </div>
                  <div className="absolute -inset-1 bg-accent/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <span className="text-xl font-bold text-foreground tracking-tight hover:text-accent-foreground">
                  Presidency
                </span>
              </div>
            </RouterLink>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Button
                  asChild
                  key={item.name}
                  variant="ghost"
                  size="lg"
                  className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200 font-medium rounded-lg hover:bg-accent"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <LinkWithRef to={item.href}>{item.name}</LinkWithRef>
                </Button>
              ))}
            </div>
          </div>

          {/* Right side - User menu and sign in */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Dropdown */}
            <div className="hidden lg:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-all duration-200 group px-3 py-2 rounded-lg hover:bg-accent"
                    id="user-icon"
                    aria-label="user-icon"
                  >
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-muted/50 transition-colors duration-200">
                      <Users className="w-4 h-4" />
                    </div>
                    <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 animate-slide-down bg-card/95 backdrop-blur-xl border border-border/50"
                >
                  <DropdownMenuItem onClick={()=>navigate("/profile")} className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 transition-colors duration-200">
                    <UserCog className="w-4 h-4" />
                    <span>Profil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=>navigate("/settings")} className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 transition-colors duration-200">
                    <Settings className="w-4 h-4" />
                    <span>Sozlamalar</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="flex items-center space-x-2 cursor-pointer hover:bg-muted/50 transition-colors duration-200 text-destructive focus:text-destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Chiqish</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Sign In Button */}
            {!auth.isAuthenticated && (
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-6 py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-accent/25 cursor-pointer"
              >
                <LinkWithRef to="/signin">Kirish</LinkWithRef>
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className=" animate-slide-down">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card/95 backdrop-blur-xl rounded-lg mt-2 border border-border/50">
              {navItems.map((item, index) => (
                <Button
                  asChild
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <LinkWithRef to={item.href}>{item.name}</LinkWithRef>
                </Button>
              ))}
              <div className="pt-2 border-t border-border/50">
              <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 cursor-pointer"
                  onClick={()=>navigate("/profile")}
                >
                  <UserCog className="w-4 h-4 mr-2" />
                  Profil
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200 cursor-pointer"
                  onClick={()=>navigate("/settings")}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Sozlamalar
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-destructive hover:text-destructive hover:bg-accent transition-colors duration-200 cursor-pointer"
                  onClick={logout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Chiqish
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
