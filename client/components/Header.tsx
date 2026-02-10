import { Link } from "react-router-dom";
import { ShoppingCart, User, X, LogOut, Menu } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import LoginModal from "./LoginModal";

export default function Header() {
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      {/* Promo Banner */}
      <div className="w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden border-b border-slate-700">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-2 md:py-2.5 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 md:gap-3">
            {/* Left - Message */}
            <div className="flex items-center justify-center md:justify-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                </svg>
              </div>
              <div className="text-center md:text-left">
                <p className="font-jakarta font-bold text-white text-xs md:text-sm leading-tight">
                  Limited Time Offer
                </p>
                
              </div>
            </div>

            {/* Center - CTA Button */}
            <Link
  to="/shop"
  className="inline-flex items-center justify-center gap-1.5 px-4 md:px-6 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-jakarta font-bold text-xs md:text-sm hover:shadow-lg hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
>
  <span>Shop Now</span>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
</Link>

            {/* Right - Close Button */}
            {/*<button className="ml-auto md:ml-0 text-slate-400 hover:text-white transition-colors duration-300 p-1">
              <X className="w-4 h-4" />
            </button>*/}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="w-full border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 lg:py-5">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9c433034c4a24db1918d9c9892cfb057%2Ff519aab05c754ba7a8d5b80de58d057f?format=webp&width=180"
                alt="The Activerse"
                className=" w-auto"
              />
            </Link>

            {/* Navigation */}
            <nav className="hidden lg:flex items-center gap-8 text-[18px] font-poppins font-medium">
              <Link to="/" className="hover:text-brand-green transition">
                Home
              </Link>
              <Link to="/shop" className="hover:text-brand-green transition">
                Shop
              </Link>
              <Link to="/vendors" className="hover:text-brand-green transition">
                Vendors
              </Link>
              <Link to="/features" className="hover:text-brand-green transition">
                Features
              </Link>
              <Link to="/contact" className="hover:text-brand-green transition">
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <Link
                to="/cart"
                className="relative hover:text-blue-600 transition"
                aria-label="View cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                onClick={() => setShowMobileMenu(true)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md hover:bg-slate-100 transition"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              {/* User Menu */}
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:text-blue-600 transition"
                  >
                    {user.photo ? (
                      <img
                        src={user.photo}
                        alt={user.name}
                        className="w-6 h-6 rounded-full"
                      />
                    ) : (
                      <User className="w-6 h-6" />
                    )}
                    <span className="hidden md:inline font-jakarta font-medium text-[14px]">
                      {user.username || user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-[10px] shadow-lg border border-[#E0E0E0] z-50">
                      <div className="p-4 border-b">
                        <p className="font-jakarta font-bold text-[14px]">
                          {user.name}
                        </p>
                        <p className="font-jakarta font-medium text-[12px] text-[#7E7E7E]">
                          {user.username && `@${user.username}`}
                        </p>
                        <p className="font-jakarta font-medium text-[12px] text-[#7E7E7E]">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        to="/my-account"
                        onClick={() => setShowUserMenu(false)}
                        className="w-full block px-4 py-3 text-left font-jakarta font-medium text-[14px] text-slate-700 hover:bg-slate-50 transition border-b"
                      >
                        My Account
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-left font-jakarta font-medium text-[14px] text-red-600 hover:bg-red-50 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden lg:inline-block font-poppins font-medium text-[16px] lg:text-[18px] hover:text-blue-600 transition"
                >
                  Login / Sign Up
                </button>
              )}

              <Link
                to="https://admin.theactiverse.com/register"
                target="_blank"
                rel="noopener noreferrer" style={{ backgroundColor: "#f38714" }}
                className="hidden lg:inline-flex items-center justify-center px-4 py-3 bg-brand-blue text-white rounded-[10px] font-poppins font-medium text-[18px] hover:opacity-90 transition"
              >
                Seller Sign Up
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu (visible on small screens) */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black opacity-40"
            onClick={() => setShowMobileMenu(false)}
          />

          <div className="relative bg-white h-full w-full p-6 overflow-auto">
            <div className="flex items-center justify-between mb-6">
              <Link to="/" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-2">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets%2F9c433034c4a24db1918d9c9892cfb057%2Ff519aab05c754ba7a8d5b80de58d057f?format=webp&width=180"
                  alt="The Activerse"
                  className="w-auto h-8"
                />
              </Link>
              <button onClick={() => setShowMobileMenu(false)} className="p-2 rounded-md">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-lg font-medium">
              <Link to="/" onClick={() => setShowMobileMenu(false)} className="hover:text-brand-green transition">
                Home
              </Link>
              <Link to="/shop" onClick={() => setShowMobileMenu(false)} className="hover:text-brand-green transition">
                Shop
              </Link>
              <Link to="/vendors" onClick={() => setShowMobileMenu(false)} className="hover:text-brand-green transition">
                Vendors
              </Link>
              <Link to="/features" onClick={() => setShowMobileMenu(false)} className="hover:text-brand-green transition">
                Features
              </Link>
              <Link to="/contact" onClick={() => setShowMobileMenu(false)} className="hover:text-brand-green transition">
                Contact
              </Link>
            </nav>

            <div className="mt-6 flex flex-col gap-4">
              <Link to="/cart" onClick={() => setShowMobileMenu(false)} className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
                {cartItemCount > 0 && (
                  <span className="ml-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {isAuthenticated && user ? (
                <>
                  <div className="border-t pt-4">
                    <p className="font-jakarta font-bold">{user.name}</p>
                    <p className="font-jakarta text-sm text-[#7E7E7E]">{user.email}</p>
                    <Link to="/my-account" onClick={() => setShowMobileMenu(false)} className="block mt-3 text-sm font-medium">My Account</Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowMobileMenu(false);
                      }}
                      className="mt-2 text-red-600 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setShowMobileMenu(false);
                  }}
                  className="font-poppins font-medium text-[16px] lg:text-[18px] hover:text-blue-600 transition text-left"
                >
                  Login / Sign Up
                </button>
              )}

              <Link
                to="https://admin.theactiverse.com/register"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setShowMobileMenu(false)}
                className="inline-flex items-center justify-center px-4 py-3 bg-brand-blue text-white rounded-[10px] font-poppins font-medium text-[16px] hover:opacity-90 transition"
              >
                Seller Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </>
  );
}
