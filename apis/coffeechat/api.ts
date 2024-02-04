import { apiInstance } from "@/apis/axios";
import {
  GetAppliedCoffeeChatListResponse,
  GetCoffeeChatByIdResponse,
  GetCoffeeChatListRequest,
  GetCoffeeChatListResponse,
  GetCoffeeChatListWithMenteeResponse,
  GetCoffeeChatListWithMentorResponse,
  GetSuggestedCoffeeChatListResponse,
  PatchCoffeeChatStatusRequest,
  PostCoffeeChatFromMenteeToMentorRequest,
  PostCoffeeChatFromMenteeToMentorResponse,
  PostCoffeeChatFromMentorToMenteeRequest,
  PostCoffeeChatFromMentorToMenteeResponse,
  PostCoffeeChatRequest,
} from "@/apis/coffeechat/types";
import { ResponseType } from "@/apis/types";

class CoffeeChatApi {
  postCoffeeChatFromMentorToMentee = ({
    menteeId,
    applyReason,
  }: PostCoffeeChatFromMentorToMenteeRequest) => {
    return apiInstance.post<PostCoffeeChatFromMentorToMenteeResponse>("/api/coffeechats/suggest", {
      menteeId,
      applyReason,
    });
  };

  postCoffeeChatFromMenteeToMentor = ({
    mentorId,
    applyReason,
    start,
    end,
  }: PostCoffeeChatFromMenteeToMentorRequest) => {
    return apiInstance.post<PostCoffeeChatFromMenteeToMentorResponse>("/api/coffeechats/apply", {
      mentorId,
      applyReason,
      start,
      end,
    });
  };

  getNewAppliedCoffeeChatList = async (limit: number = 3) => {
    const response = await apiInstance.get<GetAppliedCoffeeChatListResponse>(
      "/api/mentees/applied-coffeechats",
      {
        params: {
          limit,
        },
      }
    );
    return response.data;
  };

  getNewSuggestedCoffeeChatList = async (limit: number = 3) => {
    const response = await apiInstance.get<GetSuggestedCoffeeChatListResponse>(
      "/api/mentors/suggested-coffeechats",
      {
        params: {
          limit,
        },
      }
    );
    return response.data;
  };

  /** mentor */
  getCoffeeChatListWithMenteeByStatus = async ({
    category,
    status,
    page,
  }: GetCoffeeChatListRequest) => {
    const response = await apiInstance.get<GetCoffeeChatListWithMenteeResponse>(
      `/api/coffeechats/mentors/me/${category}`,
      {
        params: {
          status,
          page,
        },
      }
    );
    return response.data;
  };

  /** mentee */
  getCoffeeChatListWithMentorByStatus = async ({
    category,
    status,
    page,
  }: GetCoffeeChatListRequest) => {
    const response = await apiInstance.get<GetCoffeeChatListWithMentorResponse>(
      `/api/coffeechats/mentees/me/${category}`,
      {
        params: {
          status,
          page,
        },
      }
    );
    return response.data;
  };

  /** deprecated */

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
