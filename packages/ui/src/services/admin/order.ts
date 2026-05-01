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

function serializeOrderPayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = omitEmptyValues({ ...body }) as Record<string, any>;
  for (const key of [
    "id",
    "user_id",
    "quantity",
    "price",
    "amount",
    "discount",
    "coupon_discount",
    "commission",
    "fee_amount",
    "payment_id",
    "subscribe_id",
  ]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }
  return payload as T;
}

function normalizeOrderItem<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.parent_id !== undefined ? { parent_id: String(item.parent_id) } : {}),
    ...(item.user_id !== undefined ? { user_id: String(item.user_id) } : {}),
    ...(item.quantity !== undefined ? { quantity: toSafeNumber(item.quantity) } : {}),
    ...(item.price !== undefined ? { price: toSafeNumber(item.price) } : {}),
    ...(item.amount !== undefined ? { amount: toSafeNumber(item.amount) } : {}),
    ...(item.gift_amount !== undefined ? { gift_amount: toSafeNumber(item.gift_amount) } : {}),
    ...(item.discount !== undefined ? { discount: toSafeNumber(item.discount) } : {}),
    ...(item.coupon_discount !== undefined ? { coupon_discount: toSafeNumber(item.coupon_discount) } : {}),
    ...(item.commission !== undefined ? { commission: toSafeNumber(item.commission) } : {}),
    ...(item.payment_id !== undefined ? { payment_id: String(item.payment_id) } : {}),
    ...(item.fee_amount !== undefined ? { fee_amount: toSafeNumber(item.fee_amount) } : {}),
    ...(item.subscribe_id !== undefined ? { subscribe_id: String(item.subscribe_id) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
    ...(item.updated_at !== undefined ? { updated_at: toSafeNumber(item.updated_at) } : {}),
  } as T;
}

/** Create order POST /v1/admin/order/ */
export async function createOrder(
  body: API.CreateOrderRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeOrderPayload(body),
      ...(options || {}),
    }
  );
}

/** Get order list GET /v1/admin/order/list */
export async function getOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetOrderListParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetOrderListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order/list`,
    {
      method: "GET",
      params: {
        ...params,
        page: toRequestString(params?.page),
        size: toRequestString(params?.size),
        user_id: params?.user_id ? toRequestString(params.user_id) : undefined,
        subscribe_id: params?.subscribe_id
          ? toRequestString(params.subscribe_id)
          : undefined,
      },
      ...(options || {}),
    }
  );
  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeOrderItem(item)
    );
  }
  return response;
}

/** Update order status PUT /v1/admin/order/status */
export async function updateOrderStatus(
  body: API.UpdateOrderStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/order/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeOrderPayload(body),
      ...(options || {}),
    }
  );
}
