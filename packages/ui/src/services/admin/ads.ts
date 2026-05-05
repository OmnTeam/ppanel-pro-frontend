// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toRequestString(value: unknown) {
  return value === undefined || value === null || value === ""
    ? undefined
    : String(value);
}

function removeEmptyFields<T extends Record<string, any>>(payload: T) {
  return Object.fromEntries(
    Object.entries(payload).filter(
      ([, value]) =>
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
    )
  ) as T;
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
  return removeEmptyFields(next);
}

/** Update Ads PUT /v1/admin/ads/ */
export async function updateAds(
  body: API.UpdateAdsRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["id", "start_time", "end_time"]),
      ...(options || {}),
    }
  );
}

/** Create Ads POST /v1/admin/ads/ */
export async function createAds(
  body: API.CreateAdsRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeInt64Fields(body, ["start_time", "end_time"]),
      ...(options || {}),
    }
  );
}

/** Delete Ads DELETE /v1/admin/ads/ */
export async function deleteAds(
  body: API.DeleteAdsRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/`,
    {
      method: "DELETE",
      params: serializeInt64Fields(body, ["id"]),
      ...(options || {}),
    }
  );
}

/** Get Ads Detail GET /v1/admin/ads/detail */
export async function getAdsDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetAdsDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.Ads }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/detail`,
    {
      method: "GET",
      params: serializeInt64Fields(params, ["id"]),
      ...(options || {}),
    }
  );
}

/** Get Ads List GET /v1/admin/ads/list */
export async function getAdsList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetAdsListParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetAdsListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/ads/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
