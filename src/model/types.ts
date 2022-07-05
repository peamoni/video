export interface Artifact {
  url: string;
  id: number;
  name: string;
  node_id: string;
  expired: boolean;
  updated_at: Date;
  archive_download_url: string;
  expires_at: Date;
  created_at: Date;
  size_in_bytes: number;
}

export interface Render {
  uid: string;
  artifact: Artifact;
  conf: any;
  author_id: string;
  runId: string;
  status: number;
  timestamp: number;
}

export enum Template {
  Unknow = 1,
  TextTicker,
  TickerGif,
}

export enum Dimensions {
  Square = 1,
  Portrait,
  Landscape,
}

export enum Coins {
  Bitcoin = 1,
  Ethereum,
}

export function getTickerName(ticker: Coins): string {
  switch (ticker) {
    case Coins.Bitcoin:
      return "BTC-USD.CC";
    case Coins.Ethereum:
      return "ETH-USD.CC";
    default:
      return "Unknown";
  }
}

export function getVideoDimentions(dimension: Dimensions): {
  width: number;
  height: number;
} {
  switch (dimension) {
    case Dimensions.Square:
      return {
        width: 1080,
        height: 1080,
      };
    case Dimensions.Portrait:
      return {
        width: 1080,
        height: 1920,
      };
    case Dimensions.Landscape:
    default:
      return {
        width: 1920,
        height: 1080,
      };
  }
}
