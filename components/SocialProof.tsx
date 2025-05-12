const SocialProof = () => {
  return (
    <>
      {/* text-subheading-color is var(--subheading-color) which is #6B7280 (Tailwind gray-500) */}
      {/* Current text-gray-600 is slightly darker, can be changed to text-subheading-color if defined in tailwind.config or use text-gray-500 */}
      <p className="mt-14 md:mt-16 text-gray-500 max-w-xl animate-in"> {/* Changed to text-gray-500 to match --subheading-color */}
        Over 20,000 creative teams use Jitter to create stunning animations online.
      </p>

      {/* Company Logos - subtle text color */}
      <div className="mt-8 w-full max-w-3xl animate-in">
        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-6 md:gap-x-10">
          {['Spotify', 'AKQA', 'Linktree', '27b', 'Ogilvy', 'Webflow', 'TBWA'].map(logo => (
            <div key={logo} className="text-gray-400 hover:text-gray-500 transition-colors duration-200 ease-in-out">
              {/* Placeholder for actual logos. Use <img> or <svg> for real logos. */}
              <span className="text-lg font-medium">{logo}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SocialProof;
