import { apiInstance } from "@/apis/axios";
import {
  GetCoffeeChatByIdResponse,
  GetCoffeeChatListResponse,
  PatchCoffeeChatStatusRequest,
  PostCoffeeChatRequest,
} from "@/apis/coffeechat/types";
import { ResponseType } from "@/apis/types";

class CoffeeChatApi {
  getCoffeeChatById = async (id: string) => {
    const response = await apiInstance.get<ResponseType<GetCoffeeChatByIdResponse>>(
      `/api/application/${id}`
    );
    return response.data;
  };

  getCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponse>>("/api/application");
    return response.data;
  };

  getNewCoffeeChatList = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponse>>("/api/application/new");
    return response.data;
  };

  getCoffeeChatNotification = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponse>>("/api/application/alarm");
    return response.data;
  };

  postCoffeeChat = (coffeeChatFormData: PostCoffeeChatRequest) => {
    return apiInstance.post("/api/application", coffeeChatFormData);
  };

  patchCoffeeChatStatus = (coffeeChatStatus: PatchCoffeeChatStatusRequest) => {
    return apiInstance.patch("/api/application", coffeeChatStatus);
  };
}

export const coffeeChatApi = new CoffeeChatApi();
