export default function FooterComp() {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
                <span className="ml-4 text-sm ">
                  {" "}
                  &copy; Copyright 2024. All Rights Reserved by mhamsha.
                </span>
              </div>
            </a>
          </div>

          <div className="w-auto p-8">
            <div className="-m-1.5 flex flex-wrap">
              <div className="w-auto p-1.5">
                <a href="https://www.linkedin.com/in/hamza-shahzad1" target="_blank">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <svg
                      width="16"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 0H5C2.24 0 0 2.24 0 5V19C0 21.76 2.24 24 5 24H19C21.76 24 24 21.76 24 19V5C24 2.24 21.76 0 19 0ZM8.7 20H5.8V9H8.7V20ZM7.25 7.7C5.8 7.7 4.7 6.6 4.7 5.15C4.7 3.7 5.8 2.6 7.25 2.6C8.7 2.6 9.8 3.7 9.8 5.15C9.8 6.6 8.7 7.7 7.25 7.7ZM20.2 20H17.3V14.2C17.3 12.9 17.3 11.1 15.5 11.1C13.7 11.1 13.4 12.6 13.4 14.1V20H10.5V9H13.3V10.5H13.4C14 9.3 15.6 8.5 17.5 8.5C20.5 8.5 20.2 11 20.2 13.7V20Z"
                        fill="#0A66C2"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
