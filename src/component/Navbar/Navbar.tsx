import { useContext, useState } from "react";
import {
  Avatar,
  Button, Dropdown, Label
} from "@heroui/react";
import { Home, User, MessageSquare, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { userContext } from "../../context/userDataContext";
import { AuthContext } from "../../context/AuthContext";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {

  const location = useLocation();
  const { userData } = useContext(userContext)
  const { setToken } = useContext(AuthContext)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate()
  const query = useQueryClient()

  function logoutSystem() {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/auth/login')
    query.removeQueries({ queryKey: ['userData'] })
  }

  return (
    <header className="w-full fixed top-0 bg-white border-b shadow-sm z-10">
      <div className="w-full py-3 px-4 md:px-8 flex items-center justify-between">

        {/* الجزء الأيسر: الشعار وزر الموبايل */}
        <div className="flex items-center gap-3">
          <button
            className="md:hidden p-1 text-slate-600 hover:text-slate-900 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex items-center justify-center bg-[#0d2a5c] text-white font-bold rounded-xl w-10 h-10 md:w-12 md:h-12 text-[10px] md:text-[11px] tracking-wider">
            ROUTE
          </div>
          <p className="font-bold text-lg md:text-xl text-[#0d2a5c] hidden sm:block">
            Route Posts
          </p>
        </div>

        {/* الجزء الأوسط: أزرار التنقل (Desktop Only) */}
        <nav className="hidden md:flex gap-1 bg-slate-50 border border-slate-200/60 p-1.5 rounded-full shadow-sm">
          <Link to="/Feed">
            <Button variant="tertiary" className={`rounded-full font-semibold px-5 inline-flex items-center gap-2 transition ${location.pathname === "/Feed" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:bg-slate-100/50"}`}>
              <Home size={18} strokeWidth={2.5} />
              Feed
            </Button>
          </Link>

          <Link to="/Profile">
            <Button variant="tertiary" className={`rounded-full font-semibold px-5 inline-flex items-center gap-2 transition ${location.pathname === "/Profile" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:bg-slate-100/50"}`}>
              <User size={18} strokeWidth={2.5} />
              Profile
            </Button>
          </Link>

          <Link to="/Notification">
            <Button variant="tertiary" className={`rounded-full font-semibold px-5 inline-flex items-center gap-2 transition ${location.pathname === "/Notification" ? "bg-white text-blue-600 shadow-sm" : "text-slate-600 hover:bg-slate-100/50"}`}>
              <MessageSquare size={18} strokeWidth={2.5} />
              Notifications
            </Button>
          </Link>
        </nav>

        {/* drop down in disktop */}
        <Dropdown>
          <Button
            aria-label="Menu"
            variant="secondary"
            className="hidden md:flex items-center gap-2"
          >
            {/* الصورة */}
            <Avatar size="sm" className="w-7 h-7 border border-slate-200">
              <Avatar.Image
                src={userData?.photo}
                alt="shimaa"
              />
              <Avatar.Fallback>...</Avatar.Fallback>
            </Avatar>

            {/* الاسم */}
            <span>{userData?.name}</span>
          </Button>

          <Dropdown.Popover>
            <Dropdown.Menu onAction={(key) => console.log(`Selected: ${key}`)}>
              <Dropdown.Item id="copy-link" textValue="Copy link">
                <Link to={'/Profile'}>
                  <Label>Profile</Label>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item id="edit-file" textValue="Settings">
                <Link to="/change-password" className="w-full block">
                  <Label>Change Password</Label>
                </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { logoutSystem() }} id="delete-file" textValue="Delete file" variant="danger">
                <Label>Logout</Label>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown.Popover>
        </Dropdown>
      </div>

      {/* قائمة الموبايل */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50 flex flex-col gap-2">
          <Link to="/Feed" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="primary" className={`w-full justify-start gap-3 ${location.pathname === "/Feed" ? "bg-blue-600 text-white shadow-sm" : "bg-white text-slate-600 hover:bg-slate-200/50"}`}>
              <Home size={18} strokeWidth={2.5} />
              Feed
            </Button>
          </Link>

          <Link to="/Profile" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="tertiary" className={`w-full justify-start gap-3 ${location.pathname === "/Profile" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-200/50"}`}>
              <User size={18} strokeWidth={2.5} />
              Profile
            </Button>
          </Link>

          <Link to="/Notification" onClick={() => setIsMobileMenuOpen(false)}>
            <Button variant="tertiary" className={`w-full justify-start gap-3 ${location.pathname === "/Notification" ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:bg-slate-200/50"}`}>
              <MessageSquare size={18} strokeWidth={2.5} />
              Notifications
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}