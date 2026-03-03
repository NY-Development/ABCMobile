import API from './api';

export type OwnerAdditionalInfoPayload = {
  companyName: string;
  branches: string | number;
  accountNumber: string;
  location: string;
  address: string;
  mapLink: string;
  companyImageUri?: string;
  companyImageName?: string;
  companyImageMimeType?: string;
  tradingLicenseUri?: string;
  tradingLicenseName?: string;
  tradingLicenseMimeType?: string;
};

export type OwnerAdditionalInfoResponse = {
  success?: boolean;
  message?: string;
  [key: string]: unknown;
};

const buildFileField = (
  uri: string,
  fallbackName: string,
  explicitName?: string,
  explicitType?: string
) => {
  const fileName = explicitName || uri.split('/').pop() || fallbackName;
  const lower = fileName.toLowerCase();

  let type = explicitType || 'image/jpeg';
  if (lower.endsWith('.jpg') || lower.endsWith('.jpeg')) type = 'image/jpeg';
  if (lower.endsWith('.png')) type = 'image/png';
  if (lower.endsWith('.webp')) type = 'image/webp';
  if (lower.endsWith('.pdf')) type = 'application/pdf';

  return {
    uri,
    name: fileName,
    type,
  } as unknown as Blob;
};

export const submitOwnerAdditionalInfo = async (
  payload: OwnerAdditionalInfoPayload
): Promise<OwnerAdditionalInfoResponse> => {
  const formData = new FormData();

  formData.append('companyName', payload.companyName);
  formData.append('branches', String(payload.branches));
  formData.append('accountNumber', payload.accountNumber);
  formData.append('location', payload.location);
  formData.append('address', payload.address);
  formData.append('mapLink', payload.mapLink);

  if (payload.companyImageUri) {
    formData.append(
      'companyImage',
      buildFileField(
        payload.companyImageUri,
        `company-${Date.now()}.jpg`,
        payload.companyImageName,
        payload.companyImageMimeType
      )
    );
  }

  if (payload.tradingLicenseUri) {
    formData.append(
      'tradingLicense',
      buildFileField(
        payload.tradingLicenseUri,
        `license-${Date.now()}.pdf`,
        payload.tradingLicenseName,
        payload.tradingLicenseMimeType
      )
    );
  }

  const res = await API.post('/owners/additional-info', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  return res.data;
};
