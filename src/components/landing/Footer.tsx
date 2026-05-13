const Footer = () => (
  <footer id="contact" className="relative border-t border-border/50 py-12 mt-12">
    <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex items-center gap-2 font-display font-semibold">
        <span className="h-5 w-5 rounded-md bg-spectrum" />
        <span>Bill-Ads</span>
        <span className="text-muted-foreground text-sm ml-2">— your brand on any billboard, anywhere.</span>
      </div>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <a href="#features" className="hover:text-foreground">Features</a>
        <a href="#how" className="hover:text-foreground">How it works</a>
        <a href="#about" className="hover:text-foreground">About</a>
        <a href="mailto:hello@bill-ads.com" className="hover:text-foreground">Contact</a>
      </div>
      <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Bill-Ads</p>
    </div>
  </footer>
);

export default Footer;
