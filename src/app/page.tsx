import Link from "next/link";
import { Card } from "./components/Card";

export default function Home() {
  const stats = [
    { label: "Reports Submitted", value: "1,248", icon: "📊", change: "+12%" },
    { label: "Waste Collected", value: "12.4t", icon: "♻️", change: "+8%" },
    { label: "Active Communities", value: "23", icon: "🏘️", change: "+3%" },
    { label: "Rewards Earned", value: "₦85k", icon: "💰", change: "+15%" },
  ];

  const features = [
    {
      icon: "🗺️",
      title: "Smart Mapping",
      description: "AI-powered waste hotspot detection with real-time community reporting",
      action: "Start Mapping",
      href: "/map",
      gradient: "from-emerald-500 to-teal-600"
    },
    {
      icon: "♻️",
      title: "Recycling Centers",
      description: "Find nearest waste-to-energy facilities with live capacity updates",
      action: "Find Centers",
      href: "/centers",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: "🎁",
      title: "Earn Rewards",
      description: "Get points for reporting, recycling, and community participation",
      action: "View Rewards",
      href: "/rewards",
      gradient: "from-purple-500 to-pink-600"
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="animate-slide-up">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--primary-50] text-[--primary] text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-[--primary] rounded-full animate-pulse"></span>
              Building cleaner African cities
            </div>
          </div>
          
          <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-[--primary] via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            GreenKudi
          </h1>
          
          <p className="text-xl lg:text-2xl text-[--text-secondary] mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform waste into <span className="text-[--primary] font-semibold">opportunity</span> through 
            community mapping, gamified rewards, and data-driven insights.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/map" className="btn-primary text-lg px-8 py-4">
              🗺️ Report Waste Hotspot
            </Link>
            <Link href="/centers" className="btn-secondary text-lg px-8 py-4">
              ♻️ Find Centers
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="animate-fade-in">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[--text-primary] mb-2">Real Impact</h2>
          <p className="text-[--text-secondary]">Community-driven results across Nigeria</p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} variant="elevated" padding="md" className="text-center animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-[--text-primary] mb-1">{stat.value}</div>
              <div className="text-sm text-[--text-secondary] mb-2">{stat.label}</div>
              <div className="status-badge status-success text-xs">
                {stat.change} this month
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="animate-fade-in">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[--text-primary] mb-4">How GreenKudi Works</h2>
          <p className="text-lg text-[--text-secondary] max-w-2xl mx-auto">
            Three simple steps to start making a difference in your community
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <Card key={i} variant="interactive" padding="lg" className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              
              <h3 className="text-xl font-bold text-[--text-primary] mb-3">
                {feature.title}
              </h3>
              
              <p className="text-[--text-secondary] mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              <Link href={feature.href} className="btn-primary w-full">
                {feature.action}
              </Link>
            </Card>
          ))}
        </div>
      </section>

      {/* Mission Section */}
      <section className="animate-fade-in">
        <Card padding="lg" className="text-center bg-gradient-to-br from-[--primary-50] to-emerald-50 border-[--primary]/20">
          <div className="max-w-4xl mx-auto">
            <div className="text-4xl mb-4">🌍</div>
            <h2 className="text-3xl font-bold text-[--primary] mb-6">Our Mission</h2>
            <p className="text-lg text-[--text-secondary] mb-8 leading-relaxed">
              We are building a movement that transforms waste management across Africa. 
              By combining technology, community action, and economic incentives, we empower 
              citizens to create cleaner, more sustainable cities while earning rewards for their participation.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[--primary] rounded-xl flex items-center justify-center text-white text-xl mb-3">
                  🏗️
                </div>
                <h3 className="font-semibold text-[--text-primary] mb-2">Community Building</h3>
                <p className="text-sm text-[--text-secondary]">Unite neighborhoods for cleaner environments</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[--primary] rounded-xl flex items-center justify-center text-white text-xl mb-3">
                  📊
                </div>
                <h3 className="font-semibold text-[--text-primary] mb-2">Data-Driven Solutions</h3>
                <p className="text-sm text-[--text-secondary]">Smart insights for better city planning</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-[--primary] rounded-xl flex items-center justify-center text-white text-xl mb-3">
                  💚
                </div>
                <h3 className="font-semibold text-[--text-primary] mb-2">Sustainable Future</h3>
                <p className="text-sm text-[--text-secondary]">Waste-to-energy for circular economy</p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
