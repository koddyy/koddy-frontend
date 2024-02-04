import { apiInstance } from "@/apis/axios";
import {
  GetAppliedCoffeeChatListResponse,
  GetCoffeeChatByIdResponse,
  GetCoffeeChatListRequest,
  GetCoffeeChatListResponse,
  GetCoffeeChatListWithMenteeResponse,
  GetCoffeeChatListWithMentorResponse,
  GetSuggestedCoffeeChatListResponse,
  PostCoffeeChatFromMenteeToMentorRequest,
  PostCoffeeChatFromMenteeToMentorResponse,
  PostCoffeeChatFromMentorToMenteeRequest,
  PostCoffeeChatFromMentorToMenteeResponse,
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

  getCoffeeChatById = async (id: number) => {
    const response = await apiInstance.get<GetCoffeeChatByIdResponse>(`/api/coffeechats/${id}`);
    return response.data;
  };

  /** deprecated */

  getCoffeeChatNotification = async () => {
    const response =
      await apiInstance.get<ResponseType<GetCoffeeChatListResponse>>("/api/application/alarm");
    return response.data;
  };
}

export const coffeeChatApi = new CoffeeChatApi();
