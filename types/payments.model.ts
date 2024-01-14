type TStkPushResponse = {
  id: string;
  invoice: {
    invoice_id: string;
    state: string;
    provider: string;
    charges: string;
    net_amount: string;
    currency: string;
    value: string;
    account: string;
    api_ref: string;
    mpesa_reference: null;
    host: string;
    card_info: {
      bin_country: null;
      card_type: null;
    };
    retry_count: number;
    failed_reason: null;
    failed_code: null;
    failed_code_link: null;
    created_at: string;
    updated_at: string;
  };
  customer: {
    customer_id: string;
    phone_number: string;
    email: null;
    first_name: null;
    last_name: null;
    country: null;
    zipcode: null;
    provider: string;
    created_at: string;
    updated_at: string;
  };
  payment_link: null;
  customer_comment: null;
  refundable: boolean;
  created_at: string;
  updated_at: string;
};

type TPaymentStatusResponse = {
  invoice: {
    id: string;
    invoice_id: string;
    mpesa_reference?: string;
    state: string;
    provider: string;
    charges: string;
    net_amount: number;
    currency: string;
    value: string;
    account: string;
    api_ref: string;
    host: string;
    failed_reason: null;
    created_at: string;
    updated_at: string;
  };
  meta: {
    id: string;
    customer: {
      id: string;
      phone_number: string;
      email: string;
      first_name: string;
      last_name: string;
      country: string;
      address: string;
      city: string;
      state: string;
      zipcode: string;
      provider: string;
      created_at: string;
      updated_at: string;
    };
    customer_comment: string;
    created_at: string;
    updated_at: string;
  };
};
