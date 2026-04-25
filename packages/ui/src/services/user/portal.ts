// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toInt64String(value: string | number | undefined) {
  if (value === undefined || value === null || value === "") return value;
  return String(value);
}

/** Purchase Checkout POST /v1/public/portal/order/checkout */
export async function purchaseCheckout(
  body: API.CheckoutOrderRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.CheckoutOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/order/checkout`,
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

/** Query Purchase Order GET /v1/public/portal/order/status */
export async function queryPurchaseOrder(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.QueryPurchaseOrderParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.QueryPurchaseOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/order/status`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Get available payment methods GET /v1/public/portal/payment-method */
export async function getAvailablePaymentMethods(options?: {
  [key: string]: any;
}) {
  return request<
    API.Response & { data?: API.GetAvailablePaymentMethodsResponse }
  >(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/payment-method`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Pre Purchase Order POST /v1/public/portal/pre */
export async function prePurchaseOrder(
  body: API.PrePurchaseOrderRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    subscribe_id: toInt64String(body.subscribe_id),
    quantity: toInt64String(body.quantity),
    payment: toInt64String(body.payment),
  };

  return request<API.Response & { data?: API.PrePurchaseOrderResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/pre`,
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

/** Purchase subscription POST /v1/public/portal/purchase */
export async function purchase(
  body: API.PortalPurchaseRequest,
  options?: { [key: string]: any }
) {
  const data = {
    ...body,
    payment: toInt64String(body.payment),
    subscribe_id: toInt64String(body.subscribe_id),
    quantity: toInt64String(body.quantity),
  };

  return request<API.Response & { data?: API.PortalPurchaseResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/purchase`,
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

/** Get Subscription GET /v1/public/portal/subscribe */
export async function getSubscription(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetSubscriptionParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetSubscriptionResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/public/portal/subscribe`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}
