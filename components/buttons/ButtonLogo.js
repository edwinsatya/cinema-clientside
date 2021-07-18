import React from "react";
import LogoText from "../icons/LogoText";

const ButtonLogo = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      <LogoText className="text-2xl sm:text-4xl lg:text-5xl" />
    </a>
  );
});

ButtonLogo.displayName = "ButtonLogo";

export default ButtonLogo;
