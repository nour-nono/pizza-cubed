interface SectionHeadersProps {
  subHeader: string;
  mainHeader: string;
}

const SectionHeaders: React.FC<SectionHeadersProps> = ({ subHeader, mainHeader }) => {
  return (
    <>
      <h3 className="text-gray-500 font-semibold leading-4">
        {subHeader}
      </h3>
      <h2 className="text-primary font-bold text-4xl italic">
        {mainHeader}
      </h2>
    </>
  );
};

export default SectionHeaders;
