import { useHeader } from 'components/DatingMatches/header';

const DatingMatchesService = ({ children }) => {
  useHeader();

  return children();
};

export default DatingMatchesService;
