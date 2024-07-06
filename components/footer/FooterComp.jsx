export default function FooterComp() {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <div className="container relative z-10 mx-auto px-4">
        <div className="-m-8 flex flex-wrap items-center justify-between">
          <div className="w-auto p-8">
            <a href="#">
              <div className="inline-flex items-center">
                <span className="ml-2 text-sm ">
                  {" "}
                  &copy; Copyright 2024. All Rights Reserved by mhamsha.
                </span>
              </div>
            </a>
          </div>

          <div className="w-auto px-8 pt-2 pb-5">
            <div className="-m-1.5 flex flex-wrap">
              <div className="w-auto p-1.5">
                <a href="https://github.com/mhamsha" target="_blank">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 hover:border-gray-400">
                    <svg
                      width="16"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 0C5.37 0 0 5.37 0 12C0 17.3 3.438 21.8 8.205 23.385C8.805 23.485 9.025 23.145 9.025 22.845C9.025 22.565 9.015 21.625 9.01 20.605C5.672 21.145 4.968 18.945 4.968 18.945C4.422 17.77 3.633 17.425 3.633 17.425C2.542 16.605 3.717 16.62 3.717 16.62C4.922 16.68 5.633 17.845 5.633 17.845C6.717 19.545 8.422 19.095 9.062 18.845C9.172 18.125 9.462 17.605 9.802 17.305C7.123 17.005 4.343 15.905 4.343 11.375C4.343 10.065 4.813 8.965 5.593 8.095C5.473 7.785 5.093 6.585 5.693 4.965C5.693 4.965 6.813 4.645 9.01 6.175C9.93 5.895 10.93 5.745 11.93 5.745C12.93 5.745 13.93 5.895 14.86 6.175C17.05 4.645 18.17 4.965 18.17 4.965C18.77 6.585 18.39 7.785 18.27 8.095C19.05 8.965 19.52 10.065 19.52 11.375C19.52 15.925 16.73 17 14.04 17.305C14.42 17.645 14.74 18.225 14.74 19.045C14.74 20.345 14.72 21.545 14.72 22.845C14.72 23.145 14.93 23.495 15.54 23.385C20.307 21.8 23.745 17.3 23.745 12C23.745 5.37 18.375 0 12 0Z"
                        fill="#000000"
                      ></path>
                    </svg>
                  </div>
                </a>
              </div>
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
