import React from 'react';
import { motion } from 'framer-motion';

function LandingPage({ onStartGame }) {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8">
        {/* Animated Background Orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-to-br from-gray-400/10 to-gray-500/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.02, 0.05, 0.02],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-gray-300/10 to-gray-400/10 blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-gray-500/10 to-gray-600/10 blur-3xl"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-block bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent">
                Bingo
              </span>
              <br />
              <span className="inline-block bg-gradient-to-r from-gray-400 via-gray-300 to-gray-400 bg-clip-text text-transparent">
                Reimagined
              </span>
            </motion.h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Where classic gameplay meets modern learning. Experience the joy of Bingo 
            with vibrant modes designed to spark curiosity and delight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(107, 114, 128, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={onStartGame}
              className="group relative px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg shadow-gray-900/30 transition-all duration-300"
            >
              <span className="relative z-10 flex items-center gap-3">
                <span>Start Playing</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection('features')}
              className="px-8 py-4 sm:px-10 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl glass-strong text-white hover:bg-white/10 transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16"
          >
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-400 hover:text-white transition-colors duration-300"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Why You'll Love It
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Modern design meets timeless gameplay with features that make every round exciting
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Classic Fun',
                description: 'Experience traditional Bingo with a modern twist. Compete against CPU and race to complete lines.',
                gradient: 'from-gray-500/10 to-gray-600/10',
                borderGradient: 'from-gray-400 to-gray-500'
              },
              {
                icon: '🍎',
                title: 'Learn While Playing',
                description: 'Educational Word Bingo mode helps children learn fruits through engaging, interactive hints.',
                gradient: 'from-gray-400/10 to-gray-500/10',
                borderGradient: 'from-gray-300 to-gray-400'
              },
              {
                icon: '✨',
                title: 'Beautiful Design',
                description: 'Immersive design, smooth animations, and responsive layout create a premium experience.',
                gradient: 'from-gray-600/10 to-gray-700/10',
                borderGradient: 'from-gray-500 to-gray-600'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative glass-card rounded-3xl p-8 h-full border-2 border-transparent hover:border-opacity-100 transition-all duration-500">
                  <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 bg-gradient-to-br ${feature.borderGradient} transition-opacity duration-500`} />
                  <div className="relative z-10">
                    <div className="text-6xl mb-6">{feature.icon}</div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Game Modes Section */}
      <section id="modes" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
              Choose Your Adventure
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
              Two unique game modes designed for different kinds of fun
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              {
                icon: '🎮',
                title: 'Fun Bingo',
                description: 'Classic number-based Bingo! Race against the CPU to complete rows, columns, or diagonals. Strategic, competitive, and endlessly entertaining.',
                features: ['1v1 CPU Competition', 'Strategic Gameplay', 'Multiple Win Conditions'],
                gradient: 'from-gray-600 to-gray-700',
                glowColor: 'gray'
              },
              {
                icon: '🍎',
                title: 'Word Bingo',
                description: 'Educational fruit matching! Read fun hints and find the matching fruit on your board. Perfect for learning while having a blast.',
                features: ['Child-Friendly Hints', 'Educational Content', 'Colorful Fruit Theme'],
                gradient: 'from-gray-500 to-gray-600',
                glowColor: 'gray'
              }
            ].map((mode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.gradient} rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />
                <div className="relative glass-card rounded-3xl p-8 sm:p-10 border-2 border-white/10 group-hover:border-white/20 transition-all duration-500">
                  <div className="text-7xl mb-6">{mode.icon}</div>
                  <h3 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r ${mode.gradient} bg-clip-text text-transparent">
                    {mode.title}
                  </h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {mode.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {mode.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-400">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${mode.gradient}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onStartGame}
                    className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${mode.gradient} text-white shadow-lg hover:shadow-gray-800/30 transition-all duration-300`}
                  >
                    Try {mode.title}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.02, 0.04, 0.02],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-br from-gray-700/10 via-gray-500/10 to-gray-600/10"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
            <span className="inline-block bg-gradient-to-r from-gray-200 via-white to-gray-200 bg-clip-text text-transparent">
              Ready to Play?
            </span>
          </h2>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed">
            Join the fun and experience Bingo like never before. 
            <br className="hidden sm:block" />
            Your next favorite game is just one click away.
          </p>
          <motion.button
            whileHover={{ scale: 1.08, boxShadow: "0 20px 50px rgba(107, 114, 128, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="group relative px-12 py-6 rounded-2xl font-bold text-2xl overflow-hidden bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-2xl shadow-gray-900/40 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-3">
              <span>Start Your Game</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-3xl"
              >
                🎯
              </motion.span>
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

export default LandingPage;
