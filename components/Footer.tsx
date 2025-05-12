const Footer = () => {
  return (
    <footer className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 text-sm animate-in"> {/* text-gray-500 matches --subheading-color */}
      © {new Date().getFullYear()} Promptly. All rights reserved.
    </footer>
  );
};

export default Footer;
