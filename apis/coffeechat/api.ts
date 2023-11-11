import { apiInstance } from "@/apis/axios";
import {
  GetCoffeeChatListResponseData,
  patchCoffeeChatStatusRequest,
  PostCoffeeChatRequest,
} from "@/apis/coffeechat/types";
import { ResponseType } from "@/apis/types";

class CoffeeChatApi {
  getCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponseData[]>>("/api/application");
    return response.data;
  };

  getNewCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponseData[]>>("/api/application/new");
    return response.data;
  };

  postCoffeeChat = (coffeeChatFormData: PostCoffeeChatRequest) => {
    return apiInstance.post("/api/application", coffeeChatFormData);
  };

  patchCoffeeChatStatus = (coffeeChatStatus: patchCoffeeChatStatusRequest) => {
    return apiInstance.patch("/api/application", coffeeChatStatus);
  };
}

export const coffeeChatApi = new CoffeeChatApi();
