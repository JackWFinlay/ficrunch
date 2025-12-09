export default function Footer() {
  return (
    <div className="flex justify-center w-full mb-5">
      <div className="flex flex-col w-90 gap-2.5">
        <div className="flex justify-center">
          <p className="font-light text-center text-sm">
            Built by a&nbsp;
            <a
              href="https://github.com/JackWFinlay/"
              className="font-bold underline hover:opacity-50"
            >
              human
            </a>
            .
          </p>
        </div>
        <div className="flex justify-center">
          <p className="font-light text-center text-sm">
            You can support my financial independence journey by using my
            Pearler referral code&nbsp;
            <a
              href="https://pearler.com/invited/JACK20263"
              className="font-mono bg-accent font-bold underline hover:opacity-50"
            >
              JACK20263
            </a>
          </p>
        </div>
        <div className="flex justify-center">
          <p className="font-light text-center text-sm">Or you could...</p>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.buymeacoffee.com/littlejackcoder"
            className="flex"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=littlejackcoder&button_colour=000000&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00" />
          </a>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xs">
            <span className="font-bold">PRIVACY:</span> Your financial data
            never leaves this browser. Any data stored, including cookies, is by
            third-parties for advertising and metrics purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}
