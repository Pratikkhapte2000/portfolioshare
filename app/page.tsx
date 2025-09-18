"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/lib/auth";
import { PortfolioService } from "@/lib/portfolio";
import { Portfolio } from "@/types/portfolio";
import { User } from "@/types/user";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import Dashboard from "@/components/Dashboard";
import Header from "@/components/Header";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      AuthService.getCurrentUser()
        .then((userData) => {
          setUser(userData);
          loadPortfolios();
        })
        .catch(() => {
          localStorage.removeItem("token");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadPortfolios = async () => {
    try {
      const data = await PortfolioService.getPortfolios();
      setPortfolios(data);
    } catch (error) {
      console.error("Failed to load portfolios:", error);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const response = await AuthService.login(username, password);
      setUser(response);
      await loadPortfolios();
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      const response = await AuthService.register(username, email, password);
      setUser(response);
      await loadPortfolios();
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setPortfolios([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Portfolio Tracker
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Manage your financial portfolio with real-time data and AI
              insights
            </p>
          </div>

          {showRegister ? (
            <RegisterForm
              onRegister={handleRegister}
              onSwitchToLogin={() => setShowRegister(false)}
            />
          ) : (
            <LoginForm
              onLogin={handleLogin}
              onSwitchToRegister={() => setShowRegister(true)}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen ">
      <Header user={user} onLogout={handleLogout} />
      <Dashboard portfolios={portfolios} onPortfolioUpdate={loadPortfolios} />
    </div>
  );
}
