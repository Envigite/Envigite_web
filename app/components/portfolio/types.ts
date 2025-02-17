export interface DirectoryItem {
  name: string;
  children?: DirectoryItem[];
  image?: string;
  link?: string;
  description?: string;
}

export interface DirectoryItemComponentProps {
  name: string;
  image?: string;
  link?: string;
  children?: React.ReactNode;
  description?: string;
}