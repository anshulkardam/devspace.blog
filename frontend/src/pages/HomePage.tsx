import { Globe, Users, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "flowbite-react";
import { useState, useEffect } from "react";
export const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 ">
      <header
        className={`px-4 lg:px-6 h-14 flex items-center bg-slate-100 sticky z-50 top-0 transition-all duration-300 ${isScrolled ? "rounded-full w-3/4 mx-auto shadow-lg" : "w-full"
          }`}
      >
        <Link to={'/'} className="flex items-center justify-center">
          <img src="/globe.png" className="h-12 w-12 max-w-full" />
          <span className="sr-only">Story Sphere</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">

          <Link to={'/signin'} className="text-sm font-medium hover:underline underline-offset-4">
            Blogs
          </Link>
          <Link to={'/'} className="text-sm font-medium hover:underline underline-offset-4">
            Pricing
          </Link>
          <Link to={'/'} className="text-sm font-medium hover:underline underline-offset-4">
            About
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section
          className="overflow-hidden w-full bg-zinc-950 py-12 md:py-24 lg:py-32 xl:py-48 flex items-center justify-center bg-cover bg-center bg-no-repeat" // Added background image styling
          style={{
            backgroundImage: "url('earth.png')",
            backgroundSize: 'cover', // Set specific width and height for the background image
            backgroundPosition: 'left center',  // Adjust image position to the center
            backgroundRepeat: 'no-repeat'
          }} // Inline style to set the background image URL
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className=" text-white text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  <span className="hover:text-blue-300">Welcome</span>
                  <span className="hover:text-blue-300"> to</span>
                  <span className="hover:text-blue-300 "> Story</span>
                  <span className="hover:text-blue-300 "> Sphere</span>
                </h1>
                <p className=" mx-auto max-w-[700px] text-slate-300 md:text-lg">
                  Share your stories and connect with readers globally. Start blogging now!
                </p>
              </div>
              <div>
                <Link to={'/signup'} className="space-x-4 flex items-center">
                  <Button size={'xl'} className="px-2" color="dark">Get Started</Button>
                  <Button size={'xl'} className="hidden sm:block md:px-2" color="light">Learn More</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-slate-800  flex items-center justify-center"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Globe className="h-10 w-10" />
                <h2 className="text-xl font-bold">Global Reach</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Share your stories with readers from around the world.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Users className="h-10 w-10" />
                <h2 className="text-xl font-bold">Community Engagement</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Connect with like-minded writers and build your audience.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg">
                <Zap className="h-10 w-10" />
                <h2 className="text-xl font-bold">Powerful Tools</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  Access easy-to-use writing and publishing tools to enhance your content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32  flex items-center justify-center bg-white"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Start Your Story Today</h2>
                <p className="max-w-[600px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed  ">
                  Join Story Sphere and become part of a vibrant community of writers and readers.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2 items-center">
                  <input className="max-w-lg flex-1 border rounded-md p-2" placeholder="Enter your email" type="email" />
                  <Link to={'/signup'} >
                    <Button size={'lg'} className="px-2" color="dark" type="submit">Sign Up</Button>
                  </Link>
                </form>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By signing up, you agree to our{" "}
                  <Link to={'/'} className="underline underline-offset-2" >
                    Terms & Conditions
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Story Sphere. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link to={'/'} className="text-xs hover:underline underline-offset-4" >
            Terms of Service
          </Link>
          <Link to={'/'} className="text-xs hover:underline underline-offset-4" >
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}