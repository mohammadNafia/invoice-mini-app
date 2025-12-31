import React from "react";

export default function Hero() {
  const handleLogin = () => {
    my.getAuthCode({
      scopes: ["auth_base", "USER_ID"],
      success: (res) => {
        my.alert({
          content: "Auth Code: " + res.authCode,
        });

        fetch("https://its.mouamle.space/api/auth-with-superQi", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            authCode: res.authCode,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
            
            // Correctly save the token to localStorage
            if (data.token) {
              localStorage.setItem('user_token', data.token);
            }

            my.alert({
              title: "Login Successful",
              content: "Token: " + (data.token || JSON.stringify(data)),
            });
          })
          .catch((err) => {
            console.error("Fetch error:", err);
            my.alert({
              title: "Fetch Error",
              content: "Failed to connect to server: " + err.message,
            });
          });
      },
      fail: (err) => {
        console.log("Login failed", err);
        my.alert({
          title: "Login Failed",
          content: "Could not get auth code: " + (err.error || "Unknown error"),
        });
      },
    });
  };

  return (
    <header className="bg-[#F8FAFC] text-[#334155]">
      <nav className="w-full bg-[#F8FAFC] py-5 transition-all duration-500 shadow-sm lg:fixed z-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="w-full flex justify-between items-center">
            <a
              href="https://www.linkedin.com/in/mohammed-nafia-7b58141ba?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              className="flex items-center"
            >
              <span className="text-2xl font-bold text-[#0F172A] tracking-wider hover:text-[#38BDF8] transition-all duration-300">
                INVOICE
              </span>
            </a>
            <div className="flex items-center">
              <button
                onClick={handleLogin}
                className="bg-[#0F766E] text-white rounded-full py-2 px-4 font-semibold whitespace-nowrap"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="lg:pt-28 pt-20 lg:pl-8">
        <div className="rounded-2xl bg-[#F1F5F9] py-15 overflow-hidden m-5 lg:m-0 2xl:py-16 xl:py-8 lg:rounded-tl-2xl lg:rounded-bl-2xl">
          <div className=" justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
              <div className="xl:col-span-5 lg:col-span-6">
                <div className="flex items-center text-sm font-medium text-[#334155] justify-center lg:justify-start">
                  <span className="bg-[#5EEAD4] py-4 px-6 rounded-2xl text-xs  font-medium text-[#334155] mr-3">
                    #1
                  </span>
                  invoice app
                </div>

                <h1 className="py-8 text-center text-[#0F172A] font-bold text-5xl lg:text-left leading-[70px]">
                  Get paid with a better{" "}
                  <span className="text-[#0F766E]">invoice flow</span>
                </h1>

                <p className="text-[#334155] text-lg text-center lg:text-left">
                  Draft an invoice, choose the payer, scan, and pay all in one
                  mini app
                </p>

                <div className="relative p-1.5 my-10 flex items-center gap-y-4 h-auto md:h-16 flex-col md:flex-row justify-between rounded-full border border-transparent md:bg-white transition-all duration-500 hover:border-[#7DD3FC]">
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter email to get started"
                    className="text-base rounded-full text-[#0F172A] flex-1 py-4 px-6 bg-white placeholder:text-[#334155] focus:outline-none md:w-fit w-full"
                  />
                  <button
                    onClick={handleLogin}
                    className="bg-[#5EEAD4] rounded-full py-3 px-7 text-base font-semibold text-[#334155] md:w-fit w-full"
                  >
                    Get started
                  </button>
                </div>

                <div className="flex items-center flex-col lg:flex-row">
                  <div className="flex items-center -space-x-3">
                    <img
                      src="https://pagedone.io/asset/uploads/1694846673.png"
                      alt="Rounded"
                      className="border-2 border-solid border-[#E2E8F0] rounded-full w-12 h-12 object-cover"
                    />
                    <img
                      src="https://pagedone.io/asset/uploads/1694846691.png"
                      alt="Rounded"
                      className="border-2 border-solid border-[#E2E8F0] rounded-full w-12 h-12 object-cover"
                    />
                    <img
                      src="https://pagedone.io/asset/uploads/1694846704.png"
                      alt="Rounded"
                      className="border-2 border-solid border-[#E2E8F0] rounded-full w-12 h-12 object-cover"
                    />
                  </div>
                  <span className="mt-3 text-base text-[#334155] font-medium lg:ml-3">
                    People have joined
                  </span>
                </div>
              </div>

              <div className="xl:col-span-7 lg:col-span-6">
                <img
                  src="/Screenshot 2025-12-31 185024.png"
                  alt="Dashboard"
                  className="rounded-l-3xl object-cover w-full lg:h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}