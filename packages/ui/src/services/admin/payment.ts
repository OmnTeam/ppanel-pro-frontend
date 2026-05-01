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

function omitEmptyValues<T extends Record<string, any>>(payload: T): T {
  const next = { ...payload } as Record<string, any>;
  for (const key of Object.keys(next)) {
    if (next[key] === "") {
      delete next[key];
      continue;
    }
    if (Array.isArray(next[key]) && next[key].length === 0) {
      delete next[key];
    }
  }
  return next as T;
}

function serializePaymentMethodPayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = omitEmptyValues({ ...body }) as Record<string, any>;
  for (const key of ["id", "fee_percent", "fee_amount"]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }
  return payload as T;
}

function normalizePaymentMethod<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.fee_percent !== undefined ? { fee_percent: toSafeNumber(item.fee_percent) } : {}),
    ...(item.fee_amount !== undefined ? { fee_amount: toSafeNumber(item.fee_amount) } : {}),
  } as T;
}

/** Update Payment Method PUT /v1/admin/payment/ */
export async function updatePaymentMethod(
  body: API.UpdatePaymentMethodRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.PaymentConfig }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializePaymentMethodPayload(body),
      ...(options || {}),
    }
  );
  if (response?.data?.data) {
    response.data.data = normalizePaymentMethod(response.data.data);
  }
  return response;
}

/** Create Payment Method POST /v1/admin/payment/ */
export async function createPaymentMethod(
  body: API.CreatePaymentMethodRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.PaymentConfig }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializePaymentMethodPayload(body),
      ...(options || {}),
    }
  );
  if (response?.data?.data) {
    response.data.data = normalizePaymentMethod(response.data.data);
  }
  return response;
}

/** Delete Payment Method DELETE /v1/admin/payment/ */
export async function deletePaymentMethod(
  body: API.DeletePaymentMethodRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/`,
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

/** Get Payment Method List GET /v1/admin/payment/list */
export async function getPaymentMethodList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetPaymentMethodListParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetPaymentMethodListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizePaymentMethod(item)
    );
  }
  return response;
}

/** Get supported payment platform GET /v1/admin/payment/platform */
export async function getPaymentPlatform(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.PlatformResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/payment/platform`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}
