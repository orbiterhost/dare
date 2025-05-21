import { useEffect, useState } from "react";
import mascot from "./assets/mascot.png";
import { ApiResponse } from "shared";
import { Button } from "./components/ui/button";
import { resourceContent } from "./lib/resourceContent";
import { supabase } from "./lib/auth";
import { Session } from "@supabase/supabase-js";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

function App() {
  const [data, setData] = useState<ApiResponse | undefined>();
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    content: "",
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(0);

  useEffect(() => {
    getPledgeCount();
  }, []);

  useEffect(() => {
    getUserSession();
  }, [session]);

  const getPledgeCount = async () => {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/pledges`);

    if (!res.ok) {
      console.log("error");
      console.log(res.status);
    } else {
      const data = await res.json();
      const pledges = data?.data;
      setPledgeCount(pledges);
    }
  };

  const getUserSession = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      setLoading(false);
    }
    if (data) {
      setSession(data.session);
      setLoading(false);
    }
  };

  const connectGithub = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    getUserSession();
  };

  const openModal = (resourceType) => {
    setModalContent(resourceContent[resourceType]);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openShareModal = () => {
    setShowShareModal(true);
  };

  const closeShareModal = () => {
    setShowShareModal(false);
  };

  const sharePledge = (platform) => {
    const shareText =
      "I've just signed the pledge to Stop SSR! Join the movement for faster, client-rendered websites at stopssr.com #StopSSR";
    let shareUrl = "";

    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=https://stopssr.com&title=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "bluesky":
        // Bluesky doesn't have a standard sharing URL yet, but we can simulate it
        shareUrl = `https://bsky.app/intent/compose?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "threads":
        // Threads doesn't have a standard web sharing mechanism yet, simulating
        shareUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      case "farcaster":
        // Farcaster doesn't have a standard web sharing mechanism yet, simulating
        shareUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(
          shareText
        )}`;
        break;
      default:
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          shareText
        )}`;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  const PledgeCounter = () => {
    return (
      <div className="text-center mt-4 text-xs text-gray-500">
        <div className="flex justify-center items-center gap-2">
          <span>Pledge Counter:</span>
          <span
            style={{
              fontFamily: "Courier New, monospace",
              background: "#000000",
              color: "#00ff00",
              padding: "1px 4px",
              border: "1px inset #666666",
            }}
          >
            {pledgeCount}
          </span>
        </div>
        <div className="mt-1">
          <span style={{ color: "#ff0000" }}>★</span>
          <span>This site is 100% SSR FREE!</span>
          <span style={{ color: "#ff0000" }}>★</span>
        </div>
        <div className="mt-1">
          <img
            src="https://www.example.com/best-viewed-ie.gif"
            alt="Best viewed in Internet Explorer 6.0"
            className="inline-block"
            style={{
              border: "none",
              height: "20px",
              // This is a placeholder - the actual image won't be visible
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Main container */}
      <div className="max-w-3xl mx-auto border-2 border-gray-700 p-4">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <img src={mascot} alt="Mascot" className="w-20 h-20" />
            <div className="ml-4 text-yellow-400 font-bold">
              <div className="text-3xl">StopSSR</div>
              <div className="text-2xl">Join the movement</div>
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
                Ready to take the pledge to Stop SSR?
              </div>
              <div className="flex items-center justify-center">
                <div className="ml-2">
                  <a
                    href="/#take-the-pledge"
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
                  </a>
                </div>
              </div>
            </div>
          </div>
          <PledgeCounter />
          <div className="text-green-400 mb-8">Resources</div>
        </div>

        {/* Navigation buttons in a grid layout like the original site */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => openModal("kids")}
            className="bg-blue-700 p-2 text-center border-2 border-blue-500 hover:bg-blue-600"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-white">KIDS</div>
          </button>
          <button
            onClick={() => openModal("news")}
            className="bg-red-700 p-2 text-center border-2 border-red-500 hover:bg-red-600"
          >
            <div className="text-white font-bold text-xl">StopSSR</div>
            <div className="text-white">NEWS</div>
          </button>
          <button
            onClick={() => openModal("books")}
            className="bg-yellow-200 p-2 text-center border-2 border-yellow-500 hover:bg-yellow-100"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">BOOKS</div>
          </button>
          <button
            onClick={() => openModal("brandNew")}
            className="bg-blue-900 p-2 text-center border-2 border-blue-700 hover:bg-blue-800"
          >
            <div className="text-yellow-400 font-bold">CHECK OUT OUR</div>
            <div className="text-white text-sm">BRAND NEW SECTION!</div>
          </button>

          <button
            onClick={() => openModal("educators")}
            className="bg-purple-700 p-2 text-center border-2 border-purple-500 hover:bg-purple-600"
          >
            <div className="text-white font-bold text-xl">StopSSR</div>
            <div className="text-white">EDUCATORS</div>
          </button>
          <button
            onClick={() => openModal("officers")}
            className="bg-yellow-500 p-2 text-center border-2 border-yellow-600 hover:bg-yellow-400"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">OFFICERS</div>
          </button>
          <button
            onClick={() => openModal("orderForm")}
            className="bg-red-700 p-2 text-center border-2 border-red-500 hover:bg-red-600"
          >
            <div className="text-white text-sm">StopSSR</div>
            <div className="text-white">ORDER FORM</div>
          </button>
          <button
            onClick={() => openModal("research")}
            className="bg-green-900 p-2 text-center border-2 border-green-700 hover:bg-green-800"
          >
            <div className="text-white text-lg">RESEARCH</div>
          </button>

          <button
            onClick={() => openModal("parents")}
            className="bg-green-500 p-2 text-center border-2 border-green-600 hover:bg-green-400 col-span-1"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-black">PARENTS</div>
          </button>
          <button
            onClick={() => openModal("gallery")}
            className="bg-purple-900 p-2 text-center border-2 border-purple-700 hover:bg-purple-800 col-span-1"
          >
            <div className="text-red-500 font-bold text-xl">StopSSR</div>
            <div className="text-white">GALLERY</div>
          </button>
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
        <div
          id="take-the-pledge"
          className="bg-red-600 text-white p-6 rounded-lg w-full mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 text-center">
            {session && session.user ?  "THANK YOU FOR YOUR PLEDGE" : "TAKE THE PLEDGE"}
          </h2>
          <p className="mb-4 text-center">
            {
              session && session.user ? 
              "I pledge to stay CSR-only and resist the pressures of Server-Side Rendering." : "Your pledge tells the world that you will stick to CSR technology and resist the pressures of Server-Side Rendering."
            }            
          </p>
          {session && session.user.email ? (
            <div className="space-y-4">
              <Button
                onClick={openShareModal}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs md:text-lg"
              >
                SHARE YOUR PLEDGE
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                disabled={loading}
                onClick={connectGithub}
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs md:text-lg"
              >
                {loading
                  ? "Signing the pledge..."
                  : "CONNECT YOUR GITHUB & SIGN THE PLEDGE"}
              </Button>
            </div>
          )}
        </div>

        {/* Footer area */}
        <div className="border-t-2 border-gray-700 pt-4 mb-4">
          <div className="flex justify-center space-x-4"></div>
        </div>

        <div className="text-center mb-8"></div>

        <div className="flex justify-center space-x-6">
          <a
            href="#"
            className="border-2 border-gray-700 p-2 bg-gray-800 hover:bg-gray-700"
          >
            <div className="text-white text-sm">Return to</div>
            <div className="text-red-500 font-bold">
              <a href="/#take-the-pledge">Sign the pledge</a>
            </div>
          </a>
          <a
            href="#"
            className="border-2 border-gray-700 p-2 bg-gray-800 hover:bg-gray-700"
          >
            <div className="text-red-500 font-bold">StopSSR</div>
            <div className="text-white">
              <a href="/#links">LINKS</a>
            </div>
          </a>
        </div>
      </div>

      {/* 2000s-style Modal for Resources */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={closeModal}
          ></div>
          <div
            className="z-10 w-11/12 max-w-md mx-auto bg-white text-black rounded relative"
            style={{
              border: "3px solid #3366cc",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Modal Header - Windows 98/2000 style */}
            <div
              className="flex justify-between items-center p-2"
              style={{
                background: "linear-gradient(to right, #0066cc, #3399ff)",
                borderBottom: "2px solid #003399",
              }}
            >
              <div className="text-white font-bold tracking-wide">
                {modalContent.title}
              </div>
              <button
                onClick={closeModal}
                className="w-5 h-5 flex items-center justify-center"
                style={{
                  background: "#ff6666",
                  border: "1px outset #ff9999",
                  boxShadow: "1px 1px 2px #990000",
                }}
              >
                <span className="text-white font-bold text-xs">X</span>
              </button>
            </div>

            {/* Modal Content - using typical 2000s web styling */}
            <div
              className="p-4"
              style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}
            >
              <div
                className="mb-4 p-3"
                style={{
                  background: "#ffffcc",
                  border: "1px solid #ffcc66",
                }}
              >
                {modalContent.content}
              </div>

              {/* Typical early 2000s animated buttons */}
              <div className="flex justify-center mt-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-1 text-sm font-bold uppercase"
                  style={{
                    background:
                      "linear-gradient(to bottom, #ff6666 0%, #cc0000 100%)",
                    color: "white",
                    border: "2px outset #ff9999",
                    textShadow: "1px 1px 1px #660000",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #ff9999 0%, #ff6666 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #ff6666 0%, #cc0000 100%)";
                  }}
                >
                  Close Window
                </button>
              </div>

              {/* Classic 2000s web footer with animation notice */}
              <div className="text-center mt-4 text-xs text-gray-500">
                <div className="mt-1">
                  <span style={{ color: "#ff0000" }}>★</span>
                  <span>This site is 100% SSR FREE!</span>
                  <span style={{ color: "#ff0000" }}>★</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2000s-style Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-70"
            onClick={closeShareModal}
          ></div>
          <div
            className="z-10 w-11/12 max-w-md mx-auto bg-white text-black rounded relative"
            style={{
              border: "3px solid #339933",
              boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.8)",
            }}
          >
            {/* Modal Header - Windows 98/2000 style */}
            <div
              className="flex justify-between items-center p-2"
              style={{
                background: "linear-gradient(to right, #006600, #00cc00)",
                borderBottom: "2px solid #003300",
              }}
            >
              <div className="text-white font-bold tracking-wide">
                Share Your Anti-SSR Pledge!
              </div>
              <button
                onClick={closeShareModal}
                className="w-5 h-5 flex items-center justify-center"
                style={{
                  background: "#ff6666",
                  border: "1px outset #ff9999",
                  boxShadow: "1px 1px 2px #990000",
                }}
              >
                <span className="text-white font-bold text-xs">X</span>
              </button>
            </div>

            {/* Modal Content - with "Under Construction" GIF-style header */}
            <div
              className="p-4"
              style={{ fontFamily: "Arial, sans-serif", lineHeight: "1.5" }}
            >
              <div className="text-center mb-4">
                <div
                  className="mx-auto p-2 font-bold text-sm"
                  style={{
                    background: "#000000",
                    border: "2px ridge #666666",
                    color: "#00ff00",
                    fontFamily: "Courier New, monospace",
                    width: "fit-content",
                  }}
                >
                  PLEDGE SUCCESSFULLY SIGNED!
                </div>
              </div>

              <div
                className="mb-4 p-3"
                style={{
                  background: "#ffffcc",
                  border: "1px solid #ffcc66",
                }}
              >
                <p className="text-center mb-2 font-bold">
                  Spread the word! Tell your friends to join the movement!
                </p>
                <p className="text-center text-sm">
                  Share your pledge on these platforms and help free the web
                  from SSR!
                </p>
              </div>

              {/* Social Media Buttons - 2000s style */}
              <div className="space-y-2 mb-4">
                {/* X/Twitter */}
                <button
                  onClick={() => sharePledge("twitter")}
                  className="w-full text-white font-bold py-1 px-2 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, #333333 0%, #000000 100%)",
                    border: "2px outset #666666",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #444444 0%, #222222 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #333333 0%, #000000 100%)";
                  }}
                >
                  <span style={{ fontFamily: "Arial, sans-serif" }}>
                    Share on X/Twitter
                  </span>
                </button>

                {/* Reddit */}
                <button
                  onClick={() => sharePledge("reddit")}
                  className="w-full text-white font-bold py-1 px-2 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, #ff4500 0%, #cc3700 100%)",
                    border: "2px outset #ff6622",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #ff5511 0%, #dd3800 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #ff4500 0%, #cc3700 100%)";
                  }}
                >
                  <span style={{ fontFamily: "Arial, sans-serif" }}>
                    Share on Reddit
                  </span>
                </button>

                {/* Bluesky */}
                <button
                  onClick={() => sharePledge("bluesky")}
                  className="w-full text-white font-bold py-1 px-2 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, #0066ff 0%, #0044cc 100%)",
                    border: "2px outset #0088ff",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #0077ff 0%, #0055dd 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #0066ff 0%, #0044cc 100%)";
                  }}
                >
                  <span style={{ fontFamily: "Arial, sans-serif" }}>
                    Share on Bluesky
                  </span>
                </button>

                {/* Threads */}
                <button
                  onClick={() => sharePledge("threads")}
                  className="w-full text-white font-bold py-1 px-2 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, #000000 0%, #333333 100%)",
                    border: "2px outset #444444",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #222222 0%, #444444 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #000000 0%, #333333 100%)";
                  }}
                >
                  <span style={{ fontFamily: "Arial, sans-serif" }}>
                    Share on Threads
                  </span>
                </button>

                {/* Farcaster */}
                <button
                  onClick={() => sharePledge("farcaster")}
                  className="w-full text-white font-bold py-1 px-2 flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(to bottom, #8844ff 0%, #6622cc 100%)",
                    border: "2px outset #aa66ff",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #9955ff 0%, #7733dd 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #8844ff 0%, #6622cc 100%)";
                  }}
                >
                  <span style={{ fontFamily: "Arial, sans-serif" }}>
                    Share on Farcaster
                  </span>
                </button>
              </div>

              {/* Close button */}
              <div className="flex justify-center mt-2">
                <button
                  onClick={closeShareModal}
                  className="px-4 py-1 text-sm font-bold uppercase"
                  style={{
                    background:
                      "linear-gradient(to bottom, #00cc00 0%, #006600 100%)",
                    color: "white",
                    border: "2px outset #00ee00",
                    textShadow: "1px 1px 1px #003300",
                    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #00dd00 0%, #007700 100%)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(to bottom, #00cc00 0%, #006600 100%)";
                  }}
                >
                  Close Window
                </button>
              </div>
              <PledgeCounter />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
