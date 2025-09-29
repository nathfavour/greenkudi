import type { Metadata } from "next";
import { Card } from "../components/Card";

export const metadata: Metadata = {
  title: "Rewards — GreenKudi",
};

export default function RewardsPage() {
  const points = 1247; // mock
  const tiers = [
    { 
      id: "t1", 
      name: "Airtime Top-up", 
      cost: 100, 
      icon: "📱", 
      description: "MTN, Glo, Airtel, 9mobile",
      popular: true 
    },
    { 
      id: "t2", 
      name: "Mobile Money", 
      cost: 300, 
      icon: "💳", 
      description: "Bank transfer or mobile wallet",
      popular: false 
    },
    { 
      id: "t3", 
      name: "Eco Shop Discount", 
      cost: 200, 
      icon: "🛍️", 
      description: "20% off sustainable products",
      popular: false 
    },
    { 
      id: "t4", 
      name: "Carbon Credits", 
      cost: 500, 
      icon: "🌱", 
      description: "Certified carbon offset tokens",
      popular: false 
    },
  ];

  const activities = [
    { icon: "📸", action: "Report waste hotspot with photo", points: "+20 pts" },
    { icon: "♻️", action: "Drop off recyclables at center", points: "+50 pts" },
    { icon: "✅", action: "Verify community report", points: "+10 pts" },
    { icon: "🏆", action: "Complete weekly challenge", points: "+100 pts" },
    { icon: "👥", action: "Refer a friend who reports", points: "+25 pts" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <header className="page-header">
        <h1 className="page-title">Rewards Center</h1>
        <p className="page-subtitle">Earn points for environmental impact, redeem for real value</p>
      </header>

      {/* Points Balance */}
      <Card variant="elevated" padding="lg" className="text-center bg-gradient-to-br from-[--primary] to-[--primary-dark] text-white">
        <div className="mb-4">
          <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
            <span className="text-3xl">🎁</span>
          </div>
          <p className="text-white/80 text-sm mb-2">Your Balance</p>
          <p className="text-5xl font-bold mb-2">{points.toLocaleString()}</p>
          <p className="text-white/90 text-lg">GreenKudi Points</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-white/80">Reports This Month</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">3.2kg</p>
            <p className="text-xs text-white/80">Recycled</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">4th</p>
            <p className="text-xs text-white/80">Community Rank</p>
          </div>
        </div>
      </Card>

      {/* Rewards Grid */}
      <div>
        <h2 className="text-2xl font-bold text-[--text-primary] mb-6">Redeem Rewards</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <Card 
              key={tier.id} 
              variant={tier.popular ? "elevated" : "default"} 
              padding="lg" 
              className="text-center relative"
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="status-badge bg-[--primary] text-white text-xs">Most Popular</span>
                </div>
              )}
              
              <div className="w-12 h-12 mx-auto bg-[--primary-50] rounded-xl flex items-center justify-center text-2xl mb-4">
                {tier.icon}
              </div>
              
              <h3 className="text-lg font-bold text-[--text-primary] mb-2">{tier.name}</h3>
              <p className="text-sm text-[--text-secondary] mb-4">{tier.description}</p>
              
              <div className="mb-4">
                <span className="text-2xl font-bold text-[--text-primary]">{tier.cost}</span>
                <span className="text-sm text-[--text-muted] ml-1">pts</span>
              </div>
              
              <button 
                className={`btn-primary w-full ${points < tier.cost ? 'opacity-50 cursor-not-allowed' : ''}`} 
                disabled={points < tier.cost}
              >
                {points < tier.cost ? 'Not Enough Points' : 'Redeem Now'}
              </button>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <Card variant="elevated" padding="lg">
        <h2 className="text-2xl font-bold text-[--text-primary] mb-6 flex items-center gap-3">
          <span className="w-8 h-8 rounded-lg bg-[--primary-50] flex items-center justify-center">💰</span>
          How to Earn Points
        </h2>
        
        <div className="grid sm:grid-cols-2 gap-4">
          {activities.map((activity, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[--surface-elevated] hover:bg-[--surface-secondary] transition-colors duration-200">
              <div className="w-10 h-10 bg-[--primary-50] rounded-lg flex items-center justify-center text-lg">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="font-medium text-[--text-primary] text-sm">{activity.action}</p>
                <p className="text-[--primary] font-bold text-sm">{activity.points}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Weekly Challenge */}
      <Card variant="elevated" padding="lg" className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
            <span className="text-white text-xl">🏆</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-purple-800 mb-2">Weekly Challenge</h3>
            <p className="text-purple-700 mb-4">
              Report 5 waste hotspots this week and earn a bonus 100 points!
            </p>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 bg-purple-200 rounded-full h-2">
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
              <span className="text-sm font-medium text-purple-800">3/5 completed</span>
            </div>
            <button className="btn-primary bg-gradient-to-r from-purple-500 to-pink-600 border-0">
              Continue Challenge
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
