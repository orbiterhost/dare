import { useState } from "react";
import beaver from "./assets/beaver.svg";
import { ApiResponse } from "shared";
import { Button } from "./components/ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function App() {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [email, setEmail] = useState("");

  async function sendRequest() {
    try {
      const req = await fetch(`${SERVER_URL}/hello`);
      const res: ApiResponse = await req.json();
      setData(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Main container */}
      <div className="max-w-3xl mx-auto border-2 border-gray-700 p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img src={beaver} alt="Mascot" className="w-20 h-20" />
            <div className="ml-4 text-yellow-400 font-bold">
              <div className="text-3xl">Join the StopSSR</div>
              <div className="text-2xl">Mailing List</div>
            </div>
          </div>

          {/* Email signup box - similar to the StopSSR site */}
          <div className="relative mx-auto mb-8 max-w-md">
            <div
              className="p-3 rounded-md"
              style={{
                background:
                  "linear-gradient(to bottom, #f0a848 0%, #d87d29 100%)",
                boxShadow:
                  "inset 2px 2px 5px rgba(255, 255, 255, 0.5), inset -2px -2px 5px rgba(0, 0, 0, 0.5)",
                border: "1px solid #955214",
              }}
            >
              <div className="text-blue-800 font-bold text-lg mb-3 pl-2">
                Enter Your Email Address Below:
              </div>
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-grow h-10 p-1 text-black border-2 border-gray-400"
                />
                <div className="ml-2">
                  <button
                    className="relative text-white font-bold text-lg px-8 py-1 uppercase"
                    style={{
                      background:
                        "linear-gradient(to bottom, #4aff4a 0%, #00a000 100%)",
                      border: "1px solid #006000",
                      borderRadius: "50px",
                      boxShadow:
                        "2px 2px 4px rgba(0, 0, 0, 0.5), inset 1px 1px 3px rgba(255, 255, 255, 0.5), inset -1px -1px 3px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    JOIN
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="text-green-400 mb-8">
            <a href="#" className="hover:underline">
              Answers to the Principles of Effectiveness
            </a>
          </div>
        </div>

        {/* Navigation buttons in a grid layout like the original site */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <a
            href="#"
            className="bg-blue-700 p-2 text-center border-2 border-blue-500 hover:bg-blue-600"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-white">KIDS</div>
          </a>
          <a
            href="#"
            className="bg-red-700 p-2 text-center border-2 border-red-500 hover:bg-red-600"
          >
            <div className="text-white font-bold text-xl">StopSSR</div>
            <div className="text-white">NEWS</div>
          </a>
          <a
            href="#"
            className="bg-yellow-200 p-2 text-center border-2 border-yellow-500 hover:bg-yellow-100"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">BOOKS</div>
          </a>
          <a
            href="#"
            className="bg-blue-900 p-2 text-center border-2 border-blue-700 hover:bg-blue-800"
          >
            <div className="text-yellow-400 font-bold">CHECK OUT OUR</div>
            <div className="text-white text-sm">BRAND NEW SECTION!</div>
          </a>

          <a
            href="#"
            className="bg-purple-700 p-2 text-center border-2 border-purple-500 hover:bg-purple-600"
          >
            <div className="text-white font-bold text-xl">StopSSR</div>
            <div className="text-white">EDUCATORS</div>
          </a>
          <a
            href="#"
            className="bg-yellow-500 p-2 text-center border-2 border-yellow-600 hover:bg-yellow-400"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">OFFICERS</div>
          </a>
          <a
            href="#"
            className="bg-red-700 p-2 text-center border-2 border-red-500 hover:bg-red-600"
          >
            <div className="text-white text-sm">StopSSR</div>
            <div className="text-white">ORDER FORM</div>
          </a>
          <a
            href="#"
            className="bg-green-900 p-2 text-center border-2 border-green-700 hover:bg-green-800"
          >
            <div className="text-white text-lg">RESEARCH</div>
          </a>

          <a
            href="#"
            className="bg-green-500 p-2 text-center border-2 border-green-600 hover:bg-green-400 col-span-1"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">PARENTS</div>
          </a>
          <a
            href="#"
            className="bg-purple-900 p-2 text-center border-2 border-purple-700 hover:bg-purple-800 col-span-1"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-white">GALLERY</div>
          </a>
        </div>

        {/* Main content area */}
        <div className="mb-8">
          <div className="bg-black p-6 w-full">
            <h2 className="text-2xl font-bold mb-4 text-center text-red-500">
              THE FACTS ABOUT SSR:
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>SSR can slow down your development workflow</li>
              <li>SSR complexity can lead to dependency nightmares</li>
              <li>Many developers try SSR due to peer pressure</li>
              <li>SSR is a gateway to more complex architectures</li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-lg font-bold">
              There's a lot to do and learn here
            </p>
            <p>and many chances for everyone to participate.</p>
            <p>
              Let us know what you think of the site, and if you have any
              suggestions or ideas.
            </p>
            <p>See you inside!</p>
          </div>

         
        </div>

        {/* StopSSR Pledge */}
        <div className="bg-red-600 text-white p-6 rounded-lg w-full mb-8">
          <h2 className="text-2xl font-bold mb-4 text-center">
            TAKE THE PLEDGE
          </h2>
          <p className="mb-4 text-center">
            I pledge to stay CSR-only and resist the pressures of Server-Side
            Rendering.
          </p>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block font-medium">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 rounded text-black"
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded text-black"
                placeholder="Enter your email"
              />
            </div>
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-lg">
              SIGN THE PLEDGE
            </Button>
          </div>
        </div>

        {/* Footer area */}
        <div className="border-t-2 border-gray-700 pt-4 mb-4">
          <div className="flex justify-center space-x-4">
            <img
              src="https://via.placeholder.com/100x50"
              alt="Family Friendly"
              className="h-12"
            />
            <img
              src="https://via.placeholder.com/100x50"
              alt="ICRA"
              className="h-12"
            />
          </div>
        </div>

        <div className="text-center mb-8">
          <a href="#" className="text-red-500 hover:underline">
            Review D.A.R.E. Privacy Policy
          </a>
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="border-2 border-gray-700 p-2 bg-gray-800 hover:bg-gray-700"
          >
            <div className="text-white text-sm">Return to</div>
            <div className="text-red-500 font-bold">StopSSR Homepage</div>
          </a>
          <a
            href="#"
            className="border-2 border-gray-700 p-2 bg-gray-800 hover:bg-gray-700"
          >
            <div className="text-red-500 font-bold">StopSSR</div>
            <div className="text-white">LINKS</div>
          </a>
        </div>

        {/* Server connection button (just keeping this from your original code) */}
        <div className="mt-8 text-center">
          <Button
            onClick={sendRequest}
            className="bg-green-600 hover:bg-green-700"
          >
            {data ? `Server says: ${data.message}` : "Connect to server"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
