import { useState } from "react";

const useAcceptCoffeeChat = () => {
  const [isSuccess, setIsSuccess] = useState(false); // TODO: mutation status

  const acceptCoffeeChat = () => {
    // TODO: mutation
    setIsSuccess(true);
  };

  return { isAccepted: isSuccess, acceptCoffeeChat };
};

export default useAcceptCoffeeChat;
