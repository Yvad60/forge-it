interface PageVersion {
  createdAt: string;
  message: string;
  number: number;
  minorEdit: boolean;
  authorId: string;
}

interface PageBody {
  storage: {
    representation: string;
    value: string;
  };
  atlas_doc_format: {
    representation: string;
    value: string;
  };
  view: {
    representation: string;
    value: string;
  };
}

interface Links {
  webui: string;
  editui: string;
  tinyui: string;
}

export interface Page {
  id: string;
  status: string;
  title: string;
  spaceId: string;
  parentId: string;
  parentType: string;
  position: number;
  authorId: string;
  ownerId: string;
  lastOwnerId: string;
  createdAt: string;
  version: PageVersion;
  body: PageBody;
  _links: Links;
}

export interface PageUpdate {
  id: string;
  key: string;
  version: PageVersion;
}
