interface ContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-[1400px]">{children}</div>;
};

export default Container;
