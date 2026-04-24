// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toRequestString(value: unknown) {
  return value === undefined || value === null || value === ""
    ? value
    : String(value);
}

function serializeInt64Fields<T extends Record<string, any>>(
  payload: T,
  keys: string[]
) {
  const next = { ...payload };
  for (const key of keys) {
    if (key in next) {
      next[key] = toRequestString(next[key]);
    }
  }
  return next;
}

/** Create user POST /v1/admin/user/ */
export async function createUser(
  body: API.CreateUserRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, [
        "product_id",
        "duration",
        "balance",
        "commission",
        "gift_amount",
      ]),
      ...(options || {}),
    }
  );
}

/** Delete user DELETE /v1/admin/user/ */
export async function deleteUser(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.DeleteUserParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/`,
    {
      method: "DELETE",
      params: {
        ...serializeInt64Fields(params, ["id"]),
      },
      ...(options || {}),
    }
  );
}

/** Get user auth method GET /v1/admin/user/auth_method */
export async function getUserAuthMethod(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.GetUserAuthMethodResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Update user auth method PUT /v1/admin/user/auth_method */
export async function updateUserAuthMethod(
  body: API.UpdateUserAuthMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_id"]),
      ...(options || {}),
    }
  );
}

/** Create user auth method POST /v1/admin/user/auth_method */
export async function createUserAuthMethod(
  body: API.CreateUserAuthMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_id"]),
      ...(options || {}),
    }
  );
}

/** Delete user auth method DELETE /v1/admin/user/auth_method */
export async function deleteUserAuthMethod(
  body: API.DeleteUserAuthMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/auth_method`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_id"]),
      ...(options || {}),
    }
  );
}

/** Update user basic info PUT /v1/admin/user/basic */
export async function updateUserBasicInfo(
  body: API.UpdateUserBasiceInfoRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/basic`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, [
        "user_id",
        "balance",
        "commission",
        "gift_amount",
        "telegram",
        "referer_id",
      ]),
      ...(options || {}),
    }
  );
}

/** Batch delete user DELETE /v1/admin/user/batch */
export async function batchDeleteUser(
  body: API.BatchDeleteUserRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/batch`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        ids: Array.isArray(body?.ids)
          ? body.ids.map((id: unknown) => toRequestString(id))
          : body?.ids,
      },
      ...(options || {}),
    }
  );
}

/** Current user GET /v1/admin/user/current */
export async function currentUser(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.User }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/current`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get user detail GET /v1/admin/user/detail */
export async function getUserDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.User }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/detail`,
    {
      method: "GET",
      params: {
        ...params,
        id: toRequestString(params.id),
      },
      ...(options || {}),
    }
  );
}

/** User device PUT /v1/admin/user/device */
export async function updateUserDevice(
  body: API.UserDevice,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/device`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["id", "created_at", "updated_at"]),
      ...(options || {}),
    }
  );
}

/** Delete user device DELETE /v1/admin/user/device */
export async function deleteUserDevice(
  body: API.DeleteUserDeivceRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/device`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["id"]),
      ...(options || {}),
    }
  );
}

/** kick offline user device PUT /v1/admin/user/device/kick_offline */
export async function kickOfflineByUserDevice(
  body: API.KickOfflineRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/device/kick_offline`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["id"]),
      ...(options || {}),
    }
  );
}

/** Get user list GET /v1/admin/user/list */
export async function getUserList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserListParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/list`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: params.user_id ? toRequestString(params.user_id) : undefined,
        subscribe_id: params.subscribe_id
          ? toRequestString(params.subscribe_id)
          : undefined,
        user_subscribe_id: params.user_subscribe_id
          ? toRequestString(params.user_subscribe_id)
          : undefined,
      },
      ...(options || {}),
    }
  );
}

/** Get user login logs GET /v1/admin/user/login/logs */
export async function getUserLoginLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserLoginLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserLoginLogsResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/login/logs`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: toRequestString(params.user_id),
      },
      ...(options || {}),
    }
  );
}

/** Update user notify setting PUT /v1/admin/user/notify */
export async function updateUserNotifySetting(
  body: API.UpdateUserNotifySettingRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/notify`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_id"]),
      ...(options || {}),
    }
  );
}

/** Get user subcribe GET /v1/admin/user/subscribe */
export async function getUserSubscribe(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserSubscribeListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: toRequestString(params.user_id),
      },
      ...(options || {}),
    }
  );
}

/** Update user subcribe PUT /v1/admin/user/subscribe */
export async function updateUserSubscribe(
  body: API.UpdateUserSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, [
        "user_subscribe_id",
        "subscribe_id",
        "traffic",
        "expired_at",
        "upload",
        "download",
      ]),
      ...(options || {}),
    }
  );
}

/** Create user subcribe POST /v1/admin/user/subscribe */
export async function createUserSubscribe(
  body: API.CreateUserSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, [
        "user_id",
        "expired_at",
        "traffic",
        "subscribe_id",
      ]),
      ...(options || {}),
    }
  );
}

/** Delete user subcribe DELETE /v1/admin/user/subscribe */
export async function deleteUserSubscribe(
  body: API.DeleteUserSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_subscribe_id"]),
      ...(options || {}),
    }
  );
}

/** Get user subcribe by id GET /v1/admin/user/subscribe/detail */
export async function getUserSubscribeById(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeByIdParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.UserSubscribeDetail }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/detail`,
    {
      method: "GET",
      params: {
        ...params,
        id: toRequestString(params.id),
      },
      ...(options || {}),
    }
  );
}

/** Get user subcribe devices GET /v1/admin/user/subscribe/device */
export async function getUserSubscribeDevices(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeDevicesParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserSubscribeDevicesResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/device`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: toRequestString(params.user_id),
        subscribe_id: toRequestString(params.subscribe_id),
      },
      ...(options || {}),
    }
  );
}

/** Get user subcribe logs GET /v1/admin/user/subscribe/logs */
export async function getUserSubscribeLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeLogsParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserSubscribeLogsResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/logs`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: toRequestString(params.user_id),
        subscribe_id: params.subscribe_id
          ? toRequestString(params.subscribe_id)
          : undefined,
      },
      ...(options || {}),
    }
  );
}

/** Get user subcribe reset traffic logs GET /v1/admin/user/subscribe/reset/logs */
export async function getUserSubscribeResetTrafficLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeResetTrafficLogsParams,
  options?: { [key: string]: any }
) {
  return request<
    API.Response & { data?: API.GetUserSubscribeResetTrafficLogsResponse }
  >(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/logs`,
    {
      method: "GET",
      params: {
        ...params,
        user_subscribe_id: toRequestString(params.user_subscribe_id),
      },
      ...(options || {}),
    }
  );
}

/** Reset user subscribe token POST /v1/admin/user/subscribe/reset/token */
export async function resetUserSubscribeToken(
  body: API.ResetUserSubscribeTokenRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_subscribe_id"]),
      ...(options || {}),
    }
  );
}

/** Reset user subscribe traffic POST /v1/admin/user/subscribe/reset/traffic */
export async function resetUserSubscribeTraffic(
  body: API.ResetUserSubscribeTrafficRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/reset/traffic`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_subscribe_id"]),
      ...(options || {}),
    }
  );
}

/** Stop user subscribe POST /v1/admin/user/subscribe/toggle */
export async function toggleUserSubscribeStatus(
  body: API.ToggleUserSubscribeStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/subscribe/toggle`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["user_subscribe_id"]),
      ...(options || {}),
    }
  );
}

/** Get user subcribe traffic logs GET /v1/admin/user/subscribe/traffic_logs */
export async function getUserSubscribeTrafficLogs(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetUserSubscribeTrafficLogsParams,
  options?: { [key: string]: any }
) {
  return request<
    API.Response & { data?: API.GetUserSubscribeTrafficLogsResponse }
  >(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/user/subscribe/traffic_logs`,
    {
      method: "GET",
      params: {
        ...params,
        user_id: toRequestString(params.user_id),
        subscribe_id: toRequestString(params.subscribe_id),
        start_time: toRequestString(params.start_time),
        end_time: toRequestString(params.end_time),
        user_subscribe_id: params.user_subscribe_id
          ? toRequestString(params.user_subscribe_id)
          : undefined,
      },
      ...(options || {}),
    }
  );
}
