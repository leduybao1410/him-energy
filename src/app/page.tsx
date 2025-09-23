import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Zap, Leaf, Globe, TrendingUp, Shield, Users, Award } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"></div>
          <div className="absolute inset-0 opacity-40">
            <div className="w-full h-full" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat'
            }}></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-4 py-2 mb-8">
                <Zap className="h-4 w-4 text-cyan-400" />
                <span className="text-cyan-400 text-sm font-medium">The Future of Energy is Here</span>
              </div>

              <h1 className="text-6xl md:text-8xl font-extrabold mb-6 gradient-text">
                Powering a
                <br />
                <span className="text-white">Sustainable Future</span>
              </h1>

              <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                Harnessing the power of nature with cutting-edge technology to create a cleaner,
                brighter tomorrow for generations to come.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2">
                  <span>Discover Our Solutions</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="glass-effect text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:bg-cyan-500/20 border border-cyan-500/30">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-1/4 left-10 float-animation">
            <div className="w-20 h-20 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-xl"></div>
          </div>
          <div className="absolute bottom-1/4 right-10 float-animation" style={{ animationDelay: '1s' }}>
            <div className="w-32 h-32 bg-gradient-to-r from-purple-400/20 to-cyan-500/20 rounded-full blur-xl"></div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900/50 to-black/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">500+</div>
                <div className="text-gray-400">Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">2.5GW</div>
                <div className="text-gray-400">Energy Generated</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">50+</div>
                <div className="text-gray-400">Countries Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-bold gradient-text">99.9%</div>
                <div className="text-gray-400">Uptime Guarantee</div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions Section */}
        <section id="solutions" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 gradient-text">Our Energy Solutions</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Cutting-edge renewable energy technologies designed to power the future sustainably
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="group glass-effect p-8 rounded-2xl hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Image src="/solar.svg" alt="Solar Power" width={32} height={32} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-2xl mx-auto blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Solar Energy</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Advanced photovoltaic solutions with AI-optimized efficiency for residential and commercial applications.
                </p>
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="group glass-effect p-8 rounded-2xl hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Image src="/wind.svg" alt="Wind Power" width={32} height={32} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-2xl mx-auto blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Wind Power</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Next-generation wind turbines with smart grid integration and maximum energy capture technology.
                </p>
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="group glass-effect p-8 rounded-2xl hover:bg-cyan-500/10 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <Image src="/hydro.svg" alt="Hydro Power" width={32} height={32} className="text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-2xl mx-auto blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Hydroelectric</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  Innovative hydroelectric systems with minimal environmental impact and maximum efficiency.
                </p>
                <div className="flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
                  <span className="text-sm font-medium">Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gradient-to-r from-slate-900/50 to-black/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold mb-6 gradient-text">Why Choose Us</h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Leading the energy revolution with innovation, reliability, and sustainability
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">100% Sustainable</h3>
                <p className="text-gray-400">Zero carbon footprint solutions for a greener planet</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Maximum Efficiency</h3>
                <p className="text-gray-400">AI-optimized systems for peak performance</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Reliable & Safe</h3>
                <p className="text-gray-400">Enterprise-grade security and 99.9% uptime</p>
              </div>

              <div className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Award Winning</h3>
                <p className="text-gray-400">Recognized globally for innovation excellence</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="glass-effect rounded-3xl p-12 text-center border border-cyan-500/20">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
                Ready to Power Your Future?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of satisfied customers who have already made the switch to sustainable energy solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25 flex items-center space-x-2">
                  <span>Start Your Project</span>
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="text-cyan-400 hover:text-cyan-300 font-semibold py-4 px-8 transition-colors">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}