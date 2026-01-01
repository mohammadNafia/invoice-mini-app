import React from "react";

export default function Hero() {
 const handleLogin = () => {
  my.getAuthCode({
    scopes: ["auth_base", "USER_ID"],

    success: (res) => {
      const code = res.authCode;
      fetch("https://its.mouamle.space/api/auth-with-superQi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: code,
        }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (!data.token) {
            my.alert({ content: "Login failed" });
            return;
          }

          localStorage.setItem("user_token", data.token);
          my.alert({ content: "Login successful" });
        })
        .catch(() => {
          my.alert({ content: "Server error" });
        });
    },

    fail: () => {
      my.alert({ content: "Authorization cancelled" });
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
                  <div className="flex items-center -space-x-5">
                   
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4D03AQEulL3Wl9zpZQ/profile-displayphoto-scale_200_200/B4DZsNh73nHkAY-/0/1765458559331?e=2147483647&v=beta&t=0VHg5AqPsYEUfCncBGfrzgXtjoHw-Uz5xGbRBgvMScs"
                      alt="Rounded"
                      className="border-2 border-solid border-[#E2E8F0] rounded-full w-12 h-12 object-cover"
                    />
                    <img
                      src="https://media.licdn.com/dms/image/v2/D5603AQEfDnEAj5PwDA/profile-displayphoto-shrink_200_200/B56ZZ9ikZXHAAc-/0/1745862940793?e=2147483647&v=beta&t=Cap73kEh6PbiK4a2G2hLl7MVJqPMoRFtq_Qddox_MPE"
                      alt="Rounded"
                      className="border-2 border-solid border-[#E2E8F0] rounded-full w-12 h-12 object-cover"
                    /> 
                    <img
                      src="https://media.licdn.com/dms/image/v2/D4E03AQFVQPDv9X143w/profile-displayphoto-shrink_200_200/B4EZcolBWzHsAc-/0/1748732485486?e=2147483647&v=beta&t=JS4I_Yt89VOA4OCzkUNvUVxFf7GKuLr2sEsKJlXq59A"
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
                  src="/Screenshot 2026-01-01 214934.png"
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