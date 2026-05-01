// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toRequestString(value: unknown) {
  return value === undefined || value === null || value === ""
    ? value
    : String(value);
}

function toSafeNumber(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function serializeSubscribePayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = { ...body } as Record<string, any>;

  for (const key of [
    "id",
    "unit_price",
    "replacement",
    "traffic",
    "created_at",
    "updated_at",
  ]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }

  if (Array.isArray(payload.nodes)) {
    payload.nodes = payload.nodes
      .filter((value: unknown) => value !== "" && value !== null && value !== undefined)
      .map((value: unknown) => toRequestString(value));
  }

  if (payload.node_group_id === "" || payload.node_group_id === null) {
    delete payload.node_group_id;
  } else if (payload.node_group_id !== undefined) {
    payload.node_group_id = toRequestString(payload.node_group_id);
  }

  if (Array.isArray(payload.node_group_ids)) {
    payload.node_group_ids = payload.node_group_ids
      .filter((value: unknown) => value !== "" && value !== null && value !== undefined)
      .map((value: unknown) => toRequestString(value));
  }

  if (Array.isArray(payload.discount)) {
    payload.discount = payload.discount.map((item: Record<string, any>) => ({
      ...item,
      quantity: toRequestString(item?.quantity),
      discount: toRequestString(item?.discount),
      ...(item?.price !== undefined ? { price: toRequestString(item.price) } : {}),
    }));
  }

  if (Array.isArray(payload.traffic_limit)) {
    payload.traffic_limit = payload.traffic_limit.map((item: Record<string, any>) => ({
      ...item,
      stat_value: toRequestString(item?.stat_value),
      traffic_usage: toRequestString(item?.traffic_usage),
    }));
  }

  return payload as T;
}

function normalizeSubscribeDiscount(item: Record<string, any>) {
  return {
    ...item,
    quantity: toSafeNumber(item?.quantity),
    discount: toSafeNumber(item?.discount),
    ...(item?.price !== undefined ? { price: toSafeNumber(item.price) } : {}),
  };
}

function normalizeTrafficLimit(item: Record<string, any>) {
  return {
    ...item,
    stat_value: toSafeNumber(item?.stat_value),
    traffic_usage: toSafeNumber(item?.traffic_usage),
    speed_limit: toSafeNumber(item?.speed_limit),
  };
}

function serializeSubscribeGroupPayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = { ...body } as Record<string, any>;

  for (const key of ["id", "expired_days_limit", "max_traffic_gb_expired"]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }

  return payload as T;
}

function normalizeSubscribeEntity<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  const normalizedNodeGroupIds = Array.isArray(item.node_group_ids)
    ? item.node_group_ids
        .map((value: unknown) => String(value))
        .filter((value: string) => value !== "" && value !== "0")
    : item.node_group_ids;

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.unit_price !== undefined ? { unit_price: toSafeNumber(item.unit_price) } : {}),
    ...(item.replacement !== undefined ? { replacement: toSafeNumber(item.replacement) } : {}),
    ...(item.traffic !== undefined ? { traffic: toSafeNumber(item.traffic) } : {}),
    ...(item.sold !== undefined ? { sold: toSafeNumber(item.sold) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
    ...(item.updated_at !== undefined ? { updated_at: toSafeNumber(item.updated_at) } : {}),
    ...(Array.isArray(item.nodes)
      ? { nodes: item.nodes.map((value: unknown) => String(value)) }
      : {}),
    ...(normalizedNodeGroupIds !== undefined ? { node_group_ids: normalizedNodeGroupIds } : {}),
    ...(item.node_group_id !== undefined
      ? {
          node_group_id:
            String(item.node_group_id) !== "0" && String(item.node_group_id) !== ""
              ? String(item.node_group_id)
              : Array.isArray(normalizedNodeGroupIds)
                ? normalizedNodeGroupIds[0]
                : item.node_group_id,
        }
      : {}),
    ...(Array.isArray(item.discount)
      ? { discount: item.discount.map((discount: Record<string, any>) => normalizeSubscribeDiscount(discount)) }
      : {}),
    ...(Array.isArray(item.traffic_limit)
      ? { traffic_limit: item.traffic_limit.map((limit: Record<string, any>) => normalizeTrafficLimit(limit)) }
      : {}),
  } as T;
}

function normalizeSubscribeGroupEntity<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
    ...(item.updated_at !== undefined ? { updated_at: toSafeNumber(item.updated_at) } : {}),
    ...(item.expired_days_limit !== undefined
      ? { expired_days_limit: toSafeNumber(item.expired_days_limit) }
      : {}),
    ...(item.max_traffic_gb_expired !== undefined
      ? { max_traffic_gb_expired: toSafeNumber(item.max_traffic_gb_expired) }
      : {}),
  } as T;
}

/** Update subscribe PUT /v1/admin/subscribe/ */
export async function updateSubscribe(
  body: API.UpdateSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeSubscribePayload(body),
      ...(options || {}),
    }
  );
}

/** Create subscribe POST /v1/admin/subscribe/ */
export async function createSubscribe(
  body: API.CreateSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeSubscribePayload(body),
      ...(options || {}),
    }
  );
}

/** Delete subscribe DELETE /v1/admin/subscribe/ */
export async function deleteSubscribe(
  body: API.DeleteSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        id: toRequestString(body?.id),
      },
      ...(options || {}),
    }
  );
}

/** Batch delete subscribe DELETE /v1/admin/subscribe/batch */
export async function batchDeleteSubscribe(
  body: API.BatchDeleteSubscribeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/batch`,
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

/** Get subscribe details GET /v1/admin/subscribe/details */
export async function getSubscribeDetails(
  params: API.GetSubscribeDetailsParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.Subscribe }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/details`,
    {
      method: "GET",
      params: {
        ...params,
        id: toRequestString(params?.id),
      },
      ...(options || {}),
    }
  );

  if (response?.data?.data) {
    response.data.data = normalizeSubscribeEntity(response.data.data);
  }

  return response;
}

/** Update subscribe group PUT /v1/admin/subscribe/group */
export async function updateSubscribeGroup(
  body: API.UpdateSubscribeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/group`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeSubscribeGroupPayload(body),
      ...(options || {}),
    }
  );
}

/** Create subscribe group POST /v1/admin/subscribe/group */
export async function createSubscribeGroup(
  body: API.CreateSubscribeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/group`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeSubscribeGroupPayload(body),
      ...(options || {}),
    }
  );
}

/** Delete subscribe group DELETE /v1/admin/subscribe/group */
export async function deleteSubscribeGroup(
  body: API.DeleteSubscribeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/group`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        id: toRequestString(body?.id),
      },
      ...(options || {}),
    }
  );
}

/** Batch delete subscribe group DELETE /v1/admin/subscribe/group/batch */
export async function batchDeleteSubscribeGroup(
  body: API.BatchDeleteSubscribeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/group/batch`,
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

/** Get subscribe group list GET /v1/admin/subscribe/group/list */
export async function getSubscribeGroupList(options?: { [key: string]: any }) {
  const response = await request<API.Response & { data?: API.GetSubscribeGroupListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/group/list`,
    {
      method: "GET",
      ...(options || {}),
    }
  );

  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeSubscribeGroupEntity(item)
    );
  }

  return response;
}

/** Get subscribe list GET /v1/admin/subscribe/list */
export async function getSubscribeList(
  params: API.GetSubscribeListParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetSubscribeListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/list`,
    {
      method: "GET",
      params: {
        ...params,
        page: toRequestString(params?.page),
        size: toRequestString(params?.size),
        node_group_id: params?.node_group_id ? toRequestString(params.node_group_id) : undefined,
      },
      ...(options || {}),
    }
  );

  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeSubscribeEntity(item)
    );
  }

  return response;
}

/** Reset all subscribe tokens POST /v1/admin/subscribe/reset_all_token */
export async function resetAllSubscribeToken(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.ResetAllSubscribeTokenResponse }>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/subscribe/reset_all_token`,
    {
      method: "POST",
      ...(options || {}),
    }
  );
}

/** Subscribe sort POST /v1/admin/subscribe/sort */
export async function subscribeSort(
  body: API.SubscribeSortRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/subscribe/sort`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        sort: Array.isArray(body?.sort)
          ? body.sort.map((item: Record<string, any>) => ({
              ...item,
              id: toRequestString(item?.id),
            }))
          : body?.sort,
      },
      ...(options || {}),
    }
  );
}
