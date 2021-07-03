import LogoText from "../icons/LogoText";

export default function Footer() {
  const listMenu = [
    {
      title: "FAQ",
    },
    {
      title: "Help Center",
    },
    {
      title: "Account",
    },
    {
      title: "Media Center",
    },
    {
      title: "Investor Relations",
    },
    {
      title: "Jobs",
    },
    {
      title: "Ways to Watch",
    },
    {
      title: "Terms Us",
    },
    {
      title: "Privacy",
    },
    {
      title: "Cookie Preferences",
    },
    {
      title: "Corporate Information",
    },
    {
      title: "Contact Us",
    },
    {
      title: "Speed Test",
    },
    {
      title: "Legal Notice",
    },
  ];
  return (
    <div className="w-full px-5 py-10 bg-gray-100 dark:bg-black text-black dark:text-white">
      <div className="max-w-4xl mx-auto">
        <div className="font-medium text-lg">
          Questions? Call 0813-3208-3207
        </div>
        <div className="my-5">
          <ul className="flex flex-wrap">
            {listMenu.map((menu, index) => {
              return (
                <li
                  key={index}
                  className="my-3 w-1/2 sm:w-1/3 lg:w-1/4 text-base font-medium"
                >
                  <span className="cursor-pointer">{menu.title}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="font-medium text-lg">
          <LogoText />
        </div>
      </div>
    </div>
  );
}
