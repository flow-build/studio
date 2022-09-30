type IconProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: "nodes";
  icon: any;
  variant?: "white" | "black";
};

const Icon = ({ src, variant, icon, ...props }: IconProps) => {
  return <img src={icon} width="20px" height="20px" />;
};

export default Icon;

