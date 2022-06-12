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
