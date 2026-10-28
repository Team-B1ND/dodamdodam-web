export const AID_LINK = "aid";
export const DAUTH_LINK = "dauth";
export const DOCS_LINK = "dodam-docs";

export interface ServiceLinkItem {
  name: string;
  description: string;
  href: string;
}

export const SERVICE_LINKS: ServiceLinkItem[] = [
  {
    name: "Apps In Dodam",
    description: "도담도담 미니앱 배포 서비스",
    href: `https://${AID_LINK}.b1nd.com`,
  },
  {
    name: "DAuth",
    description: "도담도담 OAuth 2.0 인증 서비스",
    href: `https://${DAUTH_LINK}.b1nd.com`,
  },
  {
    name: "Dodam Docs",
    description: "B1ND 팀 공식 문서",
    href: `https://${DOCS_LINK}.b1nd.com`,
  },
];
