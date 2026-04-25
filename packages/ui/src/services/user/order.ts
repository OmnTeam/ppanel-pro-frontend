// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toInt64String(value: string | number | undefined) {
  if (value === undefined || value === null || value === "") return value;
  return String(value);
}

/** Close order POST /v1/public/order/close */
export async function closeOrder(
  body: API.CloseOrderRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/close`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get order GET /v1/public/order/detail */
export async function queryOrderDetail(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryOrderDetailParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.OrderDetail }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/detail`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Get order list GET /v1/public/order/list */
export async function queryOrderList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryOrderListParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.QueryOrderListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Pre create order POST /v1/public/order/pre */
export async function preCreateOrder(
  body: API.PurchaseOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    subscribe_id: toInt64String(body.subscribe_id),
    quantity: toInt64String(body.quantity),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.PreOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/pre`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      ...(options || {}),
    }
  );
}

/** purchase Subscription POST /v1/public/order/purchase */
export async function purchase(
  body: API.PurchaseOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    subscribe_id: toInt64String(body.subscribe_id),
    quantity: toInt64String(body.quantity),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.PurchaseOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/purchase`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      ...(options || {}),
    }
  );
}

/** 此处后端没有提供注释 POST /v1/public/order/recharge */
export async function recharge(
  body: API.RechargeOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    amount: toInt64String(body.amount),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.RechargeOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/recharge`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      ...(options || {}),
    }
  );
}

/** Renewal Subscription POST /v1/public/order/renewal */
export async function renewal(
  body: API.RenewalOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    user_subscribe_id: toInt64String(body.user_subscribe_id),
    quantity: toInt64String(body.quantity),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.RenewalOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/renewal`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      ...(options || {}),
    }
  );
}

/** Reset traffic POST /v1/public/order/reset */
export async function resetTraffic(
  body: API.ResetTrafficOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    user_subscribe_id: toInt64String(body.user_subscribe_id),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.ResetTrafficOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/order/reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
      ...(options || {}),
    }
  );
}
