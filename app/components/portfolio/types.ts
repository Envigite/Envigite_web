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
  path?: string | null;
  onToggle?: (value: string | null) => void;
  activeItem?: string | null;
  level?: number;
}