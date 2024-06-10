import React from 'react';
import Link from 'next/link';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-black font-sans leading-normal tracking-normal">
            {/* Header */}
            <header className="bg-white fixed w-full z-10 top-0 shadow-lg">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-3xl font-bold text-black">donotfail.ai</div>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#how-it-works" className="text-black hover:text-gray-600">How It Works</a>
                        <a href="#features" className="text-black hover:text-gray-600">Features</a>
                        <a href="#about-us" className="text-black hover:text-gray-600">About Us</a>
                        <span className="text-gray-700">Coming Soon: Enhanced Quiz Generation</span>
                    </nav>
                </div>
            </header>

            {/* Main Section */}
            <main className="container mx-auto px-6 py-20 md:py-32 text-center">
                <h1 className="text-5xl md:text-6xl font-bold text-black leading-tight">
                    Transform Your Study Experience
                </h1>
                <p className="mt-4 text-lg md:text-xl text-gray-700">
                    Leverage AI to turn your slides into notes, quizzes, and audio explanations.
                </p>
                <div className="mt-8 flex justify-center space-x-4">
                    <Link
                        href="/get-started"
                        className="inline-flex h-9 items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                    >
                        Get Started for Free
                    </Link>
                    <Link
                        href="/tour"
                        className="inline-flex h-9 items-center justify-center rounded-md border border-gray-400 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                    >
                        Take a Tour
                    </Link>
                </div>
            </main>

            {/* Universities Section */}
            <section className="container mx-auto px-6 py-12">
                <h2 className="text-3xl font-bold text-black text-center">Used By Students At:</h2>
                <div className="mt-6 flex flex-wrap justify-center space-x-4 text-gray-700 text-lg">
                    <span>Stanford</span>
                    <span>McGill</span>
                    <span>UCLA</span>
                    <span>University of Amsterdam</span>
                    <span>Vrije University Amsterdam</span>
                    <span>University of Toronto</span>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="bg-gray-100 py-16">
                <div className="container mx-auto px-6">
                    <h2 className="text-3xl font-bold text-black text-center">Features</h2>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Detailed Notes</h3>
                            <p className="mt-2 text-gray-700">Create clear, comprehensive notes from your slides.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Quiz Generation</h3>
                            <p className="mt-2 text-gray-700">Generate quizzes to reinforce your learning.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Audio Explanations</h3>
                            <p className="mt-2 text-gray-700">Convert notes into engaging audio.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Voice Assistant</h3>
                            <p className="mt-2 text-gray-700">Navigate and understand slides effortlessly.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Quick Setup</h3>
                            <p className="mt-2 text-gray-700">Upload your slides and get results instantly.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="bg-gray-200 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-black">
                        Overwhelmed by course materials?
                    </h2>
                    <p className="mt-4 text-lg md:text-xl text-gray-700">
                        Traditional study methods can be slow and inefficient. donotfail.ai helps you study smarter using AI.
                    </p>
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Smart Note Generation</h3>
                            <p className="mt-2 text-gray-700">Quickly turns your slides into detailed notes.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Custom Quizzes</h3>
                            <p className="mt-2 text-gray-700">Automatically generates quizzes to test your understanding.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Clear Audio</h3>
                            <p className="mt-2 text-gray-700">Converts notes into natural-sounding audio.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Voice Assistant</h3>
                            <p className="mt-2 text-gray-700">Helps you navigate and explain slides easily.</p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                            <h3 className="text-xl font-bold text-black">Fast Results</h3>
                            <p className="mt-2 text-gray-700">Upload slides and get immediate, accurate results.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 text-gray-700 py-8">
                <div className="container mx-auto px-6 text-center">
                    <p className="mb-4">Ready to revolutionize your studying? Try donotfail.ai and enhance your study routine today.</p>
                    <p>Contact: <a href="mailto:support@donotfail.ai" className="text-gray-600 hover:text-black">support@donotfail.ai</a></p>
                    <div className="mt-4 flex justify-center space-x-6">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">LinkedIn</a>
                    </div>
                    <div className="mt-4">
                        <a href="#privacy-policy" className="text-gray-600 hover:text-black">Privacy Policy</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
