import { useState } from "react";
import beaver from "./assets/beaver.svg";
import { ApiResponse } from "shared";
import { Button } from "./components/ui/button";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function App() {
  const [data, setData] = useState<ApiResponse | undefined>();

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
    <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen">
      <div className="flex flex-col items-center w-full gap-8 p-6">
        <img src={beaver} alt="Mascot" className="w-32 h-32 animate-bounce" />

        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold tracking-tight text-red-600">
            DARE TO RESIST SSR
          </h1>
          <p className="text-xl font-bold text-red-500">
            STATIC SITE RENDERING PREVENTION EDUCATION
          </p>
        </div>

        <div className="bg-black text-white p-6 rounded-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">THE FACTS ABOUT SSR:</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>SSR can slow down your development workflow</li>
            <li>SSR complexity can lead to dependency nightmares</li>
            <li>Many developers try SSR due to peer pressure</li>
            <li>SSR is a gateway to more complex architectures</li>
          </ul>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-lg w-full">
          <h2 className="text-2xl font-bold mb-4 text-center">TAKE THE PLEDGE</h2>
          <p className="mb-4 text-center">
            I pledge to stay CSR-only and resist the pressures of Server-Side Rendering.
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

        <div className="flex flex-col items-center gap-4">
          <p className="font-bold text-lg text-center">SPREAD THE WORD - JUST SAY NO TO SSR!</p>
          <div className="flex gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <span className="text-blue-500">𝕏</span> Share on X
            </Button>
            <Button variant="outline" className="flex items-center gap-2 text-blue-600">
              <span>f</span> Share on Facebook
            </Button>
          </div>
        </div>

        <Button onClick={sendRequest} className="mt-4 bg-green-600 hover:bg-green-700">
          {data ? `Server says: ${data.message}` : "Connect to server"}
        </Button>
      </div>
    </div>
  );
}

export default App;
