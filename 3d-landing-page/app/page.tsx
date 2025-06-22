"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Zap, Shield, Rocket, Users, Award } from "lucide-react";

// Animated Cube Component
function AnimatedCube({
  position,
  scale = 1,
}: {
  position: [number, number, number];
  scale?: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#dfa316"
        metalness={0.8}
        roughness={0.2}
        emissive="#333333"
        emissiveIntensity={0.1}
      />
    </mesh>
  );
}

// 3D Scene Component
function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      {/* Multiple cubes arranged in a pattern */}
      <AnimatedCube position={[0, 0, 0]} scale={1.5} />
      <AnimatedCube position={[-3, 1, -2]} scale={0.8} />
      <AnimatedCube position={[3, -1, -1]} scale={1.2} />
      <AnimatedCube position={[-2, -2, 1]} scale={0.6} />
      <AnimatedCube position={[2, 2, -3]} scale={1} />
      <AnimatedCube position={[0, -3, -2]} scale={0.9} />
      <AnimatedCube position={[-4, 0, 1]} scale={0.7} />
      <AnimatedCube position={[4, 1, 2]} scale={1.1} />

      <OrbitControls enableZoom={false} enablePan={false} />
      <Environment preset="night" />
    </>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with 3D */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Future is Here
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Experience the next generation of digital innovation with our
            cutting-edge 3D solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-black hover:bg-gray-200 text-lg px-8 py-3"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-black text-lg px-8 py-3"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gray-900">
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
            <Card className="bg-black border-gray-800 hover:border-gray-600 transition-colors">
              <CardContent className="p-8 text-center">
                <Zap className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
                <h3 className="text-2xl font-bold mb-4 text-white">
                  Lightning Fast
                </h3>
                <p className="text-gray-400">
                  Optimized performance that delivers results at the speed of
                  light
                </p>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800 hover:border-gray-600 transition-colors">
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

            <Card className="bg-black border-gray-800 hover:border-gray-600 transition-colors">
              <CardContent className="p-8 text-center">
                <Rocket className="w-12 h-12 mx-auto mb-4 text-red-400" />
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
      <section className="py-20 px-4 bg-black">
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
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">50+</div>
                  <div className="text-gray-400">Team Members</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">5+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-gray-900 border-gray-800 p-6">
                <Users className="w-8 h-8 mb-4 text-green-400" />
                <h4 className="font-bold text-white mb-2">Expert Team</h4>
                <p className="text-sm text-gray-400">
                  Skilled professionals dedicated to excellence
                </p>
              </Card>
              <Card className="bg-gray-900 border-gray-800 p-6">
                <Award className="w-8 h-8 mb-4 text-purple-400" />
                <h4 className="font-bold text-white mb-2">Award Winning</h4>
                <p className="text-sm text-gray-400">
                  Recognized for innovation and quality
                </p>
              </Card>
              <Card className="bg-gray-900 border-gray-800 p-6 col-span-2">
                <Zap className="w-8 h-8 mb-4 text-yellow-400" />
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
      <section className="py-20 px-4 bg-gray-900">
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
            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "The 3D experience they created for our product launch was
                  absolutely stunning. It increased our engagement by 300%."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Sarah Johnson</div>
                    <div className="text-gray-400 text-sm">CEO, TechCorp</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Professional, innovative, and delivered beyond our
                  expectations. The team truly understands modern design."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
                  <div>
                    <div className="font-bold text-white">Michael Chen</div>
                    <div className="text-gray-400 text-sm">
                      Creative Director, DesignStudio
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-black border-gray-800">
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">
                  "Their attention to detail and technical expertise helped us
                  create an immersive experience our users love."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-700 rounded-full mr-4"></div>
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
              <h3 className="text-2xl font-bold mb-4">3D Future</h3>
              <p className="text-gray-400 mb-4">
                Pioneering the future of digital experiences through innovative
                3D technology.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>3D Design</li>
                <li>Web Development</li>
                <li>Interactive Experiences</li>
                <li>Consulting</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>GitHub</li>
                <li>Dribbble</li>
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
