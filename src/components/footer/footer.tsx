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
              className="font-bold underline hover:opacity-50 bg-accent"
            >
              human
            </a>
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-center font-light text-sm text-foreground">
            If you find a bug, feel free to email me at{" "}
            <a
              href="mailto:jack@jackfinlay.com"
              className="font-bold underline hover:opacity-50 bg-accent"
            >
              jack@jackfinlay.com
            </a>
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
            Or you could{" "}
            <a
              href="https://www.buymeacoffee.com/littlejackcoder"
              target="_blank"
              className="font-bold underline hover:opacity-50 bg-accent"
            >
              buy me a coffee...
            </a>
          </p>
        </div>
        <div className="flex justify-center">
          <div className="flex border-accent border rounded-md shadow-sm">
            <a
              href="https://www.buymeacoffee.com/littlejackcoder"
              target="_blank"
            >
              <img
                src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=littlejackcoder&button_colour=171717&font_colour=ffffff&font_family=Arial&outline_colour=ffffff&coffee_colour=FFDD00"
                alt="buymeacoffee.com link"
              />
            </a>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xs text-foreground">
            <span className="font-bold">PRIVACY:</span> No identifying data ever
            leaves this browser. Any first-party data stored on your device is
            for theme and locale preferences only. Third-party data, including
            cookies, is for advertising and metrics purposes only.
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xs text-foreground">
            <span className="font-bold">DISCLAIMER:</span> This is not financial
            advice. This is for education and general information purposes only.
            Consult a professional if you want financial advice. We do not claim
            anything regarding the accuracy of the results provided.
          </p>
        </div>
      </div>
    </div>
  )
}
