import { apiInstance } from "@/apis/axios";
import { GetCoffeeChatResponseData } from "@/apis/coffeechat/types";
import { ResponseType } from "@/apis/types";

class CoffeeChatApi {
  getCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatResponseData[]>>("/api/application");
    return response.data;
  };

  getNewCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatResponseData[]>>("/api/application/new");
    return response.data;
  };
}

export const coffeeChatApi = new CoffeeChatApi();
