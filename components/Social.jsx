import Link from "next/link";

import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/drigovieira" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/rodrigoapvieira/" },
  { icon: <FaInstagram />, path: "https://www.instagram.com/vieira_roo/" },
];

const Social = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles} target="_blank" rel="noreferrer">
            {" "}
            {item.icon}{" "}
          </Link>
        );
      })}
    </div>
  );
};

export default Social;
