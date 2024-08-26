import React from 'react';
import { BookmarkIcon } from '@heroicons/react/24/outline'; // Adjust import based on your actual location

export const HomePage: React.FC = () => {

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <header className="px-4 lg:px-6 h-14 flex items-center">
                <a href="#" className="flex items-center justify-center">
                    <BookmarkIcon className="h-6 w-6" />
                    <span className="text-xl font-bold">Story Sphere</span>
                </a>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                        Blog
                    </a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                        About
                    </a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4">
                        Contact
                    </a>
                </nav>
            </header>


            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Discover Captivating Stories
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Explore a world of inspiring narratives and thought-provoking content on Story Sphere, your premier
                                        blogging destination.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <a
                                        href="/signup"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        Read the Blog
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest from the Blog</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Explore our latest blog posts and dive into captivating stories, insightful perspectives, and
                                    thought-provoking content.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-muted-foreground">&copy; 2024 Story Sphere. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <a href="#" className="text-xs hover:underline underline-offset-4">
                        Terms of Service
                    </a>
                    <a href="#" className="text-xs hover:underline underline-offset-4">
                        Privacy Policy
                    </a>
                </nav>
            </footer>
        </div>
    );
};
