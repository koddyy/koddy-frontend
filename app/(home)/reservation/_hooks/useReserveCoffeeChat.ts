import { useState } from "react";

const useReserveCoffeeChat = () => {
  const [isReserved, setIsReserved] = useState(false);

  const reserveCoffeeChat = () => {
    // TODO: mutation
    setIsReserved(true);
  };

  return { isReserved, reserveCoffeeChat };
};

export default useReserveCoffeeChat;
