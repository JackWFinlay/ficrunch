export default function Footer() {
  return (
    <div className="flex justify-center w-full mb-5">
      <div className="flex flex-col w-90 gap-2.5">
        <div className="flex justify-center">
          <p className="font-light text-center text-sm text-foreground">
            Built by a&nbsp;
            <a
              href="https://github.com/JackWFinlay/"
              target="_blank"
              className="font-bold underline hover:opacity-50"
            >
              human
            </a>
            .
          </p>
        </div>
        <div className="flex justify-center">
          <p className="font-light text-center text-sm text-foreground">
            You can support my financial independence journey by using my
            Pearler referral code&nbsp;
            <a
              href="https://pearler.com/invited/JACK20263"
              target="_blank"
              className="font-mono bg-accent text-foreground font-bold underline hover:opacity-50"
            >
              JACK20263
            </a>
          </p>
        </div>
        <div className="flex justify-center">
          <p className="font-light text-center text-sm text-foreground">
            Or you could...
          </p>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.buymeacoffee.com/littlejackcoder"
            target="_blank"
            className="flex"
          >
            <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=littlejackcoder&button_colour=000000&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00" />
          </a>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xs text-foreground">
            <span className="font-bold">PRIVACY:</span> Your financial data
            never leaves this browser. Any first-party data stored is for theme
            and locale preferences only. Third-party data, including cookies, is
            for advertising and metrics purposes only.
          </p>
        </div>
      </div>
    </div>
  )
}
