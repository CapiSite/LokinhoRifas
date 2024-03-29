export default interface UserContextType {
    userInfo: {
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
    };
    setUserInfo: React.Dispatch<React.SetStateAction<{
      name: string;
      id: string;
      email: string;
      picture: string;
      token: string;
    }>>;
  }