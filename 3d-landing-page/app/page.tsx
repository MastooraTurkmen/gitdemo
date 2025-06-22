"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap, Shield, Rocket, Users, Award, Menu, X } from "lucide-react";
import { useState } from "react";

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-xl font-bold text-white">3D Future</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a
                href="#home"
                className="text-white hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-blue-400 px-3 py-2 text-sm font-medium transition-colors"
              >
                Testimonials
              </a>
              <Button
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Get Started
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-md">
              <a
                href="#home"
                className="text-white block px-3 py-2 text-base font-medium"
              >
                Home
              </a>
              <a
                href="#features"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                Features
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                About
              </a>
              <a
                href="#testimonials"
                className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              >
                Testimonials
              </a>
              <div className="px-3 py-2">
                <Button
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Blue Gradient Cube Component
function BlueCube({
  position,
  scale = 1,
  delay = 0,
}: {
  position: [number, number, number];
  scale?: number;
  delay?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5 + delay;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 + delay;
      meshRef.current.position.y =
        position[1] +
        Math.sin(state.clock.elapsedTime + delay + position[0]) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#3b82f6"
        metalness={0.9}
        roughness={0.1}
        emissive="#1e40af"
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Pyramid Component
function Pyramid({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <coneGeometry args={[1.5, 2, 4]} />
      <meshStandardMaterial
        color="#60a5fa"
        metalness={0.8}
        roughness={0.2}
        emissive="#2563eb"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
}

// Path/Road Component
function Path() {
  return (
    <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 4]} />
      <meshStandardMaterial
        color="#1e293b"
        metalness={0.3}
        roughness={0.7}
        emissive="#0f172a"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#60a5fa" />
      <pointLight position={[-10, 10, 10]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[0, -10, 5]} intensity={0.8} color="#1e40af" />

      {/* Path/Road */}
      <Path />

      {/* Pyramid on top of the path */}
      <Pyramid position={[0, 0, 0]} />

      {/* Left side cubes (6 cubes) */}
      <BlueCube position={[-8, 2, -2]} scale={0.8} delay={0} />
      <BlueCube position={[-6, 0, -1]} scale={1.0} delay={0.5} />
      <BlueCube position={[-7, -1, 1]} scale={0.7} delay={1.0} />
      <BlueCube position={[-9, 1, 0]} scale={0.9} delay={1.5} />
      <BlueCube position={[-5, 3, -3]} scale={0.6} delay={2.0} />
      <BlueCube position={[-8, -2, 2]} scale={1.1} delay={2.5} />

      {/* Right side cubes (6 cubes) */}
      <BlueCube position={[8, 2, -2]} scale={0.8} delay={3.0} />
      <BlueCube position={[6, 0, -1]} scale={1.0} delay={3.5} />
      <BlueCube position={[7, -1, 1]} scale={0.7} delay={4.0} />
      <BlueCube position={[9, 1, 0]} scale={0.9} delay={4.5} />
      <BlueCube position={[5, 3, -3]} scale={0.6} delay={5.0} />
      <BlueCube position={[8, -2, 2]} scale={1.1} delay={5.5} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxDistance={15}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
      />
      <Environment preset="night" />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section with 3D */}
      <section
        id="home"
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
      >
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 5, 12], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
            Future is Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of digital innovation with our
            cutting-edge 3D solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-blue-500 text-blue-400 hover:bg-blue-600 hover:text-white text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover the capabilities that make our platform the choice for
              forward-thinking businesses
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Lightning Fast
                </h3>
                <p className="text-gray-400">
                  Optimized performance that delivers results at the speed of
                  light
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8 text-center">
                <Shield className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Secure & Reliable
                </h3>
                <p className="text-gray-400">
                  Enterprise-grade security with 99.9% uptime guarantee
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8 text-center">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                <h3 className="text-2xl font-bold mb-4 text-white">Scalable</h3>
                <p className="text-gray-400">
                  Grows with your business from startup to enterprise
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                About Our Vision
              </h2>
              <p className="text-xl text-gray-400 mb-6">
                We're pioneering the future of digital experiences through
                innovative 3D technology and immersive design.
              </p>
              <p className="text-gray-400 mb-8">
                Our team of experts combines cutting-edge technology with
                creative vision to deliver solutions that transform how
                businesses connect with their audiences. From interactive 3D
                experiences to seamless user interfaces, we're building the
                tools that power tomorrow's digital landscape.
              </p>
              <div className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">500+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">50+</div>
                  <div className="text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">5+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors p-6">
                <Users className="w-8 h-8 mb-4 text-blue-400" />
                <h4 className="font-bold text-white mb-2">Expert Team</h4>
                <p className="text-sm text-gray-400">
                  Skilled professionals dedicated to excellence
                </p>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors p-6">
                <Award className="w-8 h-8 mb-4 text-blue-400" />
                <h4 className="font-bold text-white mb-2">Award Winning</h4>
                <p className="text-sm text-gray-400">
                  Recognized for innovation and quality
                </p>
              </Card>
              <Card className="bg-gray-900 border-gray-800 hover:border-blue-500 transition-colors p-6 col-span-2">
                <Zap className="w-8 h-8 mb-4 text-blue-400" />
                <h4 className="font-bold text-white mb-2">Innovation First</h4>
                <p className="text-sm text-gray-400">
                  Always pushing the boundaries of what's possible
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-400">
              Don't just take our word for it - hear from our satisfied
              customers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue-400 text-blue-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "The 3D experience they created for our product launch was
                  absolutely stunning. It increased our engagement by 300%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Sarah Johnson</div>
                    <div className="text-gray-400 text-sm">CEO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue-400 text-blue-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Professional, innovative, and delivered beyond our
                  expectations. The team truly understands modern design."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Michael Chen</div>
                    <div className="text-gray-400 text-sm">
                      Creative Director, DesignStudio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-blue-500 transition-colors">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-blue-400 text-blue-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Their attention to detail and technical expertise helped us
                  create an immersive experience our users love."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Emily Rodriguez</div>
                    <div className="text-gray-400 text-sm">
                      Product Manager, InnovateLab
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <span className="text-2xl font-bold text-white">3D Future</span>
              </div>
              <p className="text-gray-400 mb-4">
                Pioneering the future of digital experiences through innovative
                3D technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  3D Design
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Web Development
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Interactive Experiences
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Consulting
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  About Us
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Blog
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Contact
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Twitter
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  LinkedIn
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  GitHub
                </li>
                <li className="hover:text-blue-400 cursor-pointer transition-colors">
                  Dribbble
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} 3D Future. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
